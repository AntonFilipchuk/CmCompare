import { Component } from '@angular/core';
import { CoinsDashboardService } from 'src/app/Services/CoinsDashboard/coin-dashboard.service';

@Component({
  selector: 'app-coin-dashboard',
  templateUrl: './coin-dashboard.component.html',
  styleUrls: ['./coin-dashboard.component.scss']
})
export class CoinDashboardComponent 
{
  constructor (private coinsDashboardService: CoinsDashboardService)
  { }

  public realCoin$ = this.coinsDashboardService.realCoin$;
  public currentSelectedCoin$ = this.coinsDashboardService.currentSelectedCoin$;
  public currentSelectedCoinPrice$ = this.coinsDashboardService.currentSelectedCoinPrice$;
  public prevAndCurrentCoinPriceValueChange$ = this.coinsDashboardService.prevAndCurrentCoinPriceValueChange$;
  public prevAndCurrentCoinPricePercentChange$ = this.coinsDashboardService.prevAndCurrentCoinPricePercentChange$;
  public prevSelectedCoinPrice$ = this.coinsDashboardService.prevSelectedCoinPrice$;
  public currentAndRealCoinPricePercentChange$ = this.coinsDashboardService.currentAndRealCoinPricePercentChange$;
  public currentAndRealCoinPriceValueChange$ = this.coinsDashboardService.prevAndCurrentCoinPriceValueChange$;

}
