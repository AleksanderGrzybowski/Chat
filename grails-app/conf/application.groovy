import org.apache.commons.lang3.RandomStringUtils

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'chat.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'chat.UserRole'
grails.plugin.springsecurity.authority.className = 'chat.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
        [pattern: '/', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
        [pattern: '/api/guest/**', filters: 'anonymousAuthenticationFilter,restTokenValidationFilter,restExceptionTranslationFilter,filterInvocationInterceptor'],
        [pattern: '/api/**/**', filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'],
        [pattern: '/**', filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter']
]

grails.plugin.springsecurity.rest.token.storage.jwt.expiration = 3600 // seconds
grails.plugin.springsecurity.rest.token.storage.jwt.secret = RandomStringUtils.randomAlphanumeric(32)
