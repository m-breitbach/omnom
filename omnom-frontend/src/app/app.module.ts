import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {APP_BASE_HREF} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngredientsTableComponent } from './ingredients-table/ingredients-table.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://omnom-auth:8180',
        realm: 'omnom',
        clientId: 'omnom-frontend',
      },
      initOptions: {
        onLoad: 'login-required',
      },
      bearerExcludedUrls: ['/assets']
    });
}

@NgModule({
  declarations: [
    AppComponent,
    IngredientsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    MatInputModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/omnom'},
    {provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
