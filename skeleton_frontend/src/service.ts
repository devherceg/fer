import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Datetime} from "./app/model/datetime";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {


  constructor(private http: HttpClient) {
  }

  getTicketOptions() {
    return this.http.get<Datetime>("localhost:8760/date-microservice/date");
  }

}
