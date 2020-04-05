import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordRegex, usernameRegex } from 'src/app/Utils/regex';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  router:Router;
  notReadyToSend: boolean = true;
  processing: boolean = false;
  

  constructor(router:Router) {this.router=router; }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username:new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(usernameRegex)]),
      password: new FormControl('', [Validators.required, Validators.pattern(passwordRegex)])
    })
    this.loginForm.valueChanges.subscribe((val) => {
			this.notReadyToSend = !(this.loginForm.controls['username'].dirty && this.loginForm.controls['password'].dirty && this.loginForm.controls['username'].value != "" && this.loginForm.controls['password'].value != "" )
		})
  }

  login():void{

    this.processing= true;
    this.loginForm.disable();
    console.log('Login action');
    if(this.loginForm.valid){

    }else{
      
    }
  }
  

}
