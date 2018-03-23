import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <app-header></app-header>
    </header>

    <main>
      <app-main></app-main>
    </main>

    <footer>
      <app-footer></app-footer>
    </footer>
  `
})
export class AppComponent {
  title = 'Lombardus Ludens';
}
