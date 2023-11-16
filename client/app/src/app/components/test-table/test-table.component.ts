import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, from, map, of, switchMap, take, takeLast } from 'rxjs';
import { TestService } from 'src/app/Services/TestService/test-service.service';




@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent
{


}
