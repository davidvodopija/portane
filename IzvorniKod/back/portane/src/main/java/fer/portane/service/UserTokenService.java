package fer.portane.service;

import fer.portane.model.UserToken;

public interface UserTokenService {
    UserToken save(UserToken userToken);
    void deleteAllFromUser(Long userId);
}
