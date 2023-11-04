import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map, of, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from '../LocalStorageService/local-storage.service';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsData } from 'src/app/Interfaces/CoinsData';

@Injectable({
  providedIn: 'root'
})
export class CoinsService
{
  FIVE_MINUTES = 300000;
  constructor (private http: HttpClient, private localStorageService: LocalStorageService) { }

  private data$: Observable<CoinsData> | undefined;

  getTop100Coins(): Observable<CoinsData>
  {
    let currentTime: number = Date.now();
    let coinsData: CoinsData | undefined;
    try
    {
      coinsData = this.localStorageService.getObject('coins-data') as CoinsData;
    } catch (error)
    {

    }

    if (!coinsData || (currentTime - coinsData.timeOfRequest > this.FIVE_MINUTES))
    {
      if (!this.data$)
      {
        this.data$ = this.#getCoinsData().pipe(shareReplay(1));
        return this.data$;
      }
      return this.data$;
    }
    return of(coinsData);
  }

  #getCoinsData(): Observable<CoinsData>
  {
    console.log('GETTING COINS DATA FROM API');

    return this.http.get<Coin[]>(`${environment.apiDomain}${environment.apiTop100CoinsDefaultEndpoint}`, { observe: 'response' }).pipe(map((data) =>
    {
      console.log('DATA', data);

      let obj: CoinsData = {
        coins: [],
        timeOfRequest: 0
      };

      if (data.body && (data.status === 200))
      {
        obj.coins = data.body;
        obj.timeOfRequest = Date.now();
        this.localStorageService.setObject('coins-data', obj);
        return obj;
      }
      try
      {
        return this.localStorageService.getObject('coins-data') as CoinsData;
      } catch (error)
      {
        throw new AggregateError([new Error('Failed to get coins data from local storage'), new Error(`Failed to fetch coins data. Status: ${data.status}`)]);
      }
    }));
  }
}
