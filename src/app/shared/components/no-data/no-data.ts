import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.html',
  styleUrls: ['./no-data.scss'],
  imports: [CommonModule, LottieComponent], 
})
export class NoData {
  readonly title = input<string | unknown>();
  readonly subtitle = input<string | unknown>();
  readonly bigTitle = input<boolean>(false);

  options: AnimationOptions = {
    path: 'assets/images/no_result_found.json',
  };
}