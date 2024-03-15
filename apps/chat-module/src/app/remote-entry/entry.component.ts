import { Component } from '@angular/core';

@Component({
  selector: 'chatwidget-root',
  template: '<router-outlet></router-outlet>',
})
export class EntryComponent {
  title = 'chatwidget';
}
