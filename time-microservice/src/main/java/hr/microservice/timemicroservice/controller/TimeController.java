package hr.microservice.timemicroservice.controller;

import hr.microservice.timemicroservice.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;

@RestController
@RequestMapping("/time")
public class TimeController {

    @Autowired
    TimeService timeService;

    @GetMapping
    public LocalTime getTime()
    {
        return timeService.getTime();
    }

}
