import { Injectable, signal } from '@angular/core';
import { LocalSotarge } from '../../enums/local-storage-keys';
import { User } from '../../models/user.model';
import { UserRole } from '../../enums/user-roles';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = signal<User>({} as User);
  public readonly userInfo = this.user.asReadonly();

  constructor() {
    const user = localStorage.getItem(LocalSotarge.USER_KEY);
    if (user) {
      this.user.set(JSON.parse(user));
    }
  }

  set currentUser(user: User) {
    this.user.set(user);
    localStorage.setItem(LocalSotarge.USER_KEY, JSON.stringify(user));
  }

  get currentUser(): User | null {
    const currentUser = localStorage.getItem(LocalSotarge.USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  }

  get userRole(): string | null {
    const currentUser = localStorage.getItem(LocalSotarge.USER_KEY);
    return currentUser ? JSON.parse(currentUser)?.role : null;
  }

  /**
   * Checks if the currently logged-in user has the 'EnerjizeAdmin' role.
   *
   * @returns {boolean} `true` if the current user has the 'EnerjizeAdmin' role, `false` otherwise.
   */
  get isEnerjizeAdmin(): boolean {
    const currentUser = localStorage.getItem(LocalSotarge.USER_KEY);
    return currentUser
      ? JSON.parse(currentUser)?.role === UserRole.SUPER_ADMIN
      : false;
  }

  updateUser(userData: User) {
    this.user.set(userData);
    localStorage.setItem(LocalSotarge.USER_KEY, JSON.stringify(userData));
  }

  removeUser(): void {
    localStorage.removeItem(LocalSotarge.USER_KEY);
  }
}
