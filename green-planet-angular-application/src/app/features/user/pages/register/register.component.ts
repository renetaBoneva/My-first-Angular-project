import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // passwords: Object = {
  //   password: '',
  //   rePass: ''
  // }

  register(form: NgForm) {
    if(form.invalid) {
      return;
    }

    console.log(form.value);    
  }

}
