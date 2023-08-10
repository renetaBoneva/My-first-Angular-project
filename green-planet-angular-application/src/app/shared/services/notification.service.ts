import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess(message: string) {
    this.toastr.success(message, "Woohoo!", { timeOut: 1000 })
  }

  showError(message: string) {
    this.toastr.error(message, "Error!")
  }
}
