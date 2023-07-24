import { ValidatorFn } from "@angular/forms";

export function isPassMismatch(password: string): ValidatorFn {
    return (control) => {
        const rePass = control.value;
        return rePass === password  
        ? null 
        : {isPassMismatch: true}
    }
}