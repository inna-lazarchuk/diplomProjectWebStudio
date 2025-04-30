import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IsActiveMatchOptions, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {UserInfoType} from "../../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogged: boolean;
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  )
  {
    this.userLogged = this.authService.getIsLoggedIn();
    this.getUserName();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.userLogged = isLoggedIn;
      this.getUserName();
    });
    this.getUserName();
  }

  logOut(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogOut();
        },
        error: () => {
          this.doLogOut();
        }
      })
  }

  doLogOut(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  getUserName() {
    this.userService.getUserInfo()
      .subscribe({
        next: ((data: DefaultResponseType | UserInfoType) => {
          console.log(data);
          let error = null;

          if ((data as DefaultResponseType).error !== undefined) {
            error = (data as DefaultResponseType).message;
          }

          const userInfo = data as UserInfoType;
          if (!userInfo.id || !userInfo.name || !userInfo.email) {
            this._snackBar.open('Ошибка ответа на запрос. Не полные данные пользователя.');
          }

          if (error) {
            this._snackBar.open(error);
            throw new Error(error);
          }
          this.userName = userInfo.name;
        }),
        error: ((errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка запроса данных пользователя');
          }
        })
      })
  }
}
