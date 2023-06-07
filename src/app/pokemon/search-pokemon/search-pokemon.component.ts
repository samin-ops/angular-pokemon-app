import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  
  
  searchterms = new Subject<string>; 
  pokemon$ : Observable<Pokemon[]>;

  constructor(
    private router: Router, 
    private pokemonService: PokemonService
    ) 
    { }

  ngOnInit(){ 
    this.pokemon$ = this.searchterms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term)=>this.pokemonService.searchPokemonList(term))
    );
  }

   search(term: string){
    this.searchterms.next(term);
   }


   goToDetail(pokemon: Pokemon){
    const link = [`/pokemon`, pokemon.id];
    this.router.navigate(link);
   }
}
