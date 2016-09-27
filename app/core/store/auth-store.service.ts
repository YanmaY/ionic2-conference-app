/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from '../actions/auth-action';
import { AppState } from '../reducers/index';
import { AuthSelector } from '../selectors/auth-selector';
import { UserModel } from '../providers/auth/user-model';
import { AuthEffect } from '../effects/auth-effect';
import { SignupModel } from '../providers/auth/signup-model';

@Injectable()
export class AuthStoreService {

  constructor(private store: Store<AppState>,
              private authEffects: AuthEffect,
              private authActions: AuthActions) {
  }

  public dispatchCheckToken(): void {
    this.store.dispatch(
      this.authActions.checkToken()
    );
  }

  public dispachAuth(username: string, password: string) {
    this.store.dispatch(
      this.authActions.auth(username, password)
    );
  }

  public dispachSignin(data: SignupModel) {
    this.store.dispatch(
      this.authActions.signUp(data)
    );
  }

  public dispatchLogout(): void {
    this.store.dispatch(
      this.authActions.logout()
    );
  }

  public dispatchUnauthorized(): void {
    this.store.dispatch(
      this.authActions.unauthorized()
    );
  }

  public signedOut(): any {
    return this.authEffects.signUpSuccess$;
  }

  public loggedOut(): any {
    return this.authEffects.logout$;
  }

  public getCurrentUser(): Observable<UserModel> {
    return this.store.let(AuthSelector.getCurrentUser());
  }

  public isLoading(): Observable<boolean> {
    return this.store.let(AuthSelector.isLoading());
  }

  public getErrorMessage(): Observable<string> {
    return this.store.let(AuthSelector.getErrorMessage());
  }
}
