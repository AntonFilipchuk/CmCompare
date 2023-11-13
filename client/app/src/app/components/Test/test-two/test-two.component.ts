import { Component } from '@angular/core';
import { map } from 'rxjs';
import { TestService } from 'src/app/services/TestService/test-service.service';

@Component({
  selector: 'app-test-two',
  templateUrl: './test-two.component.html',
  styleUrls: ['./test-two.component.scss']
})
export class TestTwoComponent
{

  constructor (private testService: TestService)
  {

  }

 // data$ = this.testService.getCoinsData().pipe(map(val => structuredClone(val)));
}
