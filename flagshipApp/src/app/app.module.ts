import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from '@angular/router';

import { appRoutes } from './router';

import { DatabaseService } from './database.service';
import { IpcService } from  './ipc.service';

import { AppComponent } from './app.component';
import { SystemListComponent } from './system-list/system-list.component';
import { SystemDetailComponent } from './system-detail/system-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SystemListComponent,
    SystemDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    DatabaseService,
    IpcService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
