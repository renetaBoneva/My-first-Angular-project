import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { isNegativeNumber } from './isPositiveNumber';

@Directive({
  selector: '[appNegativeNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NegativeNumberDirective,
      multi: true
    }
  ]
})
export class NegativeNumberDirective  implements Validator, OnChanges{
  @Input() appNegativeNumber = '';
  validator: ValidatorFn = () => null;

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }
  
  ngOnChanges(changes: SimpleChanges) {    
    const currentPassChanges = changes['appNegativeNumber'];
    if (currentPassChanges) {
      this.validator = isNegativeNumber();
    }
  }

}