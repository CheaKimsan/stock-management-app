import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-core-button',
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './core-button.html',
  styleUrl: './core-button.scss',
})
export class CoreButton {
  @Input({ required: true }) btnTitle!: string;
  @Input() disabled: boolean = false;
  @Input() process: boolean = false;
  @Input() isSubmitType: boolean = false;
  @Input() otherClass: string = '';
  @Output() onBtnClick = new EventEmitter();

  onClick() {
    this.onBtnClick.emit();
  }
}