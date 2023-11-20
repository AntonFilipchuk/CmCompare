import { Component } from '@angular/core';
import { Observable, combineLatest, map} from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsDisplayService } from 'src/app/Services/CoinsDisplay/coins-display.service';

@Component({
  selector: 'app-coin-dashboard',
  templateUrl: './coin-dashboard.component.html',
  styleUrls: ['./coin-dashboard.component.scss']
})
export class CoinDashboardComponent
{
  constructor (private coinsDisplayService: CoinsDisplayService)
  {
  }
  public selectedCoin$: Observable<Coin | null> = this.coinsDisplayService.getSelectedCoin();
  #realCoinsData$: Observable<Coin[]> = this.coinsDisplayService.realCoinsData$;

  public realCoin$: Observable<Coin | null> = combineLatest([this.selectedCoin$, this.#realCoinsData$]).pipe(map(([selectedCoin, realCoins]) => 
  {
    if (!selectedCoin)
    {
      return null;
    }
    let realCoin: Coin | undefined = realCoins.find(c => c.id === selectedCoin.id);
    if (!realCoin)
    {
      return null;
    }
    return realCoin;
  }));
}
