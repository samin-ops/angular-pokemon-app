import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent implements OnInit {
  
  pokemonList: Pokemon[]; 

  constructor(
    private router: Router,
    private pokemonService : PokemonService
    )
    {}

    ngOnInit(){
      this.handleGetPokemon(); 
    }
    
    // Affichier tous les pokemons
    handleGetPokemon(){
      this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList);
    }

  // Affichier les details d'un pokemon
  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }

}
