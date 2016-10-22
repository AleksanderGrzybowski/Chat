package chat

class UrlMappings {

    static mappings = {
        "/api/auth"(controller: 'test', action: 'auth')
        "/api/user/chatUsers"(controller: 'test', action: 'listChatUsers')

        "/api/message/listAll"(controller: 'message', action: 'listAll')
        "/api/message/create"(controller: 'message', action: 'create')
       
        "/guest/public"(controller: 'test', action: 'guest')

        "/api/admin/evaluate"(controller: 'admin', action: 'evaluate', method: 'post')
        
        "/"(redirect: "/index.html")
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
