import { Component,  ViewChild } from '@angular/core';
import {  Observable,  } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { MatTable, } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CoinsDisplayService } from 'src/app/Services/CoinsDisplay/coins-display.service';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent
{
  constructor (private coinsDisplayService: CoinsDisplayService)
  { }
  @ViewChild(MatTable, { static: false }) public matTable!: MatTable<any>;
  public coinsTable$: Observable<Coin[]> = this.coinsDisplayService.coinsTable$;
  public displayedColumns: string[] = ['#', 'id', 'current_price', 'circulating_supply', 'market_cap'];
  #coinsMarketCaps: number[] | undefined;

  moveTableRows(event: CdkDragDrop<Coin[], any, any>, coinsTable: Coin[])
  {
    const selectedCoinIndex = coinsTable.findIndex((coin) => coin.id === event.item.data.id);
    this.#coinsMarketCaps = coinsTable.map(coin => coin.market_cap);
    if (selectedCoinIndex === event.currentIndex)
    {
      return;
    }
    moveItemInArray(coinsTable, selectedCoinIndex, event.currentIndex);

    this.recalculateCoinsValues(this.#coinsMarketCaps, coinsTable);
    this.matTable.renderRows();
  }
  recalculateCoinsValues(coinsMarketCaps: number[], coinsTable: Coin[])
  {
    coinsTable.map((coin, index) => 
    {
      coin.market_cap = coinsMarketCaps[index];
      coin.current_price = coin.market_cap / coin.circulating_supply;
      coin.market_cap_rank = ++index;
    });
  }

  onDragStart(rowData: any)
  {
    let coin = rowData as (Coin | null);
    this.coinsDisplayService.setSelectedCoin(coin);
  }

}








