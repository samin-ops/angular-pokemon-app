import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent{

  message: string = "Vous etes deconnecte. (pikachu/pikachu) 🖐🏻";
  name:string;
  password: string;
  
  constructor(
    public auth: AuthService, 
    private router: Router
    ) {}

  setMessage(){
    this.message = this.auth.isLoggedIn ? "Vous etes Connecte" : "Identifiant ou mot de passe incorrect.😡";
  }
  
  setLogin(){
    this.message = "Tentative de connection...";
    this.auth.logIn(this.name, this.password)
    .subscribe(() =>{
      this.setMessage()
      if(this.auth.isLoggedIn){
        let redirect = this.auth.redirectUrl ? this.auth.redirectUrl :'/pokemons';
        this.router.navigate([redirect]); 
      }else{
        this.password ='';
      }
    });
     
  }

  setLogout(){
    this.auth.logOut();
    this.message = "Vous etes deconnecte."
  }


  
  
  

}



