import { Component, OnInit } from '@angular/core';

import { UserDetails } from '../../types/UserDetails';
import { UserService } from '../../services/user-service.service';
import { Order } from 'src/app/features/products/types/Order';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserDetails | undefined;
  userOrders: Order[] | undefined;
  isEditMode: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe((userDetails) => {      
      this.userInfo = userDetails;
    });

    // TODO: get user orders
  }

  editUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, firstName, lastName, address } = form.value;
    this.userService.editUser(email, firstName, lastName, address).subscribe((user) => {
      this.changeMode();
    })
  }

  changeMode(): void {
    this.isEditMode = !this.isEditMode;
  }

}
