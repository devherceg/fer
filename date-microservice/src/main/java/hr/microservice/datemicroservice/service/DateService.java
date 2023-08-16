package hr.microservice.datemicroservice.service;

import hr.microservice.datemicroservice.client.TimeFeignClient;
import hr.microservice.datemicroservice.model.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DateService {

    @Autowired
    TimeFeignClient timeFeignClient;


    public DateTime getDateTime() {
        DateTime dateTime = new DateTime();
        dateTime.setTime(timeFeignClient.getTime());
        dateTime.setDate(LocalDate.now());
        return dateTime;
    }

}
