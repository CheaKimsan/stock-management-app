import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Injectable, inject, signal, computed } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Loader } from '../components/loader/loader';
import { PageNotFound } from '../components/page-not-found/page-not-found';
import { AlreadyLogin } from '../components/already-login/already-login';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private readonly overlay = inject(Overlay);
    private readonly _loading = signal<boolean>(false);
    private readonly _processing = signal<boolean>(false);
    private readonly _isPageNotAvailable = signal<boolean>(false);

    readonly loading = computed(() => this._loading());
    readonly processing = computed(() => this._processing());
    readonly isPageNotAvailable = computed(() => this._isPageNotAvailable());
    readonly pageNotAvailable = signal<Portal<any> | null>(null);

    private overlayRef: OverlayRef | null = null;

    private getOverlayRef(): OverlayRef {
        if (!this.overlayRef) {
            this.overlayRef = this.overlay.create({
                positionStrategy: this.overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically(),
                hasBackdrop: true,
            });
        }
        return this.overlayRef;
    }

    setLoading(loading: boolean): void {
        this._loading.set(loading);
    }

    getLoading(): boolean {
        return this._loading();
    }

    setProcessing(processing: boolean): void {
        this._processing.set(processing);
    }

    getProcessing(): boolean {
        return this._processing();
    }

    showLoader(): void {
        const ref = this.getOverlayRef();
        if (!ref.hasAttached()) {
            ref.attach(new ComponentPortal(Loader));
        }
    }

    showAlreadyLogin(): void {
        const ref = this.getOverlayRef();
        if (!ref.hasAttached()) {
            ref.attach(new ComponentPortal(AlreadyLogin));
        }
    }

    hideLoader(): void {
        this.getOverlayRef().detach();
    }

    attachLoader<T>(): (source: Observable<T>) => Observable<T> {
        return (source: Observable<T>) => {
            this.showLoader();
            return source.pipe(
                finalize(() => this.hideLoader())
            );
        };
    }

    trackByIdx(_index: number, item: any): any {
        return item;
    }

    showPageNotAvailable(status: any): void {
        if (!status) {
            this._isPageNotAvailable.set(true);
            this.pageNotAvailable.set(new ComponentPortal(PageNotFound));
        } else {
            this._isPageNotAvailable.set(false);
            this.pageNotAvailable.set(null);
        }
    }
}