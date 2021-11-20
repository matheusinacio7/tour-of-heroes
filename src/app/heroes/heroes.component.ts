import { Component, OnInit } from '@angular/core';

import { HEROES } from '../mock-heroes';
import type { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };

  heroes = HEROES;

  constructor() { }

  ngOnInit(): void {
  }

}
