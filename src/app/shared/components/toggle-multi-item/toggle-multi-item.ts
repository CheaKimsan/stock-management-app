import { Component, input, model } from '@angular/core';

export interface ToggleItem<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-toggle-multi-item',
  templateUrl: './toggle-multi-item.html',
  styleUrl: './toggle-multi-item.scss',
})
export class ToggleMultiItem<T = string> {
  items = input<ToggleItem<T>[]>([]);
  selected = model<T | null>(null);
  disabled = input<boolean>(false);

  select(value: T) {
    if (!this.disabled()) {
      this.selected.set(value);
    }
  }

  isSelected(value: T): boolean {
    return this.selected() === value;
  }
}
