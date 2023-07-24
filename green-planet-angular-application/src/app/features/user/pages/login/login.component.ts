import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { db } from 'src/db.module';
import { environment } from 'src/environments/environment.development';
import { UserDetails } from '../../types/UserDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Temporary db TODO: get data from api service
    // show server errors!   
    const usersDB: UserDetails[] | [] = db.users;
    const userFromDB = usersDB.filter(user => user.email == form.value.email && user.password == form.value.password)[0];
    const isValidUser = !!userFromDB;
    
    if (isValidUser) {
      localStorage.setItem(
        environment.USER_KEY_LOCAL_STORAGE, 
        JSON.stringify(userFromDB)
        );
        
      console.log('Valid form');
    } else {
      console.log('Invalid form');      
    }

  }
}
