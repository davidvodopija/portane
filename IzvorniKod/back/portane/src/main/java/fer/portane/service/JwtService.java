package fer.portane.service;

import fer.portane.dto.TokenDto;

public interface JwtService {
    TokenDto generateTokens(String email);
}
