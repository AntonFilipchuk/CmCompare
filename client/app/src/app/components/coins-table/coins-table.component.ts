import { Component, OnInit } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { CoinsService } from 'src/app/services/CoinService/coins.service';
import { CoinsData } from 'src/app/Interfaces/CoinsData';
import { Coin } from 'src/app/Interfaces/Coin';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent implements OnInit
{
  //ping$ = this.coinService.ping();
  coins$: Observable<Coin[]> = this.coinService.getTop100Coins().pipe(map((data: CoinsData) => data.coins));
  constructor (private coinService: CoinsService)
  {

  }
  ngOnInit(): void
  {
    this.coinService.getTop100Coins().subscribe((data: CoinsData) =>
    {
      console.log(data.coins);
    });
  }

  ping(): Observable<any>
  {
    return this.coinService.ping();
  }
}
