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
    this.userService.editUser(email, firstName, lastName, address).subscribe(() => {
      this.changeMode();
    })
    console.log('edited');    
  }
  
  deleteUser() {
    const areYouSure = window.confirm('Are you sure you want to delete your profile?')
    
    if(areYouSure){
      this.userService.deleteUser();
    }    
  }
  
  cancelEdit() {
    // TODO: make it reactive form
    this.userService.getUserDetails().subscribe((userDetails) => {
      this.userInfo = userDetails;
      this.changeMode();
    });
    console.log('canceled');    
  }

  changeMode(): void {
    this.isEditMode = !this.isEditMode;
  }
}
