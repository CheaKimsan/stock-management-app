import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculator } from './core/services/calculator.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('stock-management-app');
    constructor(private calculator: Calculator) {}

    ngOnInit() {
    console.log(this.calculator.add(5, 3));       // 8
    console.log(this.calculator.subtract(10, 4)); // 6
  }

}
