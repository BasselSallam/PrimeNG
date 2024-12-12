import { Injectable } from '@angular/core';
import { LocalSotarge } from '../../enums/local-storage-keys';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  clear(): void {
    window.localStorage.clear();
  }

  /**
   * Clears the first time token and forget password token from local storage.
   * This method is used to remove any reset tokens that may have been stored
   * when the user performs a password reset or other similar action.
   */
  clearResetTokens(): void {
    localStorage.removeItem(LocalSotarge.FIRST_TIME_TOKEN_KEY);
    localStorage.removeItem(LocalSotarge.FORGET_TOKEN_KEY);
  }

  /**
   * Saves the access token to the local storage.
   * @param token - The access token to be saved.
   */
  public saveAccessToken(token: string): void {
    localStorage.removeItem(LocalSotarge.ACCESS_TOKEN_KEY);
    localStorage.setItem(LocalSotarge.ACCESS_TOKEN_KEY, token);
  }

  /**
   * Retrieves the access token from local storage.
   * @returns {string | null} - The access token if it exists, otherwise null.
   */
  public getAccessToken(): string | null {
    return localStorage.getItem(LocalSotarge.ACCESS_TOKEN_KEY);
  }

  /**
   * Saves the refresh token to local storage after removing any existing refresh token.
   * @param {string} token - The refresh token to be saved.
   */
  public saveRefreshToken(token: string): void {
    localStorage.removeItem(LocalSotarge.REFRESH_TOKEN_KEY);
    localStorage.setItem(LocalSotarge.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Retrieves the refresh token from local storage.
   * @returns {string | null} - The refresh token if it exists, otherwise null.
   */
  public getRefreshToken(): string | null {
    return localStorage.getItem(LocalSotarge.REFRESH_TOKEN_KEY);
  }

  /**
   * Saves the first-time token to local storage after removing any existing first-time token.
   * @param {string} token - The first-time token to be saved.
   */
  public saveFirstTimeToken(token: string): void {
    localStorage.removeItem(LocalSotarge.FIRST_TIME_TOKEN_KEY);
    localStorage.setItem(LocalSotarge.FIRST_TIME_TOKEN_KEY, token);
  }

  /**
   * Retrieves the first-time token from local storage.
   * @returns {string | null} - The first-time token if it exists, otherwise null.
   */
  public getFirstTimeToken(): string | null {
    return localStorage.getItem(LocalSotarge.FIRST_TIME_TOKEN_KEY);
  }

  /**
   * Saves the forget token to local storage after removing any existing forget token.
   * @param {string} token - The forget token to be saved.
   */
  public saveForgetToken(token: string): void {
    localStorage.removeItem(LocalSotarge.FORGET_TOKEN_KEY);
    localStorage.setItem(LocalSotarge.FORGET_TOKEN_KEY, token);
  }

  /**
   * Retrieves the forget token from local storage.
   * @returns {string | null} - The forget token if it exists, otherwise null.
   */
  public getForgetToken(): string | null {
    return localStorage.getItem(LocalSotarge.FORGET_TOKEN_KEY);
  }

  /**
   * Saves a user object to local storage in JSON format after removing any existing user data.
   * @param {JSON} user - The user data to be saved.
   */
  public saveUser(user: any): void {
    localStorage.removeItem(LocalSotarge.USER_KEY);
    localStorage.setItem(LocalSotarge.USER_KEY, JSON.stringify(user));
  }

  /**
   * Retrieves the user data from local storage, parsed as a JSON object.
   * @returns {any | null} - The user data if it exists, otherwise null.
   */
  public getUser() {
    const user = localStorage.getItem(LocalSotarge.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
