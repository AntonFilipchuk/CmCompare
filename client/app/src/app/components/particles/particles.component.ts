import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Coordinates } from 'src/app/Interfaces/Coordinates';
import { Particle } from 'src/app/Interfaces/Particle';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss']
})
export class ParticlesComponent implements OnInit
{
  @Input() particleImgPath!: string;
  // @Input() particleSize: number = 0;
  // @Input() density: number = 0;
  // @Input() verticalDirection: number = 0;
  // @Input() horizontalDirection: number = 0;
  @Input() backgroundColor: string = "white";

  public particles: Particle[] = [];

  constructor (private element: ElementRef)
  {

  }
  ngOnInit(): void
  {
    let divWidth = this.element.nativeElement.offsetWidth;
    let divHeight = this.element.nativeElement.offsetHeight;

    for (let index = 0; index < 4; index++)
    {
      this.particles.push({ coordinates: this.#getRandomXAndYPos(divWidth, divHeight), img: this.particleImgPath, size: 100 });
    }

  }

  #getRandomXAndYPos(width: number, height: number): Coordinates
  {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    return { XPos: randomX, YPos: randomY };
  }

}



