package fer.portane.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    @Value("${weather.api-key}")
    private String apiKey;

    @GetMapping("/api-key")
    public String getWeather() {
        return apiKey;
    }
}
