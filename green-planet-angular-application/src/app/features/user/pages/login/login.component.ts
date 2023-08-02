import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService) { }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    const { email, password } = form.value;
    this.userService.login( email, password);
  }
}
