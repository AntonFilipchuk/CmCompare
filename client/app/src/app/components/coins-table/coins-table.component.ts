import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, catchError, concatMap, filter, findIndex, from, map, mergeMap, of, reduce, switchMap, take, takeLast, tap, throttleTime } from 'rxjs';
import { CoinsService } from 'src/app/services/CoinService/coins.service';
import { CoinsData } from 'src/app/Interfaces/CoinsData';
import { Coin } from 'src/app/Interfaces/Coin';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LoadingWrapper } from 'src/app/Helpers/LoadingWrapper/LoadingWrapper';
import { TableService } from 'src/app/services/TableService/table.service';

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
  constructor (private coinService: CoinsService, private tableService: TableService) { }
  displayedColumns: string[] = ['id', 'current_price', 'circulating_supply', 'market_cap'];
  totalMarketCap$: Observable<number> = this.table$.pipe(map(coins => coins.map(coin => coin.market_cap).reduce((acc, value) => acc + value)));

  moveTableRows(event: CdkDragDrop<Coin[], any, any>, table: Coin[])
  {
    const selectedCoinIndex = table.findIndex((coin) => coin.id === event.item.data.id);
    if (selectedCoinIndex === event.currentIndex)
    {
      return;
    }
    moveItemInArray(table, selectedCoinIndex, event.currentIndex);

    this.recalculatePrices(this.coinsMarketCaps!, table);
    this.tableService.setTable(table);
    this.table.renderRows();
  }
  recalculatePrices(coinsMarketCaps: number[], coins: Coin[])
  {
    coins.map((coin, index) => 
    {
      coin.market_cap = coinsMarketCaps[index];
      coin.current_price = coin.market_cap / coin.circulating_supply;
    });
  }

  setCoinsMarketCaps(table: Coin[])
  {
    this.coinsMarketCaps = table.map(coin => coin.market_cap);
  }

}








