import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { APP } from '../../../../../env/app.config';
import { MappingService } from '../../../../shared/services/mapping.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../../share.module';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatProgressSpinnerModule,
    SharedModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit, OnDestroy {

  form: FormGroup;

  readonly loading = signal(false);
  readonly hide = signal(true);
  readonly errorMessage = signal('');
  readonly currentTime = signal('');
  readonly currentDate = signal('');

  readonly passwordInputType = computed(() => this.hide() ? 'password' : 'text');
  readonly visibilityIcon = computed(() => this.hide() ? 'visibility_off' : 'visibility');
  readonly currentYear = computed(() => new Date().getFullYear());

  drone = APP;
  clockInterval: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {

    this.form = this.fb.group({
      shortId: [null, Validators.required],
      password: [null, Validators.required]
    });

    effect(() => {
      console.log('Form value:', this.form.value);
    });
  }

  toggleHide(): void {
    this.hide.update(v => !v);
  }

  onSignIn() {
    if (this.form.invalid) {
      this.snackBar.open('Please fill all fields', 'Close', { duration: 2000 });
      return;
    }

    this.loading.set(true);

    console.log('Form submitted:', this.form.value);

    setTimeout(() => {
      this.loading.set(false);
    }, 1500);
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