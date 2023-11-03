import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsService } from '../CoinService/coins.service';
import { CoinsData } from 'src/app/Interfaces/CoinsData';

@Injectable({
  providedIn: 'root'
})
export class TableService
{
  constructor (private coinService: CoinsService)
  {
    coinService.getTop100Coins().pipe(map((data: CoinsData) => (data.coins).slice(0, 90))).subscribe((table) =>
    {
      this.setTable(table);
    });
  }

  private tableSubject = new BehaviorSubject<Coin[]>([]);
  public getTable(): Observable<Coin[]>
  {
    return this.tableSubject.asObservable();
  }

  public setTable(table: Coin[]): void 
  {
    this.tableSubject.next(table);
  }
}
