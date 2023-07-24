import { Component, OnInit } from '@angular/core';

import { UserDetails } from '../../types/UserDetails';
import { db } from 'src/db.module';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserDetails | undefined = undefined;

  ngOnInit(): void {
    const ls = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE);
    // Temporary db TODO: get data from api service
    const usersDB = db.users;

    if (ls) {
      const parsedUser: UserDetails = JSON.parse(ls);
      this.userInfo = usersDB.filter(user => user._id == parsedUser._id)[0];
    }
  }

}
