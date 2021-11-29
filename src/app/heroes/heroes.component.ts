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

  add(name: string): void {
    name = name.trim();

    if (!name) return;

    this.heroService.addHero({ name } as Hero)
      .subscribe((hero) => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  ngOnInit(): void {
    this.updateHeroes();
  }

  updateHeroes() : void {
    this.heroService.getHeroes()
      .subscribe((heroes) => this.heroes = heroes);
  }
}
