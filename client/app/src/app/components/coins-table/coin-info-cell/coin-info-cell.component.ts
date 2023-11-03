import { Component, Input } from '@angular/core';
import { Coin } from 'src/app/Interfaces/Coin';

@Component({
  selector: 'app-coin-info-cell',
  templateUrl: './coin-info-cell.component.html',
  styleUrls: ['./coin-info-cell.component.scss']
})
export class CoinInfoCellComponent
{
  @Input() coin!: Coin;
}
