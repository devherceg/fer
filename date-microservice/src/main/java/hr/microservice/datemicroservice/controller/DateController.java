package hr.microservice.datemicroservice.controller;

import hr.microservice.datemicroservice.model.DateTime;
import hr.microservice.datemicroservice.service.DateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/date")
public class DateController {

    @Autowired
    DateService dateService;

    @GetMapping
    public DateTime getDateTime(){
        return dateService.getDateTime();
    }

}
