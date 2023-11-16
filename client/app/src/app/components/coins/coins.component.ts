import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsService } from 'src/app/Services/CoinService/coins.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent
{
  constructor (private coinsService: CoinsService)
  { }

  public coinsTable: Observable<Coin[]> | undefined;
}
