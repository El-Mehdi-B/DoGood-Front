import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator, noWhitespaceValidator } from 'src/app/Utils/custom-validators';
import { Router } from '@angular/router';
import { strict } from 'assert';
import { usernameRegex, passwordRegex } from 'src/app/Utils/regex';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	public userForm: FormGroup;
	notReadyToSend: boolean = true;
	processing: boolean = false;
	router: Router;


	constructor(router: Router) {
		this.router = router;
	}

	ngOnInit(): void {
		this.userForm = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(usernameRegex)]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.pattern(passwordRegex)]),
			confirmPassword: new FormControl('', [Validators.required, Validators.pattern(passwordRegex)])
		}, { validators: passwordValidator }
		)
		this.userForm.valueChanges.subscribe(val => {
			this.notReadyToSend = !(this.userForm.controls['username'].dirty && this.userForm.controls['email'].dirty && this.userForm.controls['password'].dirty && this.userForm.controls['confirmPassword'].dirty && this.userForm.controls['username'].value != "" && this.userForm.controls['email'].value != "" && this.userForm.controls['password'].value != "" && this.userForm.controls['confirmPassword'].value != "")
		})
	}

	createUser(): void {
		//TODO
		this.processing = true;
		this.userForm.disable();
		setTimeout(() => {
			if (this.userForm.valid) {

			} else {
				this.processing = false;
				this.userForm.enable();
				this.userForm.reset();
			}
		}, 4000)

	}
	
	getControlError(controlName: string): string{
		console.log('Error triggered in the control form:  '+controlName);
		if(this.getControlValidity(controlName)){
			console.log('function breaked;')
			return ''
		}
		let errorMessage: string ='';

		if (this.userForm.controls[controlName].hasError('required')) {
			console.log(' reached required');
			errorMessage = 'Vous devez remplir ce champ';
		}
		else{
			switch (controlName){
				case 'username':
					errorMessage=this.userForm.controls[controlName].hasError('minLength(8)')?'username trop petit.':'';
					errorMessage=this.userForm.controls[controlName].hasError('maxLength(32)')?'username trop grand.':'';
					break;
				case 'email':
					console.log(' reached switch statement')
					errorMessage=this.userForm.controls[controlName].hasError('email')?'email invalid':'';
					break;
				case 'password':
					errorMessage=this.userForm.controls[controlName].hasError('pattern')?'mot de passe invalid':'';
					break;
				case 'confirmPassword':
					errorMessage=this.userForm.controls[controlName].hasError('email')?'mot de passe invalid ou non conforme au premier':'';
					break;
			}
		}
		console.log('le message est: '+errorMessage);
		return errorMessage;
	}
	getControlValidity(controlName: string) : boolean{
		//console.log('validité de '+controlName+': '+ this.userForm.controls[controlName].valid);
		return this.userForm.controls[controlName].valid;
	}

}
















/*
  console.log('the form is : '+this.userForm.valid);
  console.log('username: '+
  this.userForm.controls['username'].valid+
  ', email: '+
  this.userForm.controls['email'].valid+
  ', password: '+ this.userForm.controls['password'].value +" :"+
  this.userForm.controls['password'].valid+
  ', password confirmation :'+ ''+ this.userForm.controls['password'].value +" is valid :"+
  this.userForm.controls['confirmPassword'].valid)
*/