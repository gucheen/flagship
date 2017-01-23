import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { AppDetailComponent } from './app-detail/app-detail.component';

import { DatabaseService } from './database.service';

@NgModule({
  declarations: [
    AppComponent,
    AppDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
  ],
  providers: [
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
