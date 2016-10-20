package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import org.grails.plugins.console.ConsoleService
import org.grails.plugins.console.Evaluation

class AdminController {

    ConsoleService consoleService

    // TODO: implement admin user
    @Secured('ROLE_CHAT_USER')
    def evaluate(String code) {
        Evaluation eval = consoleService.eval(code, true, request)

        Map result
        if (eval.exception) {
            result = [
                    exception: eval.exception.class,
                    message  : eval.exception.message
            ]
        } else {
            result = [
                    result: eval.result,
                    output: eval.output,
            ]
        }
        render(result as JSON)
    }
}
