package fer.portane.service.impl;

import fer.portane.model.UserToken;
import fer.portane.repository.UserTokenRepository;
import fer.portane.service.UserTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTokenServiceImpl implements UserTokenService {
    @Autowired
    private UserTokenRepository userTokenRepository;

    @Override
    public UserToken save(UserToken userToken) {
        return userTokenRepository.save(userToken);
    }

    @Override
    public void deleteAllFromUser(Long userId) {
        userTokenRepository.deleteAllByUserId(userId);
    }
}
