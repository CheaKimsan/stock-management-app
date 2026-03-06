import { Directive, HostListener, inject, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
    selector: '[copyable]',
    standalone: true,
})
export class CopyableDirective {

    @Input() copyable!: string;
    @Input() copyMessage: string = 'Copied to clipboard!';

    private readonly clipboard = inject(Clipboard);
    private readonly snackBar = inject(MatSnackBar);

    @HostListener('click')
    onClick(): void {
        if (this.copyable) {
            this.clipboard.copy(this.copyable);
            this.snackBar.open(this.copyMessage, 'Close', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['cs-snackbar']
            });
        }
    }
}