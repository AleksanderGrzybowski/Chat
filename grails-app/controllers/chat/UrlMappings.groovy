package chat

class UrlMappings {

    static mappings = {
        "/api/auth"(controller: 'user', action: 'auth')
        "/api/user/chatUsers"(controller: 'user', action: 'listChatUsers')
        "/api/user/register"(controller: 'user', action: 'register')

        "/api/message/listAll"(controller: 'message', action: 'listAll')
        "/api/message/create"(controller: 'message', action: 'create')
       
        "/guest/public"(controller: 'user', action: 'guest')

        "/"(redirect: "/index.html")
        "500"(controller: 'error')
        "404"(view: '/notFound')
    }
}
