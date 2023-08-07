import { Component, OnInit } from '@angular/core';

import { UserDetails } from '../../types/UserDetails';
import { UserService } from '../../services/user-service.service';
import { Order } from 'src/app/features/products/types/Order';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserDetails | undefined;
  userOrders: Order[] = [];
  isEditMode: boolean = false;

  form = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(2)]],
    lastName: ["", [Validators.required, Validators.minLength(2)]],
    address: ["", [Validators.required, Validators.minLength(4)]],
  })

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userService.getUserDetails()
    this.userService.userDetails$.subscribe({
      next: userInfo => {
        if (userInfo) {
          this.form.setValue({
            firstName: userInfo?.firstName,
            lastName: userInfo?.lastName,
            address: userInfo?.address,
          })
        }
        this.userInfo = userInfo;
        this.userOrders = userInfo ? userInfo.myOrders : [];
      }
    })
  }


  editUserReact() {
    if (this.form.invalid) {
      return;
    }

    const { firstName, lastName, address } = this.form.value;
    
    if (firstName && lastName && address) {
      this.userService.editUser({ ...this.userInfo!, firstName, lastName, address })
      this.changeMode();
    }
  }


  deleteUser() {
    const areYouSure = window.confirm('Are you sure you want to delete your profile?')

    if (areYouSure) {
      this.userService.deleteUser();
    }
  }

  cancelEdit() {
    if (this.userInfo) {
      this.form.setValue({
        firstName: this.userInfo?.firstName,
        lastName: this.userInfo?.lastName,
        address: this.userInfo?.address,
      })
    }

    this.changeMode();
  }

  changeMode(): void {
    this.isEditMode = !this.isEditMode;
  }
}
