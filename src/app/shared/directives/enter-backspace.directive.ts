import { Directive, ElementRef, output } from '@angular/core';

@Directive({
  selector: '[appHandleEnterAndBackspace]',
  host: {
    '(keydown)': 'onKeyDown($event)',
  }
})
export class HandleEnterAndBackspaceDirective {

  readonly enterPressed = output<void>();
  readonly backspaceAtStart = output<void>();

  constructor(private el: ElementRef) { }

  onKeyDown(event: KeyboardEvent) {
    const inputValue = this.el.nativeElement.value;
    if (event.key === 'Enter') {
      this.enterPressed.emit();
      event.preventDefault();
    } else if (event.key === 'Backspace' && inputValue === '') {
      this.backspaceAtStart.emit();
      event.preventDefault();
    }
  }

}