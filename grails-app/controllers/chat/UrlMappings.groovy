package chat

class UrlMappings {

    static mappings = {
        "/api/secret"(controller: 'test', action: 'secret')
        "/guest/public"(controller: 'test', action: 'guest')
        
        "/"(redirect: "/index.html")
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
