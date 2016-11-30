package chat

class UrlMappings {

    static mappings = {
        "/api/guest/register"(controller: 'user', action: 'register')
        
        "/api/user/chatUsers"(controller: 'user', action: 'listChatUsers')
        
        "/api/channel/list"(controller: 'channel', action: 'list')
        "/api/channel/create"(controller: 'channel', action: 'create')

        "/api/message/listAll"(controller: 'message', action: 'listAll')
        "/api/message/create"(controller: 'message', action: 'create')

        "/"(controller: 'index', action: 'redirectToIndexHtml')
        "500"(controller: 'error')
        "404"(view: '/notFound')
    }
}
