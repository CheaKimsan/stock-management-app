import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {

  @Input() type: string | unknown;

}
