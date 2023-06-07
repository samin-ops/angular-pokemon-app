import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Pokemon } from './pokemon';

const pokemonUrl = 'api/pokemons';

@Injectable()

export class PokemonService {

  constructor(private http: HttpClient){}

  getPokemonList():Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(pokemonUrl).pipe(
      tap((response)=> this.log(response)),
      catchError((error)=>this.handleError(error, [])) 
    );
  }
  
  getPokemonById(pokemonId: number):Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`pokemonUrl/${pokemonId}`).pipe(
      tap((response)=> this.log(response)),
      catchError((error)=> this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon):Observable<null>{
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(pokemonUrl, pokemon, httpOption).pipe(
      tap((response)=>this.log(response)),
      catchError((error)=>this.handleError(error, null))
    );
    
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<Pokemon>(pokemonUrl, pokemon, httpOption).pipe(
      tap((response)=>this.log(response)),
      catchError((error)=>this.handleError(error, null))
    );

  }

  deletePokemonById(pokemonId: number):Observable<null>{
    return this.http.delete(`pokemonUrl/${pokemonId}`).pipe(
      tap((response)=> this.log(response)),
      catchError((error)=> this.handleError(error, undefined))
    );
  }

  private log(response:any){
    return console.table(response)
  }
  private handleError(error: Error, errValue: any){
    console.error(error)
    return of(errValue)
  }

  searchPokemonList(term: string):Observable<Pokemon[]>{
    if(term.length <= 1){
      return of([]);
    }
    return this.http.get<Pokemon[]>(`pokemonUrl/?name=${term}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error)=>this.handleError(error, []))
    );
  }

  getPokemonTypes(): string[]{
    return [
      'Plante', 
      'Eau', 
      'Feu', 
      'Insecte', 
      'Normal', 
      'Electrik', 
      'Poison', 
      'Fee', 
      'Vol', 
      'Combat', 
      'Psy'  
    ];
  }
}
