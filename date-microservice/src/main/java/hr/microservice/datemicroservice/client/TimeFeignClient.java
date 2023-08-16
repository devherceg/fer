package hr.microservice.datemicroservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalTime;

@FeignClient("time-microservice")
public interface TimeFeignClient {

    @GetMapping("/time")
    LocalTime getTime();
}
