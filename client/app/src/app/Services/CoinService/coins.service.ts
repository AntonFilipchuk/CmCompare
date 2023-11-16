import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map, of, shareReplay, catchError, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from '../LocalStorageService/local-storage.service';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsData } from 'src/app/Interfaces/CoinsData';


const FIVE_MINUTES: number = 300000;
const COINS_DATA_LOCAL_STORAGE_KEY = 'test-coins-data';


@Injectable({
  providedIn: 'root'
})
export class CoinsService
{
  constructor (private http: HttpClient, private localStorageService: LocalStorageService) { }

  private coinsData$: Observable<CoinsData> | undefined;

  public getCoinsData(): Observable<CoinsData>
  {
    if (this.localStorageService.ifLocalStorageAvaliable)
    {
      if (!this.coinsData$)
      {
        this.coinsData$ = this.getFreshCoinsDataAndSaveToLocalStorage().pipe(shareReplay(1));
      }

      return this.coinsData$;
    }

    if (!this.coinsData$)
    {
      this.coinsData$ = this.getFreshCoinsDataFromApi().pipe(shareReplay(1));
    }

    return this.coinsData$;

  }

  private getFreshCoinsDataAndSaveToLocalStorage(): Observable<CoinsData>
  {

    try
    {
      let coinsData = this.getCoinsFromLocalStorage(COINS_DATA_LOCAL_STORAGE_KEY);
      let currentTime = Date.now();
      if (currentTime - coinsData.timeOfRequest > FIVE_MINUTES)
      {
        return this.getFreshCoinsDataFromApiAndWriteResultToLocalStorage(COINS_DATA_LOCAL_STORAGE_KEY);
      }
      return of(coinsData);
    } catch (error)
    {
      return this.getFreshCoinsDataFromApiAndWriteResultToLocalStorage(COINS_DATA_LOCAL_STORAGE_KEY);
    }
  }


  private writeCoinsDataToLocalStorage(coinsData: CoinsData, key: string)
  {
    try
    {
      this.localStorageService.setObject(key, coinsData);
    }
    catch (error)
    {
      if (error instanceof Error)
      {
        throw error;
      }
      throw new Error("Error when writing coins data to local storage");
    }
  }

  private getFreshCoinsDataFromApi(): Observable<CoinsData>
  {
    console.log('Making request to an API!');
    return this.http.get<Coin[]>(`${environment.apiDomain}${environment.apiTop100CoinsDefaultEndpoint}`, { observe: 'response' })
      .pipe(
        catchError(
          (error) => 
          {
            if (error instanceof Error)
            {
              return throwError(() => error);
            }
            return throwError(() => new Error(`Error GET method`));
          }
        ),
        map((data) =>
        {
          if (data.ok && data.body)
          {
            let coinsData: CoinsData = { coins: (data.body).slice(0, 5), timeOfRequest: Date.now() };
            return coinsData;
          }
          else 
          {
            throw new Error(`Error while getting data from API.\n Status: ${data.status}.\n Body: ${data.body}`);
          }
        }));
  }
  private getFreshCoinsDataFromApiAndWriteResultToLocalStorage(key: string): Observable<CoinsData>
  {
    return this.getFreshCoinsDataFromApi().pipe(tap(
      (coinsData: CoinsData) =>
      {
        try
        {
          this.writeCoinsDataToLocalStorage(coinsData, key);
        } catch (error)
        {
          if (error instanceof Error)
          {
            return throwError(() => error);
          }
          return throwError(() => new Error(`Error writing coins data to local storage`));
        }
        return null; // tap does not return anything, added to avoid ts warning
      }));
  }
  private getCoinsFromLocalStorage(key: string): CoinsData
  {
    try
    {
      let coinsData = this.localStorageService.getObject(key) as CoinsData;

      if (!coinsData)
      {
        throw new Error(`Coins' data is null!`);
      }
      return coinsData;
    } catch (error)
    {
      if (error instanceof Error)
      {
        throw error;
      }
      throw new Error("Error when getting coins' data from storage");
    }
  }
}