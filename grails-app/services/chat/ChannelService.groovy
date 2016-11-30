package chat

class ChannelService {

    List<Channel> listAll() {
        Channel.list()
    }

    Channel create(CreateChannelDto dto) {
        new Channel(name: dto.name).save(failOnError: true)
    }
}


