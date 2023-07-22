import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { isPassMismatch } from './isPassMatching';

@Directive({
  selector: '[appPassValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PassValidatorDirective,
      multi: true
    }
  ]
})
export class PassValidatorDirective implements Validator, OnChanges {
  @Input() appPassValidator = '';
  validator: ValidatorFn = () => null;

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
    // return null;
  }

  ngOnChanges(changes: SimpleChanges) {    
    const currentPassChanges = changes['appPassValidator'];
    if (currentPassChanges) {
      this.validator = isPassMismatch(this.appPassValidator);
    }
  }

}
