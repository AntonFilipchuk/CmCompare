import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, catchError, concatMap, filter, findIndex, from, map, mergeMap, of, reduce, switchMap, take, takeLast, tap, throttleTime } from 'rxjs';
import { CoinsService } from 'src/app/services/CoinService/coins.service';
import { CoinsData } from 'src/app/Interfaces/CoinsData';
import { Coin } from 'src/app/Interfaces/Coin';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LoadingWrapper } from 'src/app/Helpers/LoadingWrapper/LoadingWrapper';
import { TableService } from 'src/app/services/TableService/table.service';
import { CoinDashboardService } from 'src/app/services/CoinDashboardService/coin-dashboard.service';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent
{
  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  table$: Observable<Coin[]> = this.tableService.getTable();
  coinsMarketCaps: number[] | undefined;
  constructor (private tableService: TableService,
    private coinDashboardService: CoinDashboardService) { }


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
    this.table.renderRows();
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

  setInitialValues(table: Coin[])
  {
    this.coinsMarketCaps = table.map(coin => coin.market_cap);
  }

  onDragStart(rowData: any)
  {
    let coin = rowData as (Coin | null);
    this.coinDashboardService.onCoinSelection(coin);
    console.log("Drag Started", rowData);

  }

}








