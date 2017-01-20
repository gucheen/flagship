import { Component, OnInit } from '@angular/core';

declare var window: {
  process: any;
}

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit {
  title: string;

  constructor() { }

  ngOnInit() {
    this.title = window.process.versions.electron;
  }

}
