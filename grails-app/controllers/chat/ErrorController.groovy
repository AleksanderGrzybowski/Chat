package chat

import grails.converters.JSON

class ErrorController  {
    def index() {
        response.status = 500
        Exception exception = request.exception.cause.target
        render([message: exception.message, 'class': exception.class] as JSON)
    }
}
