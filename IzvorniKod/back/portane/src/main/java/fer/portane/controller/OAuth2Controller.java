package fer.portane.controller;

import fer.portane.service.OAuth2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/oauth2")
public class OAuth2Controller {
    @Autowired
    private OAuth2Service oAuth2Service;

    @GetMapping("/users/google")
    public RedirectView googleUserLogin() {
        return new RedirectView(oAuth2Service.getOauthGoogleUserLoginUrl());
    }

    @GetMapping("/users/facebook")
    public RedirectView facebookUserLogin() {
        return new RedirectView(oAuth2Service.getOauthFacebookUserLoginUrl());
    }

    /*@GetMapping("/users/github")
    public RedirectView githubUserLogin() {
        return new RedirectView(oAuth2Service.getOauthGithubUserLoginUrl());
    }*/


    @GetMapping("/sellers/google")
    public RedirectView googleSellerLogin() {
        return new RedirectView(oAuth2Service.getOauthGoogleSellerLoginUrl());
    }

    @GetMapping("/sellers/facebook")
    public RedirectView facebookSellerLogin() {
        return new RedirectView(oAuth2Service.getOauthFacebookSellerLoginUrl());
    }

    /*@GetMapping("/sellers/github")
    public RedirectView githubSellerLogin() {
        return new RedirectView(oAuth2Service.getOauthGithubSellerLoginUrl());
    }*/
}
