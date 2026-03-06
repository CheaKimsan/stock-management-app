import { Component, input, OnInit, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-page-not-found',
  imports: [LottieComponent],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
})
export class PageNotFound implements OnInit, OnDestroy {

  readonly title = input<string>();
  readonly subTitle = input<string>();
  readonly bigTitle = input<boolean>(false);

  countdown = signal(5);

  readonly options: AnimationOptions = {
    path: 'assets/images/404error.json',
  };

  private timerInterval?: ReturnType<typeof setInterval>;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.countdown.update(v => v - 1);
      if (this.countdown() <= 0) {
        clearInterval(this.timerInterval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}