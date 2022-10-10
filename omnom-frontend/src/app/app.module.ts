import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {APP_BASE_HREF} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/omnom'}],
  bootstrap: [AppComponent]
})
export class AppModule {}
