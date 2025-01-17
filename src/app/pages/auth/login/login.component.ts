import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthService = inject(AuthService);

  formGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {}

  protected onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const authDestroyRef = this.authService
      .loginUser(this.formGroup.value)
      .subscribe((response) => {
        // if (response.data.accessToken) {
        this.handleReturnUrl();
        return;
        // }
      });
  }

  /**
   * Redirects the user to the URL specified in the returnUrl query parameter, or to the root if not specified.
   */
  handleReturnUrl() {
    console.log('7amada');

    // const redirectToSpecPath =
    //   this.activeRoute.snapshot.queryParams['returnUrl'];
    this.router.navigate(['']);
  }
}
