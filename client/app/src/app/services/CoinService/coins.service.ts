import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map, of } from 'rxjs';
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

  ping()
  {
    return this.http.get<any>(`${environment.apiDomain}${environment.apiPingEndpoint}`, { observe: 'response' });
  }

  getTop100Coins(): Observable<CoinsData>
  {
    let currentTime: number = Date.now();
    let coinsData: CoinsData | undefined;
    try
    {
      coinsData = this.localStorageService.getObject('coins-data') as CoinsData;
    } catch (error) { }

    if (!coinsData || currentTime - coinsData.timeOfRequest > this.FIVE_MINUTES)
    {
      console.log('Making request to CoinGecko for coins info...');
      console.log(`Current time: ${new Date(Date.now())}`, `Time of previous request: ${coinsData ? new Date(coinsData.timeOfRequest) : 'No previous requst was made'}`);

      return this.#getCoinsData();
    } else
    {
      console.log('Getting coins data from local storage');
      return of(coinsData);
    }

  }

  #getCoinsData(): Observable<CoinsData>
  {
    let coinsData = this.http.get<Coin[]>(`${environment.apiDomain}${environment.apiTop100CoinsDefaultEndpoint}`).pipe(map((data) =>
    {
      let obj: CoinsData = {
        coins: [],
        timeOfRequest: 0
      };
      obj.coins = data;
      obj.timeOfRequest = Date.now();
      this.localStorageService.setObject('coins-data', obj);
      return obj;
    }));
    return coinsData;
  }
}
