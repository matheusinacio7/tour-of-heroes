import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.fetchHero();
  }

  goBack(): void {
    this.location.back();
  }

  fetchHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe((hero) => this.hero = hero);
  }

  save(): void {
    if (!this.hero) return;

    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
