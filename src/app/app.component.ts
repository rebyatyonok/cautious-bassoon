import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  routes = [
    {
      link: '/users',
      label: 'Users'
    },
    {
      link: '/learning-plans',
      label: 'Learning plans'
    },
  ]
}
