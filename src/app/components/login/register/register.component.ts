import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  passwordValidator,
  noWhitespaceValidator,
} from "src/app/Utils/custom-validators";
import { Router } from "@angular/router";
import { usernameRegex, passwordRegex } from "src/app/Utils/regex";
import { AuthService } from "src/app/services/services/auth.service";
import { error } from "protractor";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  notReadyToSend: boolean = true;
  processing: boolean = false;
  router: Router;
  authService: AuthService;
  connectionErrorMessage = "";

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        username: new FormControl("", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(usernameRegex),
        ]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
          Validators.required,
          Validators.pattern(passwordRegex),
        ]),
        confirmPassword: new FormControl("", [
          Validators.required,
          Validators.pattern(passwordRegex),
        ]),
      },
      { validators: passwordValidator }
    );
    this.userForm.valueChanges.subscribe((val) => {
      this.notReadyToSend = !(
        this.userForm.controls["username"].dirty &&
        this.userForm.controls["email"].dirty &&
        this.userForm.controls["password"].dirty &&
        this.userForm.controls["confirmPassword"].dirty &&
        this.userForm.controls["username"].value != "" &&
        this.userForm.controls["email"].value != "" &&
        this.userForm.controls["password"].value != "" &&
        this.userForm.controls["confirmPassword"].value != "" &&
        this.userForm.controls["password"].value ==
          this.userForm.controls["confirmPassword"].value
      );
    });
  }

  createUser() {
    //TODO
    this.processing = true;
    this.userForm.disable();

    this.authService
      .register(
        this.userForm.controls["username"].value,
        this.userForm.controls["email"].value,
        this.userForm.controls["password"].value
      )
      .subscribe(
        () => {
          this.router.navigate(["registered"]);
        },
        (error) => {
          this.connectionErrorMessage = error["error"]["message"];
          this.processing = false;
          this.userForm.reset();
          this.userForm.enable();
        },
        () => {}
      );
  }

  getControlError(controlName: string): string {
    if (this.getControlValidity(controlName)) {
      return "";
    }
    let errorMessage: string = "";

    if (this.userForm.controls[controlName].hasError("required")) {
      errorMessage = "Vous devez remplir ce champ";
    } else {
      switch (controlName) {
        case "username":
          errorMessage = this.userForm.controls[controlName].hasError(
            "minLength"
          )
            ? "username trop petit."
            : "";
          errorMessage = this.userForm.controls[controlName].hasError(
            "maxLength"
          )
            ? "username trop grand."
            : "";
          break;
        case "email":
          errorMessage = this.userForm.controls[controlName].hasError("email")
            ? "email invalid"
            : "";
          break;
        case "password":
          errorMessage = this.userForm.controls[controlName].hasError("pattern")
            ? "mot de passe invalid"
            : "";
          break;
        case "confirmPassword":
          errorMessage = this.userForm.controls[controlName].hasError("email")
            ? "mot de passe invalid ou non conforme au premier"
            : "";
          break;
      }
    }
    return errorMessage;
  }
  getControlValidity(controlName: string): boolean {
    return this.userForm.controls[controlName].valid;
  }
}
