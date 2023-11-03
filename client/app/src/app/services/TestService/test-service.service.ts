import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService
{

  constructor () { }

  getRandomData()
  {
    let prevNumber: number = 0;
    let randomNumber: number = this.getRandomNumber();
    while (prevNumber === randomNumber)
    {
      randomNumber = this.getRandomNumber();
    }
    prevNumber = randomNumber;
    return of(randomNumber);
  }

  getRandomNumber()
  {
    return Math.floor(Math.random() * 100);
  }
}
