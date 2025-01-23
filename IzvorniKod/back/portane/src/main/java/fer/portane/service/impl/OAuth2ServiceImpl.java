package fer.portane.service.impl;

import com.nimbusds.jose.shaded.gson.Gson;
import com.nimbusds.jose.shaded.gson.JsonObject;
import fer.portane.form.SellerForm;
import fer.portane.form.UserForm;
import fer.portane.service.OAuth2Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Component
public class OAuth2ServiceImpl implements OAuth2Service {
    @Value("${google.client_id}")
    private String googleClientId;

    @Value("${google.client_secret}")
    private String googleClientSecret;

    @Value("${facebook.client_id}")
    private String facebookClientId;

    @Value("${facebook.client_secret}")
    private String facebookClientSecret;

    @Value("${github.client_id}")
    private String githubClientId;

    @Value("${github.client_secret}")
    private String githubClientSecret;

    @Value("${base.url}")
    private String baseUrl;

    @Override
    public String getOauthAccessTokenGoogle(String code, String model) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("redirect_uri", "http://localhost:8080/api/" + model + "/oauth2/google");
        params.add("client_id", googleClientId);
        params.add("client_secret", googleClientSecret);
        params.add("scope", "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile");
        params.add("scope", "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email");
        params.add("scope", "openid");
        params.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, httpHeaders);

        String url = "https://oauth2.googleapis.com/token";
        String response = restTemplate.postForObject(url, requestEntity, String.class);
        JsonObject jsonObject = new Gson().fromJson(response, JsonObject.class);

        return jsonObject.get("access_token").toString().replace("\"", "");
    }

    @Override
    public String getOauthAccessTokenFacebook(String code, String model) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("redirect_uri", "http://localhost:8080/api/" + model + "/oauth2/facebook");
        params.add("client_id", facebookClientId);
        params.add("client_secret", facebookClientSecret);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, httpHeaders);

        String url = "https://graph.facebook.com/v11.0/oauth/access_token";
        String response = restTemplate.postForObject(url, requestEntity, String.class);
        JsonObject jsonObject = new Gson().fromJson(response, JsonObject.class);

        return jsonObject.get("access_token").toString().replace("\"", "");
    }

    @Override
    public String getOauthAccessTokenGithub(String code, String model) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("redirect_uri", "http://localhost:8080/api/" + model + "/oauth2/github");
        params.add("client_id", githubClientId);
        params.add("client_secret", githubClientSecret);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, httpHeaders);

        String url = "https://github.com/login/oauth/access_token";
        String response = restTemplate.postForObject(url, requestEntity, String.class);

        String[] responseArray = response.split("&");
        return responseArray[0].split("=")[1];
    }

    public UserForm getUserFormGoogle(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(accessToken);

        HttpEntity<String> requestEntity = new HttpEntity<>(httpHeaders);

        String url = "https://www.googleapis.com/oauth2/v2/userinfo";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        JsonObject jsonObject = new Gson().fromJson(response.getBody(), JsonObject.class);

        return UserForm.builder()
                .email(jsonObject.get("email").toString().replace("\"", ""))
                .password(UUID.randomUUID().toString())
                .firstname(jsonObject.get("given_name").toString().replace("\"", ""))
                .lastname(jsonObject.get("family_name").toString().replace("\"", ""))
                .build();
    }

    @Override
    public UserForm getUserFormFacebook(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();

        HttpEntity<String> requestEntity = new HttpEntity<>(httpHeaders);

        String url = "https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=" + accessToken;
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        JsonObject jsonObject = new Gson().fromJson(response.getBody(), JsonObject.class);

        return UserForm.builder()
                .email(jsonObject.get("email").toString().replace("\"", ""))
                .password(UUID.randomUUID().toString())
                .firstname(jsonObject.get("first_name").toString().replace("\"", ""))
                .lastname(jsonObject.get("last_name").toString().replace("\"", ""))
                .build();
    }

    @Override
    public String getOauthGoogleUserLoginUrl() {
        return "https://accounts.google.com/o/oauth2/v2/auth?" +
                "redirect_uri=" + baseUrl + "/api/users/oauth2/google" +
                "&response_type=code" +
                "&client_id=" + googleClientId +
                "&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email" +
                "+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile" +
                "+openid&access_type=offline";
    }

    @Override
    public String getOauthFacebookUserLoginUrl() {
        return "https://www.facebook.com/v11.0/dialog/oauth?" +
                "client_id=" + facebookClientId +
                "&redirect_uri=" + baseUrl + "/api/users/oauth2/facebook" +
                "&scope=email,public_profile" +
                "&response_type=code";
    }

    @Override
    public String getOauthGithubUserLoginUrl() {
        return "https://github.com/login/oauth/authorize?" +
                "client_id=" + githubClientId +
                "&redirect_uri=" + baseUrl + "/api/users/oauth2/github" +
                "&scope=user:email";
    }

    @Override
    public String getOauthGoogleSellerLoginUrl() {
        return "https://accounts.google.com/o/oauth2/v2/auth?" +
                "redirect_uri=" + baseUrl + "/api/sellers/oauth2/google" +
                "&response_type=code" +
                "&client_id=" + googleClientId +
                "&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email" +
                "+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile" +
                "+openid&access_type=offline";
    }

    @Override
    public String getOauthFacebookSellerLoginUrl() {
        return "https://www.facebook.com/v11.0/dialog/oauth?" +
                "client_id=" + facebookClientId +
                "&redirect_uri=" + baseUrl + "/api/sellers/oauth2/facebook" +
                "&scope=email,public_profile" +
                "&response_type=code";
    }

    @Override
    public String getOauthGithubSellerLoginUrl() {
        return "https://github.com/login/oauth/authorize?" +
                "client_id=" + githubClientId +
                "&redirect_uri=" + baseUrl + "/api/sellers/oauth2/github" +
                "&scope=user:email";
    }

    @Override
    public UserForm getUserFormGithub(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(accessToken);

        HttpEntity<String> requestEntity = new HttpEntity<>(httpHeaders);

        String url = "https://api.github.com/user";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        JsonObject jsonObject = new Gson().fromJson(response.getBody(), JsonObject.class);

        return UserForm.builder()
                .email(jsonObject.get("email").toString().replace("\"", ""))
                .password(UUID.randomUUID().toString())
                .firstname(jsonObject.get("name").toString().replace("\"", ""))
                .lastname("")
                .build();
    }

    @Override
    public SellerForm getSellerFormGoogle(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(accessToken);

        HttpEntity<String> requestEntity = new HttpEntity<>(httpHeaders);

        String url = "https://www.googleapis.com/oauth2/v2/userinfo";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        JsonObject jsonObject = new Gson().fromJson(response.getBody(), JsonObject.class);

        return SellerForm.builder()
                .name(jsonObject.get("name").toString().replace("\"", ""))
                .email(jsonObject.get("email").toString().replace("\"", ""))
                .password(UUID.randomUUID().toString())
                .logo(jsonObject.get("picture").toString().replace("\"", ""))
                .build();
    }

    @Override
    public SellerForm getSellerFormFacebook(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();

        HttpEntity<String> requestEntity = new HttpEntity<>(httpHeaders);

        String url = "https://graph.facebook.com/me?fields=id,name,email,picture&access_token=" + accessToken;
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        JsonObject jsonObject = new Gson().fromJson(response.getBody(), JsonObject.class);

        return SellerForm.builder()
                .name(jsonObject.get("name").toString().replace("\"", ""))
                .email(jsonObject.get("email").toString().replace("\"", ""))
                .password(UUID.randomUUID().toString())
                .logo(jsonObject.get("picture").getAsJsonObject().get("data").getAsJsonObject().get("url").toString().replace("\"", ""))
                .build();
    }

    @Override
    public SellerForm getSellerFormGithub(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(accessToken);

        HttpEntity<String> requestEntity = new HttpEntity<>(httpHeaders);

        String url = "https://api.github.com/user";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        JsonObject jsonObject = new Gson().fromJson(response.getBody(), JsonObject.class);

        return SellerForm.builder()
                .name(jsonObject.get("login").toString().replace("\"", ""))
                .email(jsonObject.get("email").toString().replace("\"", ""))
                .password(UUID.randomUUID().toString())
                .logo(jsonObject.get("avatar_url").toString().replace("\"", ""))
                .build();
    }


}
