package chat

class UrlMappings {

    static mappings = {
        "/api/guest/loginAsGuest"(controller: 'user', action: 'loginAsGuest')
        
        "/api/guest/register"(controller: 'user', action: 'register')
        
        "/api/user/chatUsers"(controller: 'user', action: 'listChatUsers')
        
        "/api/channel/list"(controller: 'channel', action: 'list')
        "/api/channel/create"(controller: 'channel', action: 'create')

        "/api/message/listAll"(controller: 'message', action: 'listAll')
        "/api/message/create"(controller: 'message', action: 'create')

        "/health"(controller: 'health', action: 'index')
        
        "500"(controller: 'error')
        "404"(view: '/notFound')
    }
}
