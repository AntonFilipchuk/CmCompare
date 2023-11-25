import { Component } from '@angular/core';
import { catchError, ignoreElements, map, of } from 'rxjs';
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

  obj = { name: "Anton", id: 0 };

  foo$ = of(this.obj);
  bar$ = this.foo$.pipe(map(o => o.name));

  public change()
  {
    this.obj.name = "ololo";
  }
}
