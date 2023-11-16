import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of, shareReplay, tap, throwError } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsData } from 'src/app/Interfaces/CoinsData';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from '../LocalStorageService/local-storage.service';

const FIVE_MINUTES: number = 300000;
const COINS_DATA_LOCAL_STORAGE_KEY = 'test-coins-data';

@Injectable({
  providedIn: 'root'
})

export class TestService
{

  constructor (private localStorageService: LocalStorageService, private http: HttpClient)
  {

  }
  people: Person[] = [{ id: 0, name: "Anton" }, { id: 1, name: "Kate" }];

  getPeople(): Observable<Person[]> 
  {
    return of(this.people);
  }

  getError(): Observable<Person[]>
  {
    return of(this.people).pipe(tap(() =>
    {
      throw new Error("Error getting people");
    }));
  }


  get404Data(): Observable<any>
  {
    return this.http.get<any>('https://httpbin.org/get', { observe: 'response' }).pipe(catchError(() => 
    {
      throw new Error('Woops');
    }), tap((data) => 
    {
      //throw new Error(`Status code: ${data.status}`);
    }), shareReplay(1));
  }
}

interface Person
{
  id: number;
  name: string;
}
