import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register(form: NgForm) {
    if(form.invalid) {
      return;
    }
    
    // todo: show server errors!   
    // todo: handle register 
    console.log(form.value);    
  }
}
