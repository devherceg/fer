import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {KeycloakAngularModule, KeycloakEventType, KeycloakService} from "keycloak-angular";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ExtendedModule, FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {AppAuthGuard} from "./core/guard/app-auth-guard";
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { ButtonCallComponent } from './button-call/button-call.component';
import { HttpClientModule } from '@angular/common/http';

export function initializeKeycloak(keycloak: KeycloakService) {

  return () => keycloak.init({
    config: {
      url: 'http://host.docker.internal:8080',
      realm: 'microservices',
      clientId: 'gateway-client',
/*      url: 'https://keycloak.rao.hr',
      realm: 'DuPass',
      clientId: 'gateway-client',*/
    },
    initOptions: {
      checkLoginIframe: false,
      onLoad: 'check-sso',
    },
    loadUserProfileAtStartUp: true

  }).then(auth => {
    if (!auth) {
      console.log("NOT Authenticated");
      localStorage.removeItem("token")
      localStorage.removeItem("refresh-token")

    } else {
      console.log("Authenticated");
      localStorage.setItem("token", <string>keycloak.getKeycloakInstance().token);
      localStorage.setItem("refresh-token", <string>keycloak.getKeycloakInstance().refreshToken);
    }

    console.log('keyCloak: ', keycloak.getKeycloakInstance())

    keycloak.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnTokenExpired) {
          setTimeout(() => {
            keycloak.updateToken(60).then((refreshed) => {
              if (refreshed) {
                console.debug('Token refreshed' + refreshed);
              } else {
                console.debug('Token NOT refreshed' + refreshed);
              }
            }).catch(() => {
              console.error('Failed to refresh token');
            });
          }, 40000)
        }
      }
    });

  }).catch(err => {
    console.error(err)
    location.reload()
  });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    ButtonCallComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FlexModule,
    MatButtonModule,
    ExtendedModule,
    FlexLayoutModule,
    MatMenuModule,
    KeycloakAngularModule,
  ],

  providers: [{
    provide: AppAuthGuard
  },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
