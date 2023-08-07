import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PassValidatorDirective } from './directives/validators/pass-validator.directive';
import { NegativeNumberDirective } from './directives/validators/positive-number.directive';



@NgModule({
  declarations: [
    LoadingComponent,
    ErrorPageComponent,
    PassValidatorDirective,
    NegativeNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    ErrorPageComponent,
    PassValidatorDirective,
    NegativeNumberDirective
  ]
})
export class SharedModule { }
