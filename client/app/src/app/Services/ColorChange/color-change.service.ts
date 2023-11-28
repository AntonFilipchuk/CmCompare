import { Injectable } from '@angular/core';
import { CoinsDashboardService } from '../CoinsDashboard/coin-dashboard.service';
import { Color } from 'src/app/Interfaces/Color';
import { distinctUntilChanged, map, take, tap } from 'rxjs';


const LIGHT_RED = Color(255, 131, 131);
const RED = Color(255, 0, 0);
const DARK_RED = Color(204, 0, 0);
const LIGHT_GREEN = Color(131, 255, 131);
const GREEN = Color(0, 255, 0);
const DARK_GREEN = Color(0, 204, 0);
const WHITE = Color(255, 255, 255);

@Injectable({
  providedIn: 'root'
})

export class ColorChangeService
{

  constructor (private coinsDashboardService: CoinsDashboardService) { }


  public coinsDashboardBgColor$ = this.coinsDashboardService.prevAndCurrentCoinPricePercentChange$.pipe(distinctUntilChanged(), map(
    (percent: number): string =>
    {
      let color;

      if (percent >= -2 && percent < 2)
      {
        color = WHITE;
      } else if (percent >= 2)
      {
        if (percent >= 50)
        {
          color = this.#interpolateColor(GREEN, DARK_GREEN, Math.min(1, percent / 100));
        } else
        {
          color = this.#interpolateColor(LIGHT_GREEN, GREEN, Math.min(1, percent / 50));
        }
      } else
      {
        if (percent <= -50)
        {
          color = this.#interpolateColor(RED, DARK_RED, Math.min(1, Math.abs(percent) / 100));
        } else
        {
          color = this.#interpolateColor(LIGHT_RED, RED, Math.min(1, Math.abs(percent) / 50));
        }
      }

      return this.#toRGB(color);
    }

  ), tap(val => console.log(val)
  ));

  #toRGB(color: Color): string
  {
    let arr = [color.red, color.green, color.blue];
    return arr.slice(0, 3).reduce((acc, current, index) =>
    {
      if (index < 2)
      {
        return acc + (current + ",");
      }
      if (index === 2)
      {
        return acc + current + ')';
      }
      return acc;
    }, "rgb(");
  }

  #calcOpacity(percent: number): number
  {

    if (percent < 0)
    {
      return Math.abs(percent) / 100;
    }
    let c = 255 - Math.min(255, percent / 100);
    return Math.max(0.3, c);
  }


  #interpolateColor(color1: Color, color2: Color, factor: number): Color
  {
    let newRed = factor * (color2.red - color1.red);
    let newGreen = factor * (color2.green - color1.green);
    let newBlue = factor * (color2.blue - color1.blue);
    let newColor = Color(
      Math.round(color1.red + newRed),
      Math.round(color1.green + newGreen),
      Math.round(color1.blue + newBlue)
    );
    return newColor;
  };


}

function Color(red: number, green: number, blue: number, alpha: number = 100): Color
{
  return { red: red, green: green, blue: blue, alpha: alpha };
}