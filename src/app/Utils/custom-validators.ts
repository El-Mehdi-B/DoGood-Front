import { AbstractControl, FormControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl): {[key:string] :boolean} |null{
   //console.log('accessed password cross validator');
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value != confirmPassword.value ? {'mismatch':true}:null;
}
export function noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
