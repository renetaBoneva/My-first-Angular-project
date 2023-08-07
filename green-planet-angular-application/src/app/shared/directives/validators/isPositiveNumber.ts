import { ValidatorFn } from "@angular/forms";

export function isNegativeNumber(): ValidatorFn {
    return (control) => {
        return Number(control.value) >= 0
        ? null 
        : {isNegativeNumber: true}
    }
}