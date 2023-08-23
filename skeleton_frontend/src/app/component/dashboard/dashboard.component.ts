import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName?: string
  token?: string

  constructor(private keycloackService: KeycloakService) {
  }

  ngOnInit(): void {
    this.userName = this.keycloackService.getUsername()
     this.keycloackService.getToken().then(token => {
       this.token = token
    })
  }


}
