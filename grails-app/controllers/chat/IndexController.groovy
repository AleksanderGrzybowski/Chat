package chat

import grails.plugin.springsecurity.annotation.Secured

/**
 * I tried a lot to make a simple redirect from '/' to '/index.html' in UrlMappings,
 * but to no avail. This is a workaround.
 */
@Secured('isAnonymous()')
class IndexController {
    def redirectToIndexHtml() {
        redirect url: '/index.html'
    }
}
