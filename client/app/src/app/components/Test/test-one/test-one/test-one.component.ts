import { Component } from '@angular/core';
import { catchError, ignoreElements, of } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { TestService } from 'src/app/Services/TestService/test-service.service';

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

  people$ = this.testService.getError();
  peopleErrors$ = this.people$.pipe(ignoreElements(), catchError((error) => of(error)));

  data$ = this.testService.get404Data();
  dataError$ = this.data$.pipe(ignoreElements(), catchError((error) => of(error)));
}
