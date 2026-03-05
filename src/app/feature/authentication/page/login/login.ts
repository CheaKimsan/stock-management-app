import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { APP } from '../../../../../env/app.config';
import { MappingService } from '../../../../shared/service/mapping.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit,OnDestroy {
  readonly hide = signal<boolean>(true);
  readonly errorMessage = signal<string>('');
  readonly currentTime = signal<string>('');
  readonly currentDate = signal<string>('');
  readonly currentYear = computed(() => new Date().getFullYear());

  drone = APP;
  clockInterval: any;


  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);

  constructor() {
    effect(() => {
      console.log('Login model changed:', this.loginModel());
    });
  }

  // Optional: toggle password visibility
  hidePassword = signal(true);
  passwordInputType() {
    return this.hidePassword() ? 'password' : 'text';
  }
  visibilityIcon() {
    return this.hidePassword() ? 'visibility_off' : 'visibility';
  }
  toggleHide() {
    this.hidePassword.update(h => !h);
  }

  // Optional: simulate login
  loading = signal(false);
  onSignIn() {
    this.loading.set(true);
    console.log('Form submitted:', this.loginModel());
    setTimeout(() => this.loading.set(false), 1500);
  }

   ngOnInit(): void {
    this.onUpdateClock();
    this.clockInterval = setInterval(() => this.onUpdateClock(), 1000);
  }

  onUpdateClock(): void {
    this.currentTime.set(MappingService.currentTime());
    this.currentDate.set(MappingService.currentDate());
  }


  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }
}