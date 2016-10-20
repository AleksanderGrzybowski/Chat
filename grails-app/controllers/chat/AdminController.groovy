package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import org.grails.plugins.console.ConsoleService
import org.grails.plugins.console.Evaluation

@Secured('ROLE_ADMIN')
class AdminController {

    ConsoleService consoleService

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
