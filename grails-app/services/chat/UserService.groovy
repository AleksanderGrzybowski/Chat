package chat

import org.apache.commons.lang3.RandomStringUtils
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserService {

    def springSecurityService

    User create(RegisterUserDto dto) {
        createAndSaveUser(dto.username, dto.password)
    }

    UserDetails createGuestUser() {
        User guest = createAndSaveUser(
                'guest_' + RandomStringUtils.randomNumeric(5),
                RandomStringUtils.randomAlphanumeric(20)
        )

        createUserDetailsForGuest(guest)
    }
    
    List<User> listChatUsers() {
        return UserRole.findAllByRole(Role.findByAuthority('ROLE_CHAT_USER'))*.user - springSecurityService.currentUser
    }

    private User createAndSaveUser(String username, String password) {
        User created = new User(
                username: username,
                password: password,
                avatarColor: randomColor()
        ).save(failOnError: true)
        new UserRole(user: created, role: Role.findByAuthority('ROLE_CHAT_USER')).save(failOnError: true)

        log.info("Created user ${created.json}")

        created
    }

    private UserDetails createUserDetailsForGuest(guest) {
        new UserDetails() {
            @Override
            Collection<? extends GrantedAuthority> getAuthorities() {
                [
                        new GrantedAuthority() {
                            @Override
                            String getAuthority() {
                                'ROLE_CHAT_USER'
                            }
                        }
                ]
            }

            @Override
            String getPassword() {
                guest.password
            }

            @Override
            String getUsername() {
                guest.username
            }

            @Override
            boolean isAccountNonExpired() {
                false
            }

            @Override
            boolean isAccountNonLocked() {
                false
            }

            @Override
            boolean isCredentialsNonExpired() {
                false
            }

            @Override
            boolean isEnabled() {
                true
            }
        }
    }

    private String randomColor() {
        '#' + (1..3).collect { Integer.toHexString((Math.random() * 255) as int) }.join('')
    }
}