import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.html',
  styleUrl: './toggle-button.scss',
})
export class ToggleButton {
  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  label = input<string>('');

  toggle() {
    if (!this.disabled()) {
      this.checked.set(!this.checked());
    }
  }
}
