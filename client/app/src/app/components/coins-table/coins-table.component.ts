import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, concatMap, filter, findIndex, from, map, mergeMap, of, switchMap, take, tap } from 'rxjs';
import { CoinsService } from 'src/app/services/CoinService/coins.service';
import { CoinsData } from 'src/app/Interfaces/CoinsData';
import { Coin } from 'src/app/Interfaces/Coin';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent implements OnInit
{
  //ping$ = this.coinService.ping();
  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  coinsData$: Observable<CoinsData> = this.coinService.getTop100Coins();
  coins$: Observable<Coin[]> = this.coinsData$.pipe(map((data: CoinsData) => (data.coins).slice(0, 10)));
  columns$: Observable<string[]> = this.coinsData$.pipe(map((data: CoinsData) => 
  {
    const coin = data.coins[0];
    return Object.keys(coin).filter((item) => this.displayedColumns.includes(item));
  }));
  coins: Coin[] | undefined;

  displayedColumns: string[] = ['id', 'current_price', 'circulating_supply', 'market_cap'];
  constructor (private coinService: CoinsService) { }
  ngOnInit(): void
  {
  };

  moveTableRows(event: CdkDragDrop<Coin[] | null>) {
    this.coins$ = this.coins$.pipe(
      concatMap((coins) => {
        const prevIndex = coins.findIndex((coin) => coin.id === event.item.data.id);
        moveItemInArray(coins, prevIndex, event.currentIndex);
        return of(coins);
      })
    );
  
    this.table.renderRows();
  }
  

  ping(): Observable<any>
  {
    return this.coinService.ping();
  }
}

