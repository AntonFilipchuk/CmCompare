import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinDashboardService } from 'src/app/services/CoinDashboardService/coin-dashboard.service';

@Component({
  selector: 'app-coin-dashboard',
  templateUrl: './coin-dashboard.component.html',
  styleUrls: ['./coin-dashboard.component.scss']
})
export class CoinDashboardComponent
{
  constructor (private coinDashboardService: CoinDashboardService)
  { }

  selectedCoin$: Observable<Coin | null> = this.coinDashboardService.getSelectedCoin();
  realCoin$ = this.coinDashboardService.realCoins$;
  realCoin: Coin | undefined;

  public getRealCoin(realCoins: Coin[], selectedCoin: Coin)
  {
    this.realCoin = realCoins.find(c => c.id === selectedCoin.id);
  }
}
