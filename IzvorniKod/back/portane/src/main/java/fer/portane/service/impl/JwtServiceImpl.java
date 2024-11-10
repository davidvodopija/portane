package fer.portane.service.impl;

import fer.portane.auth.Jwt;
import fer.portane.auth.JwtTokenType;
import fer.portane.dto.TokenDto;
import fer.portane.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtServiceImpl implements JwtService {
    @Autowired
    private Jwt jwt;

    @Value("${jwt.access-token.expiration}")
    private long ACCESS_TOKEN_EXPIRATION;

    @Value("${jwt.refresh-token.expiration}")
    private long REFRESH_TOKEN_EXPIRATION;

    @Override
    public TokenDto generateTokens(String email) {
        return new TokenDto(
                jwt.generateToken(email, ACCESS_TOKEN_EXPIRATION, JwtTokenType.ACCESS_TOKEN), // access token, valid for 1 day
                jwt.generateToken(email, REFRESH_TOKEN_EXPIRATION, JwtTokenType.REFRESH_TOKEN) // refresh token, valid for 7 days
        );
    }
}
