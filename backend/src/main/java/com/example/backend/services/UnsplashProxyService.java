package com.example.backend.services;

import com.jayway.jsonpath.JsonPath;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;

@Service
public class UnsplashProxyService {

    @Value("${authkeys.unsplash}")
    private String unsplashAuthKey;

    public List<URL> searchPhotos(String query) {
        String jsonResponse = RestClient.create()
            .get()
            .uri("https://api.unsplash.com/search/photos?&query={query}", query)
            .header("Authorization", "Client-ID " + unsplashAuthKey)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .body(String.class);

        List<String> imageUrls = JsonPath
            .parse(jsonResponse)
            .read("$.results[*].urls.raw");

        return imageUrls.stream().map((imageUrl) -> {
            try {
                return new URI(imageUrl).toURL();
            } catch (MalformedURLException | URISyntaxException e) {
                throw new RuntimeException(e);
            }
        }).toList();
    }
}
