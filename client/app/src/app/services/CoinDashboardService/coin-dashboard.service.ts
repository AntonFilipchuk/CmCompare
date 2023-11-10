import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsService } from '../CoinService/coins.service';
import { CoinsData } from 'src/app/Interfaces/CoinsData';

@Injectable({
  providedIn: 'root'
})
export class CoinDashboardService
{
  constructor (private coinsService: CoinsService)
  {
  }

  private selectedCoinSubject = new BehaviorSubject<Coin | null>(null);

  public realCoins$: Observable<Coin[]> = this.coinsService.getCoinsData().pipe(map(coinsData => 
  {
    return structuredClone(coinsData.coins);
  }));

  public getSelectedCoin(): Observable<Coin | null>
  {
    return this.selectedCoinSubject.asObservable();
  }

  public onCoinSelection(coin: Coin | null)
  {
    this.setSelectedCoin(coin);
  }

  private setSelectedCoin(coin: Coin | null)
  {
    this.selectedCoinSubject.next(coin);
  }
}
