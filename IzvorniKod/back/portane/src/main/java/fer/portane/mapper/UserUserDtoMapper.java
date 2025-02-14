package fer.portane.mapper;

import fer.portane.dto.UserDto;
import fer.portane.model.User;

public class UserUserDtoMapper {
    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFirstname(user.getFirstname());
        userDto.setLastname(user.getLastname());
        if (user.getSeller() != null) {
            userDto.setSeller(SellerSellerDtoMapper.toDto(user.getSeller()));
        }
        return userDto;
    }
}
