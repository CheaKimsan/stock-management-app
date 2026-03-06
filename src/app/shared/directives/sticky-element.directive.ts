import { Directive, ElementRef, output, afterNextRender } from '@angular/core';

@Directive({
  selector: '[stickyElement]',
  host: {
    '(window:scroll)': 'updateStickyStatus()',
    '(window:resize)': 'updateStickyStatus()',
  }
})
export class StickyElementDirective {

  private sticky = false;
  private elementPosition = 0;

  readonly stickyChanged = output<boolean>();

  constructor(private el: ElementRef) {
    afterNextRender(() => {
      this.elementPosition = this.el.nativeElement?.offsetTop;
    });
  }

  updateStickyStatus() {
    const isSticky = window.scrollY >= this.elementPosition;
    if (this.sticky !== isSticky) {
      this.sticky = isSticky;
      this.stickyChanged.emit(this.sticky);
    }
  }

}