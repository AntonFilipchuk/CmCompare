import { Injectable } from '@angular/core';
import { CoinsDisplayService } from '../CoinsDisplay/coins-display.service';
import { BehaviorSubject, Observable, ReplaySubject, combineLatest, distinctUntilChanged, map, pairwise, startWith, tap, withLatestFrom } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';

@Injectable({
  providedIn: 'root'
})
export class CoinsDashboardService
{

  constructor (private coinsDisplayService: CoinsDisplayService) { }

  #prevAndCurrentSelectedCoins$: Observable<[Coin | null, Coin | null]> = this.coinsDisplayService.getSelectedCoin().pipe(startWith(null), pairwise());
  public currentSelectedCoin$: Observable<Coin | null> = this.#prevAndCurrentSelectedCoins$.pipe(map(([_, c]) => c));
  public prevSelectedCoin$: Observable<Coin | null> = this.#prevAndCurrentSelectedCoins$.pipe(map(([p, _]) => p));


  #lastCoinPricePair: Observable<(number)[]> = this.currentSelectedCoin$.pipe(
    map((coin) => 
    {
      return coin ? coin.current_price : null;
    }),
    startWith(null),
    distinctUntilChanged(),
    pairwise(),
    map(([prevPrice, currentPrice]) => 
    {
      currentPrice = currentPrice ? currentPrice : 0;
      if (!prevPrice)
      {
        return [currentPrice, currentPrice];
      }
      return [prevPrice, currentPrice];
    }));

  #lastDistinctCoinPrices$: Observable<(number)[]> =
    combineLatest([this.prevSelectedCoin$, this.currentSelectedCoin$, this.#lastCoinPricePair]).pipe(
      map(([prevSelectedCoin, currentSelectedCoin, prices]) => 
      {
        if (prevSelectedCoin === null && currentSelectedCoin === null)
        {
          return [0, 0];
        }
        if (prevSelectedCoin === currentSelectedCoin)
        {
          return prices;
        }
        let currentCoinPrice = currentSelectedCoin ? currentSelectedCoin.current_price : 0;
        return [currentCoinPrice, currentCoinPrice];
      }));

  public prevSelectedCoinPrice$ = this.#lastDistinctCoinPrices$.pipe(map((prevAndCurrentCoinPrices: number[]) => 
  {
    return prevAndCurrentCoinPrices[0] ? prevAndCurrentCoinPrices[0] : 0;
  }));


  public currentSelectedCoinPrice$ = this.#lastDistinctCoinPrices$.pipe(map((prevAndCurrentCoinPrices: number[]) => 
  {
    return prevAndCurrentCoinPrices[1] ? prevAndCurrentCoinPrices[1] : 0;
  }));

  public prevAndCurrentCoinPricePercentChange$ = this.#lastDistinctCoinPrices$.pipe(map(([prevCoinPrice, currentCoinPrice]) => 
  {
    let result = this.#percentChange(prevCoinPrice, currentCoinPrice);
    return this.#formatToPercentChange(result);
  }));

  public prevAndCurrentCoinPriceValueChange$ = this.#lastDistinctCoinPrices$.pipe(map(([prevCoinPrice, currentCoinPrice]) => 
  {
    return this.#formatToValueChange(currentCoinPrice - prevCoinPrice);
  }));

  #realCoinsData$: Observable<Coin[]> = this.coinsDisplayService.realCoinsData$;

  public realCoin$: Observable<Coin | null> = combineLatest(
    [this.#prevAndCurrentSelectedCoins$, this.#realCoinsData$]
  ).pipe(map(([selectedCoins, realCoins]) => 
  {
    if (!selectedCoins[1])
    {
      return null;
    }
    let realCoin: Coin | undefined = realCoins.find(c => c.id === selectedCoins[1]!.id);
    if (!realCoin)
    {
      return null;
    }
    return realCoin;
  }));

  //Returns string 
  //"0%" || "-n%" || "+n%" where n is a number 
  public currentAndRealCoinPricePercentChange$ = combineLatest([this.currentSelectedCoinPrice$, this.realCoin$]).pipe(
    map(([currentCoinPrice, realCoin]) => 
    {
      if (!realCoin)
      {
        return 0;
      }
      let result = this.#percentChange(realCoin.current_price, currentCoinPrice);
      return this.#formatToPercentChange(result);
    })
  );

  //Returns string 
  //"$0" || "-$n" || "+$n" where n is a number 
  public currentAndRealCoinPriceValueChange$ = combineLatest([this.currentSelectedCoinPrice$, this.realCoin$]).pipe(
    map(([currentCoinPrice, realCoin]) => 
    {
      if (!realCoin)
      {
        return 0;
      }
      return this.#formatToValueChange(currentCoinPrice - realCoin.current_price);
    })
  );

  #percentChange(a: number, b: number): number
  {
    let percent: number;
    if (b !== 0)
    {
      if (a !== 0)
      {
        percent = (b - a) / a * 100;
      } else
      {
        percent = b * 100;
      }
    } else
    {
      percent = - a * 100;
    }
    return Math.floor(percent);
  }

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
