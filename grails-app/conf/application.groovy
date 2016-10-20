// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'chat.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'chat.UserRole'
grails.plugin.springsecurity.authority.className = 'chat.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
        [pattern: '/', access: ['permitAll']]
]

grails.plugin.springsecurity.useBasicAuth = true
grails.plugin.springsecurity.basic.realmName = "Chat realm"
grails.plugin.springsecurity.filterChain.chainMap = [
        [pattern: '/api/**', filters: 'JOINED_FILTERS,-exceptionTranslationFilter'],
        [pattern: '/guest/**', filters: 'JOINED_FILTERS,-basicAuthenticationFilter,-basicExceptionTranslationFilter']
]
