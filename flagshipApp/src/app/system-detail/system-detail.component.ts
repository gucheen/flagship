import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../database.service';
import { System } from '../system';

@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  styleUrls: ['./system-detail.component.css']
})
export class SystemDetailComponent implements OnInit {
  system: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.database.getSystem(params['id']))
      .subscribe((system: System) => this.system = system);
  }

}
