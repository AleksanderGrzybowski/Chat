import chat.Channel
import chat.Role
import chat.User
import chat.UserRole
import grails.util.Environment
import groovy.util.logging.Log
import org.apache.commons.lang3.RandomStringUtils

@Log
class BootStrap {

    def init = { servletContext ->
        sampleChannels()

        Role chatUserRole = chatUserRole()

        botUser(chatUserRole)

        if (Environment.developmentMode) {
            sampleUsers(chatUserRole)
        }
    }

    static final String DEFAULT_AVATAR_COLOR = "#abcdef"

    static Role chatUserRole() {
        new Role(authority: 'ROLE_CHAT_USER').save(flush: true)
    }

    static void sampleUsers(Role chatUserRole) {
        ['bob', 'alice', 'tom'].each {
            User user = new User(username: it, password: it, avatarColor: DEFAULT_AVATAR_COLOR).save(flush: true)
            new UserRole(user: user, role: chatUserRole).save(flush: true)
        }
    }

    static void botUser(chatUserRole) {
        String botUsername = System.getenv('BOT_USERNAME')
        String botPassword = System.getenv('BOT_PASSWORD')

        if (botUsername == null || botUsername.empty) {
            botUsername = RandomStringUtils.randomAlphabetic(6)
            botPassword = RandomStringUtils.randomAlphabetic(6)
            log.info("No bot user/pass provided, using those: $botUsername $botPassword")
        } else {
            log.info('Bot user/pass provided, using those')
        }

        User user = new User(
                username: botUsername,
                password: botPassword,
                avatarColor: DEFAULT_AVATAR_COLOR
        ).save(flush: true)
        new UserRole(user: user, role: chatUserRole).save(flush: true)
    }

    static void sampleChannels() {
        ['general', 'random'].each { new Channel(name: it).save(flush: true) }
    }
}
