import { Component, OnInit } from '@angular/core';

import { HeroService } from '../hero.service';
import type { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selectedHero?: Hero;

  heroes: Hero[] = [];

  constructor(
    private heroService : HeroService,
  ) { }

  ngOnInit(): void {
    this.updateHeroes();
  }

  updateHeroes() : void {
    this.heroService.getHeroes()
      .subscribe((heroes) => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
