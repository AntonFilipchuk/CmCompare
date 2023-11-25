import { Injectable } from '@angular/core';
import { CoinsService } from '../CoinService/coins.service';
import { BehaviorSubject, Observable, map, pairwise, startWith } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';

@Injectable({
  providedIn: 'root'
})
export class CoinsDisplayService
{

  constructor (private coinsService: CoinsService) { }

  #coins$: Observable<Coin[]> = this.coinsService.getCoinsData().pipe(map(
    coinsData => coinsData.coins
  ));

  public realCoinsData$: Observable<Coin[]> = this.#coins$;

  public coinsTable$: Observable<Coin[]> = this.#coins$.pipe(map(coins => structuredClone(coins)));


  #selectedCoin$: BehaviorSubject<Coin | null> = new BehaviorSubject<Coin | null>(null);

  public setSelectedCoin(coin: Coin | null): void
  {
    this.#selectedCoin$.next(coin);
  }

  public getSelectedCoin(): Observable<Coin | null>
  {
    return this.#selectedCoin$.asObservable();
  }

}
