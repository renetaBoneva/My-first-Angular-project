import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PassValidatorDirective } from './directives/validators/pass-validator.directive';



@NgModule({
  declarations: [
    LoadingComponent,
    ErrorPageComponent,
    PassValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    ErrorPageComponent,
    PassValidatorDirective
  ]
})
export class SharedModule { }
