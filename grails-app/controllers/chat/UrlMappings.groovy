package chat

class UrlMappings {

    static mappings = {
        "/api/auth"(controller: 'test', action: 'auth')
        
        "/guest/public"(controller: 'test', action: 'guest')

        "/api/admin/evaluate"(controller: 'admin', action: 'evaluate', method: 'post')
        
        "/"(redirect: "/index.html")
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
