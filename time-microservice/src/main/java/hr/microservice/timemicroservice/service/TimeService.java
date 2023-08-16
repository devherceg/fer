package hr.microservice.timemicroservice.service;

import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
public class TimeService {

    public LocalTime getTime()
    {
        return LocalTime.now();
    }
}
