package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured('ROLE_ADMIN')
class ErrorController  {
    def index() {
        response.status = 500
        Exception exception = request.exception.cause.target
        render([message: exception.message, 'class': exception.class] as JSON)
    }
}
