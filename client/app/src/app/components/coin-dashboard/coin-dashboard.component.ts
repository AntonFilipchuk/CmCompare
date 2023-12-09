import { Component} from '@angular/core';
import { map } from 'rxjs';
import { CoinsDashboardService } from 'src/app/Services/CoinsDashboard/coin-dashboard.service';

@Component({
  selector: 'app-coin-dashboard',
  templateUrl: './coin-dashboard.component.html',
  styleUrls: ['./coin-dashboard.component.scss']
})
export class CoinDashboardComponent 
{
  constructor (private coinsDashboardService: CoinsDashboardService)
  {
  }

  public realCoin$ = this.coinsDashboardService.realCoin$;
  public currentSelectedCoin$ = this.coinsDashboardService.currentSelectedCoin$;
  public prevSelectedCoinPrice$ = this.coinsDashboardService.prevSelectedCoinPrice$;
  public currentSelectedCoinPrice$ = this.coinsDashboardService.currentSelectedCoinPrice$;

  //For value change return string
  //"$0" || "-$n" || "+$n" where n is a number 

  //For percent change return string 
  //"0%" || "-n%" || "+n%" where n is a number 

  //Prev and current
  public prevAndCurrentCoinPriceValueChange$ = this.coinsDashboardService.prevAndCurrentCoinPriceValueChange$.pipe(map(value => this.#formatToValueChange(value)));
  public prevAndCurrentCoinPricePercentChange$ = this.coinsDashboardService.prevAndCurrentCoinPricePercentChange$.pipe(map(value => this.#formatToPercentChange(value)));

  //Current and real 
  public currentAndRealCoinPriceValueChange$ = this.coinsDashboardService.prevAndCurrentCoinPriceValueChange$.pipe(map(value => this.#formatToValueChange(value)));
  public currentAndRealCoinPricePercentChange$ = this.coinsDashboardService.currentAndRealCoinPricePercentChange$.pipe(map(value => this.#formatToPercentChange(value)));



  #formatToValueChange(n: number): string
  {
    if (n > 0)
    {
      return `+$${this.#precise(n)}`;
    }
    else if (n < 0)
    {
      return `-$${this.#precise(Math.abs(n))}`;
    }
    return "$0";
  }

  #formatToPercentChange(n: number): string
  {
    if (n > 0)
    {
      return `+${n}%`;
    }
    else if (n < 0)
    {
      return `-${Math.abs(n)}%`;
    }
    return "0%";
  }

  #precise(n: number)
  {
    return n.toFixed(2);
  }
}
