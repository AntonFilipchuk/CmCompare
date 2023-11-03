import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, from, map, of, switchMap, take, takeLast } from 'rxjs';
import { TestService } from 'src/app/services/TestService/test-service.service';




@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent
{
  constructor(private testService : TestService)
  {
    
  }
  foo$: Observable<number> = this.testService.getRandomData();
  modifiedFoo$ = this.foo$.pipe(map(val => val * 10));
  changeFoo()
  {
    // let a : Observable<number> = this.foo$.pipe(map(x => 

    //   {
    //     console.log(x);
    //     return x + 2;
    // }));
    // a.subscribe(val => this.foo$ = of(val)).unsubscribe();

    this.foo$ = this.foo$.pipe(
      map((x,i) =>
      {
        console.log(x);
        return x + 2;
      })
    );
  }

  getNewData()
  {
    this.foo$ = this.testService.getRandomData()
  }

  makeSubsctiotion()
  {
    console.log(this.foo$);

    this.foo$.subscribe(val => console.log("Sub :", val)
    ).unsubscribe();
  }

}
