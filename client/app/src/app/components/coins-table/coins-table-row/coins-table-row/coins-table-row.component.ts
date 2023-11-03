import { Component, Input } from '@angular/core';
import { Coin } from 'src/app/Interfaces/Coin';

@Component({
  selector: 'app-coins-table-row',
  templateUrl: './coins-table-row.component.html',
  styleUrls: ['./coins-table-row.component.scss']
})
export class CoinsTableRowComponent {
  @Input() rowData : any;
  
}
