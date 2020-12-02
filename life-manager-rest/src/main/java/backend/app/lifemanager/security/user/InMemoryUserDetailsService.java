package backend.app.lifemanager.security.user;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InMemoryUserDetailsService implements UserDetailsService {

    static List<User> inMemoryUserList = new ArrayList<>();

    Long nextId = 1L;

    static {
        inMemoryUserList.add(new User(1L, "in28minutes",
                "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
    }

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> findFirst = inMemoryUserList.stream()
                .filter(user -> user.getUsername().equals(username)).findFirst();

        if (findFirst.isEmpty()) {
            throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
        }

        return findFirst.get();
    }

    private boolean isUsernameTaken(String username) {
        return inMemoryUserList.stream().filter(user -> user.getUsername().equals(username)).count() > 0;
    }

    public Optional<User> createNewUser(UserDto userDto) {
        Optional<User> createdUser = Optional.empty();
        if (!isUsernameTaken(userDto.getUsername())) {
            nextId = nextId++;
            User newUserDetails = new User(nextId, userDto.getUsername(), userDto.getPassword(), "ROLE_USER_1");
            inMemoryUserList.add(newUserDetails);
            createdUser = Optional.of(newUserDetails);
        }
        return createdUser;
    }
}


