import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BaseAPIResponse } from '../../models/apis/api-mock.model';
import { LoginResponse, RefreshResponse } from '../../models/apis/auth';
import { TokenStorageService } from '../token-storage/token-storage.service';
import { UserService } from '../user/user.service';
import { environment } from '../../../../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private userService: UserService = inject(UserService);
  private tokenStorageService: TokenStorageService =
    inject(TokenStorageService);

  /**
   * Initiates the login process for a user.
   * @param loginData - Object containing the user's email and password.
   * @returns Observable<LoginResponse> - Observable of the login response.
   */
  loginUser(loginData: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('X-Skip-Interceptor', 'true');

    return this.http
      .post<LoginResponse>(`${environment.base_url}/login`, loginData, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          // Save access token if present
          if (response.data.accessToken) {
            this.tokenStorageService.saveAccessToken(response.data.accessToken);
          }
          // Save first-time token if present
          if (response.data.firstTimeToken) {
            this.tokenStorageService.saveFirstTimeToken(
              response.data.firstTimeToken
            );
          }
          // Save forget password token if present
          if (response.data.forgetPasswordToken) {
            this.tokenStorageService.saveForgetToken(
              response.data.forgetPasswordToken
            );
          }

          // Save user data and update the current user in the user service
          this.tokenStorageService.saveUser(response.data.user);
          this.userService.currentUser = response.data.user;
        }),
        // Catch and rethrow any errors that occur during the login process
        catchError((error) => throwError(() => error))
      );
  }

  /**
   * Creates a password for a first-time user and saves the access token and user data upon success.
   * @param password - The new password to set.
   * @returns Observable<LoginResponse> - Observable of the response after setting the password.
   */
  createPassword(password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders()
      .set('X-Skip-Interceptor', 'true')
      .append(
        'Authentication',
        this.tokenStorageService.getFirstTimeToken() ?? ''
      );

    return this.http
      .patch<LoginResponse>(
        `${environment.base_url}/initial/password/change`,
        { password },
        { headers }
      )
      .pipe(
        tap((response) => {
          this.tokenStorageService.clearResetTokens();
          if (response.data.accessToken) {
            this.tokenStorageService.saveAccessToken(response.data.accessToken);
          }

          this.tokenStorageService.saveUser(response.data.user);
          this.userService.currentUser = response.data.user;
        })
      );
  }

  /**
   * Sends a password reset request for the given email.
   * @param email - Email address for password reset.
   * @returns Observable<BaseAPIResponse> - Observable of the reset response.
   */
  forgetPassword(email: string): Observable<BaseAPIResponse> {
    const headers = new HttpHeaders().set('X-Skip-Interceptor', 'true');
    return this.http.post<BaseAPIResponse>(
      `${environment.base_url}/forget/password`,
      { email },
      { headers }
    );
  }

  /**
   * Resets the user’s password with a reset token and saves the access token and user data upon success.
   * @param password - New password to set.
   * @returns Observable<LoginResponse> - Observable of the response after resetting the password.
   */
  resetPassword(password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders()
      .set('X-Skip-Interceptor', 'true')
      .append(
        'Authentication',
        this.tokenStorageService.getForgetToken() ?? ''
      );

    return this.http
      .patch<LoginResponse>(
        `${environment.base_url}/reset/forgotten/password`,
        { password },
        { headers }
      )
      .pipe(
        tap((response) => {
          this.tokenStorageService.clearResetTokens();
          if (response.data.accessToken) {
            this.tokenStorageService.saveAccessToken(response.data.accessToken);
          }

          this.tokenStorageService.saveUser(response.data.user);
          this.userService.currentUser = response.data.user;
        })
      );
  }

  /**
   * Logs out the current user and clears session data.
   * @returns Observable<void> - Observable indicating the logout process has completed.
   */
  logout() {
    return this.http.get(`${environment.base_url}/logout`).pipe(
      tap(() => {
        this.tokenStorageService.clear();
      })
    );
  }

  /**
   * Refreshes the authentication token.
   * @returns Observable<RefreshResponse> - Observable of the new token data.
   */
  refreshToken(): Observable<RefreshResponse> {
    const headers = new HttpHeaders().set('X-Skip-Interceptor', 'true');

    return this.http.get<RefreshResponse>(`${environment.base_url}/refresh`, {
      headers,
      withCredentials: true,
    });
  }
}
