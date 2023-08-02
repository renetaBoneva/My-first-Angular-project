import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService){}

  register(form: NgForm) {
    if(form.invalid) {
      return;
    }
    
    // todo: show server errors!   
    const { email, firstName, lastName, password, rePass, address } = form.value;
    this.userService.register(email, firstName, lastName, password, rePass, address);
  }
}
