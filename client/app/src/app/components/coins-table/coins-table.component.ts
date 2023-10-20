import { Component, OnInit } from '@angular/core';
import { Observable, from, map, of, tap } from 'rxjs';
import { CoinsService } from 'src/app/services/CoinService/coins.service';
import { CoinsData } from 'src/app/Interfaces/CoinsData';
import { Coin } from 'src/app/Interfaces/Coin';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent implements OnInit
{
  //ping$ = this.coinService.ping();
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

  ping(): Observable<any>
  {
    return this.coinService.ping();
  }
}

