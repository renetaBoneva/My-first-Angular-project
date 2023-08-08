import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading: boolean = true;
  constructor() {    
  }

  startLoading(){
    this.isLoading = true;    
  }
  
  stopLoading(){
    this.isLoading = false; 
  }
}
