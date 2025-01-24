package fer.portane.service;

import fer.portane.form.SellerForm;
import fer.portane.form.UserForm;

public interface OAuth2Service {
    String getOauthAccessTokenGoogle(String code, String model);

    String getOauthAccessTokenFacebook(String code, String model);

    String getOauthAccessTokenGithub(String code, String model);

    UserForm getUserFormGoogle(String accessToken);

    UserForm getUserFormFacebook(String accessToken);

    UserForm getUserFormGithub(String accessToken);

    SellerForm getSellerFormGoogle(String accessToken);

    SellerForm getSellerFormFacebook(String accessToken);

    SellerForm getSellerFormGithub(String accessToken);

    String getOauthGoogleUserLoginUrl();

    String getOauthFacebookUserLoginUrl();

    String getOauthGithubUserLoginUrl();

    String getOauthGoogleSellerLoginUrl();

    String getOauthFacebookSellerLoginUrl();

    String getOauthGithubSellerLoginUrl();
}
