import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
     <h2 class="center">Editer {{pokemon?.name}}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture">
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon">
    </app-pokemon-form>
    <app-loader></app-loader>
  `,
})
export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon| undefined;

  constructor(private route: ActivatedRoute, 
    private pokemonService: PokemonService
    ) { }

  ngOnInit(){
    this.handleGetPokemonById();
  }

  handleGetPokemonById(){
    const pokemonID: string| null = this.route.snapshot.paramMap.get('id');
    if(pokemonID){
      this.pokemonService.getPokemonById(+pokemonID)
      .subscribe(pokemon => this.pokemon = pokemon);
    }else{
      this.pokemon = undefined;
    }
  }
}
