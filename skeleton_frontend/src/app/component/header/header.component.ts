import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Skeleton Frontend';
  loginDisplay = false;
  userName?: string;

  constructor(public router: Router,
              private keycloackService: KeycloakService) {
  }

  ngOnInit(): void {
    this.keycloackService.isLoggedIn().then(result => {
      if (result) {
        this.loginDisplay = true;
        this.userName = this.keycloackService.getUsername()
        this.router.navigate(['/dashboard']);
      } else {
        this.loginDisplay = false;
      }
    })
  }

  onLogin() {
    if (!this.loginDisplay) {
      setTimeout(() => {
        this.keycloackService.login()
      }, 400);
    } else {
      this.onLogout();
    }
  }

  onLogout() {
    this.router.navigate(['/']);
    setTimeout(() => {
      this.keycloackService.logout()
    }, 400);
  }

}
