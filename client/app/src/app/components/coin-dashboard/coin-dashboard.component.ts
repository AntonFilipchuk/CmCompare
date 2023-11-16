import { Component } from '@angular/core';
import { Observable, combineLatest, combineLatestAll, map } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinDashboardService } from 'src/app/Services/CoinDashboardService/coin-dashboard.service';
import { CoinsService } from 'src/app/Services/CoinService/coins.service';

@Component({
  selector: 'app-coin-dashboard',
  templateUrl: './coin-dashboard.component.html',
  styleUrls: ['./coin-dashboard.component.scss']
})
export class CoinDashboardComponent
{
  constructor (private coinDashboardService: CoinDashboardService)
  {
  }
  selectedCoin$: Observable<Coin | null> = this.coinDashboardService.getSelectedCoin();
  realCoins$: Observable<Coin[]> = this.coinDashboardService.realCoins$;

  realCoin$: Observable<Coin | null> = combineLatest([this.selectedCoin$, this.realCoins$]).pipe(map(([selectedCoin, realCoins]) => 
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
