import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class AppTitleRoute extends TitleStrategy {
    constructor(private readonly title: Title) { super(); }

    override updateTitle(snapshot: RouterStateSnapshot): void {
        const routeTitle = this.buildTitle(snapshot);
        this.title.setTitle(
            routeTitle ? `${routeTitle} – Stock-Management-App` : 'Stock-Management-App'
        );
    }
}