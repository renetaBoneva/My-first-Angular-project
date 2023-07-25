import { Component } from '@angular/core';
import { UserService } from 'src/app/features/user/services/user-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private userService: UserService) { }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

}
