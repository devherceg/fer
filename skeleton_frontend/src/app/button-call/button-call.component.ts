import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-button-call',
  templateUrl: './button-call.component.html',
  styleUrls: ['./button-call.component.css']
})
export class ButtonCallComponent {
  response: string | undefined;

  constructor(private http: HttpClient) {}

  callLocalHost() {
    const url = 'http://localhost:8760/date-microservice/date'; // Change to your desired URL

    this.http.get(url, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.response = data;
        },
        (error) => {
          console.error('Error:', error);
          this.response = 'An error occurred.';
        }
      );
  }
}
