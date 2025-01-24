package fer.portane.mapper;

import fer.portane.dto.TokenDto;
import fer.portane.model.UserToken;

public class UserTokenTokenDtoMapper {
    public static TokenDto toTokenDto(UserToken userToken) {
        return new TokenDto(userToken.getAccessToken(), userToken.getRefreshToken());
    }
}
