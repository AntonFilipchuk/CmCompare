import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, from, map, of } from 'rxjs';

export interface PeriodicElement
{
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit
{
  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columns$: Observable<string[]> = of(this.displayedColumns);
  ELEMENT_DATA!: PeriodicElement[];
  elements$!: Observable<PeriodicElement[]>;


  ngOnInit()
  {
    this.ELEMENT_DATA = [
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    ];

    this.elements$ = of(this.ELEMENT_DATA);
  }

  drop(event: CdkDragDrop<PeriodicElement[] | any>)
  {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
