import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';


@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;

  constructor( 
    private route : ActivatedRoute, 
    private router: Router,
    private pokemonService: PokemonService
    ) 
    { }

  ngOnInit(){
    this.handleGetPokemonById();
  }

  handleGetPokemonById(){
    const pokemonId : string| null = this.route.snapshot.paramMap.get('id');
    if(!pokemonId){
      throw new Error('Pokemon not found'); 
    }else{
      this.pokemonService.getPokemonById(+pokemonId)
      .subscribe(pokemon=> this.pokemon= pokemon)
    }
  }

  goBack(){
    this.router.navigate(['/pokemons']);

  }

  gotoEdit(pokemon: Pokemon){
    this.router.navigate(['/edit/pokemon', pokemon.id])
  }

  handleDeletePokemon(pokemon: Pokemon){
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(()=> this.goBack())
  }

}
