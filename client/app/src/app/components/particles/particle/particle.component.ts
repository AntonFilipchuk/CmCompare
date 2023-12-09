import { Component, Input } from '@angular/core';
import { Particle } from 'src/app/Interfaces/Particle';

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss']
})
export class ParticleComponent {
  @Input() particle! : Particle;
}
 