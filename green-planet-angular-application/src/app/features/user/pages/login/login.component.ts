import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login(form: NgForm){
    if(form.invalid) {
      return;
    }
    
    console.log(form.value);    
  }
}
