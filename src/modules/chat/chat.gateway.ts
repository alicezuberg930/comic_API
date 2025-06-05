import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: ["http://192.168.1.162:3000", "http://localhost:3000", "https://react-video-website-ten.vercel.app"],
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) { }

    @WebSocketServer()
    server: Server

    handleConnection(client: Socket) {
        console.log(client.id + " has connected")
        this.server.to(client.id).emit('connected', {
            socketId: client.id,
            message: `client ${client.id} has connected`
        })
    }

    handleDisconnect(client: Socket) {
        console.log(client.id + " has disconnected")
        client.emit('disconnected', {
            message: `client ${client.id} has disconnected`
        })
    }

    users: { email: string, socketId: string, roomId: string }[] = []

    @SubscribeMessage('callUser')
    callUser(@MessageBody() data: { userToCall: string, signal: any, from: string, name: string }, @ConnectedSocket() client: Socket) {
        console.log("CALled to; " + data.userToCall)
        if (data.userToCall) {
            this.server.to(data.userToCall).emit('callUser', { signal: data.signal, from: data.from, name: data.name })
        }
    }

    @SubscribeMessage('answerCall')
    answerCall(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        console.log("CALled to; " + data.to)
        if (data.to) {
            this.server.to(data.to).emit('callAccepted', { signal: data.signal })
        }
    }
}
