import { Component, OnInit } from '@angular/core';

import { HeroService } from '../hero.service';
import type { Hero } from '../hero';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.updateHeroes();
  }

  updateHeroes() : void {
    this.heroService.getHeroes()
      .subscribe((heroes) => this.heroes = heroes);
  }
}
