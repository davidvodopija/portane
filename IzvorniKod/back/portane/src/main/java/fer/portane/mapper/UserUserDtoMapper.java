package fer.portane.mapper;

import fer.portane.dto.UserDto;
import fer.portane.model.User;

public class UserUserDtoMapper {
    public static UserDto toUserDto(User user) {
        fer.portane.dto.UserDto userDto = new fer.portane.dto.UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setFirstname(user.getFirstname());
        userDto.setLastname(user.getLastname());
        if (user.getSeller() != null) {
            userDto.setSeller(true);
            userDto.setLogo(user.getSeller().getLogo());
        }
        return userDto;
    }
}
