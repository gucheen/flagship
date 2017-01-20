import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apps = [
    {
      name: 'front',
      description: 'front_end',
    },
    {
      name: 'back',
      description: 'backend',
    },
  ];
}
