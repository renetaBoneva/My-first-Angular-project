import { ValidatorFn } from "@angular/forms";

export function isPassMismatch(password: string): ValidatorFn {
    return (control) => {
        console.log('control repass -> ', control.value);
        console.log('control password -> ', password);
        
        return control.value === password  
        ? null 
        : {isPassMismatch: true}
    }
}