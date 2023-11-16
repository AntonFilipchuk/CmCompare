import { Injectable } from '@angular/core';
import { CoinsService } from '../CoinService/coins.service';
import { Observable, map } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';

@Injectable({
  providedIn: 'root'
})
export class CoinsDisplayService
{

  constructor (private coinsService: CoinsService) { }

  public coinsTable$: Observable<Coin[]> = this.coinsService.getCoinsData().pipe(map(
    coinsData => coinsData.coins
  ));

  public realCoinsData$: Observable<Coin[]> = this.coinsService.getCoinsData().pipe(
    map(
      coinsData => structuredClone(coinsData.coins)
    )
  );
}
