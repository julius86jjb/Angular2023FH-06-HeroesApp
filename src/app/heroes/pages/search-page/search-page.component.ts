import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable, map, startWith, switchMap, take, tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent implements OnInit, OnDestroy {

  public searchInput = new FormControl('')

  public heroes: Hero[] = []

  public selectedHero?: Hero;

  private suggestionSubscription?: Subscription

  // heroesFiltrados!: Observable<Hero[]>;


  constructor(
    private heroesService: HeroesService,
    private router: Router) {
  }




  ngOnInit() {
    this.suggestionSubscription = this.searchInput.valueChanges.pipe(
      switchMap( (value:any) => this.heroesService.getSuggestions( value) )
    ).subscribe((heroes: Hero[]) => {
      if (this.searchInput.value === ''){
        this.heroes = [];
        return;
      }
      this.heroes = heroes
    })
  }

  // ngOnInit(): void {
  //   this.searchInput.valueChanges.pipe(
  //     map(value => this.getSuggestion(value || '')),
  //   ).subscribe()
  // }

  // private getSuggestion(value:string) {
  //   this.heroesService.getSuggestions(value)
  //     .subscribe(heroes => this.heroes = heroes)
  // }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;
    this.router.navigate(['heroes', hero.id])
  }




  // searchHero() {
  //   const value: string = this.searchInput.value || '';

  //   this.heroesService.getSuggestions( value )
  //     .subscribe( heroes => this.heroes = heroes );
  // }

  ngOnDestroy(): void {
    this.suggestionSubscription?.unsubscribe();
  }


}
