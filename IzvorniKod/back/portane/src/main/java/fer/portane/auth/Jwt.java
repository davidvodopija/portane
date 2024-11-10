package fer.portane.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class Jwt {
    @Value("${jwt.signing-key}")
    private String SIGNING_KEY;

    private final String REFRESH_TOKENS_PATH = "/api/auth/refresh-tokens";

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SIGNING_KEY));
    }

    public String generateToken(String email, Long expiration, JwtTokenType tokenType) {
        Map<String, JwtTokenType> claims = new HashMap<>();
        claims.put("type", tokenType);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public <T> T getClaim(String token, Function<Claims, T> function) {
        Claims claims = getClaims(token);
        return function.apply(claims);
    }

    public boolean isValid(String token, String path) {
        final Date expiration = getClaim(token, Claims::getExpiration);
        final String tokenType = getClaim(token, t -> (String) t.get("type"));

        if (tokenType.equals("ACCESS_TOKEN") && path.equals(REFRESH_TOKENS_PATH))
            return false;
        else if (tokenType.equals("REFRESH_TOKEN") && !path.equals(REFRESH_TOKENS_PATH))
            return false;

        return expiration.after(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getEmail(String token) {
        return getClaim(token, Claims::getSubject);
    }
}
