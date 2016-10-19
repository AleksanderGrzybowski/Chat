package chat

import grails.converters.JSON

class NumberDto {
    Integer number
}

class TestController {
    
    def square(NumberDto dto) {
        render([provided: dto.number, squared: dto.number**2] as JSON)
    }
}
