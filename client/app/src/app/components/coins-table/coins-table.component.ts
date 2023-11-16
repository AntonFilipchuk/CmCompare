import { Component, Input, ViewChild } from '@angular/core';
import { Observable, map, tap, } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { MatTable, } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TableService } from 'src/app/Services/TableService/table.service';
import { CoinDashboardService } from 'src/app/Services/CoinDashboardService/coin-dashboard.service';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent
{
  @ViewChild(MatTable, { static: false }) matTable!: MatTable<any>;
  @Input() coinsTable$! :  Observable<Coin[]>;
  table$: Observable<Coin[]> = this.tableService.getTable().pipe(tap(value => this.coinsMarketCaps = value.map(coin => coin.market_cap)));
  coinsMarketCaps: number[] | undefined;

  constructor (
    private tableService: TableService,
    private coinDashboardService: CoinDashboardService
  )
  { }

  displayedColumns: string[] = ['#', 'id', 'current_price', 'circulating_supply', 'market_cap'];
  totalMarketCap$: Observable<number> = this.table$.pipe(map(coins => coins.map(coin => coin.market_cap).reduce((acc, value) => acc + value)));

  moveTableRows(event: CdkDragDrop<Coin[], any, any>, table: Coin[])
  {
    const selectedCoinIndex = table.findIndex((coin) => coin.id === event.item.data.id);
    if (selectedCoinIndex === event.currentIndex)
    {
      return;
    }
    moveItemInArray(table, selectedCoinIndex, event.currentIndex);

    this.recalculateCoinsValues(this.coinsMarketCaps!, table);
    this.tableService.setTable(table);
    this.matTable.renderRows();
  }
  recalculateCoinsValues(coinsMarketCaps: number[], coins: Coin[])
  {
    coins.map((coin, index) => 
    {
      coin.market_cap = coinsMarketCaps[index];
      coin.current_price = coin.market_cap / coin.circulating_supply;
      coin.market_cap_rank = ++index;
    });
  }

  onDragStart(rowData: any)
  {
    let coin = rowData as (Coin | null);
    this.coinDashboardService.onCoinSelection(coin);
    console.log("Drag Started", rowData);

  }

}








