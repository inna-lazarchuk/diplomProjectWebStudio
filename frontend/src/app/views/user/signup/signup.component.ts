import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^([А-ЯЁ][а-яё]*\s*){1,3}$/)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z-_.]{8,}$/)]],
    agree: ['', [Validators.requiredTrue]],
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {

  }

  signUp() {
    if (this.signupForm.valid && this.signupForm.value.name && this.signupForm.value.email
      && this.signupForm.value.password && this.signupForm.value.agree) {
      this.authService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)
        .subscribe({
          next: ((data: DefaultResponseType | LoginResponseType) => {
            let error = null;

            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }

            const signUpResponse: LoginResponseType = data as LoginResponseType;
            if (!signUpResponse.accessToken || !signUpResponse.refreshToken || !signUpResponse.userId) {
              this._snackBar.open('Ошибка ответа на запрос. Не полные данные пользователя.')
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(signUpResponse.accessToken, signUpResponse.refreshToken);
            this.authService.userId = signUpResponse.userId;
            this._snackBar.open('Вы успешно зарегистрированы');
            this.router.navigate(['/']);
          }),
          error: ((errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка регистрации');
            }
          })
        })
    }
  }
}
