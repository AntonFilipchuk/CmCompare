import { Component } from '@angular/core';
import { Coin } from 'src/app/Interfaces/Coin';
import { TestService } from 'src/app/services/TestService/test-service.service';

@Component({
  selector: 'app-test-one',
  templateUrl: './test-one.component.html',
  styleUrls: ['./test-one.component.scss']
})
export class TestOneComponent
{
  constructor (private testService: TestService)
  {

  }

  data$ = this.testService.getCoinsData();

  public changeBitcoinName(coins: Coin[])
  {
    coins[0].id = "TESTNAME";
  }
}
