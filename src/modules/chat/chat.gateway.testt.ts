// import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
// import { ChatService } from './chat.service';
// import { CreateChatDto } from './dto/create-chat.dto';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({
//     cors: {
//         origin: ['http://localhost:3000'],
//         methods: ['GET', 'POST'],
//         credentials: true,
//     },
// })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//     constructor(private readonly chatService: ChatService) { }

//     @WebSocketServer()
//     server: Server

//     handleConnection(client: Socket) {
//         console.log(client.id + " has connected")
//         client.emit('connected', {
//             message: `client ${client.id} has connected`
//         })
//     }

//     handleDisconnect(client: Socket) {
//         console.log(client.id + " has disconnected")
//         client.emit('disconnected', {
//             message: `client ${client.id} has disconnected`
//         })
//     }

//     users: any[] = []

//     @SubscribeMessage('userJoin')
//     userJoin(@MessageBody() joinUser: any, @ConnectedSocket() client: Socket) {
//         if (joinUser) {
//             const duplicate = this.users.find(user => user.userId === joinUser.id)
//             if (duplicate) {
//                 this.users = this.users.filter(user => user.userId !== duplicate.userId)
//             }
//         }
//         joinUser && !this.users.find((user: any) => user.socketId === client.id) && this.users.push({
//             userId: joinUser.id,
//             profile: joinUser,
//             socketId: client.id
//         })
//         this.server.emit('getUsers', this.users)
//     }

//     @SubscribeMessage('userLeave')
//     userLeave(@MessageBody() leaveUser: any, @ConnectedSocket() client: Socket) {
//         let users = this.users.filter(user => user.socketId !== client.id)
//         this.users = users
//         this.server.emit('getUsers', this.users)
//     }

//     @SubscribeMessage('startCall')
//     startCall(@MessageBody() participants: any, @ConnectedSocket() client: Socket) {
//         // console.log("CALled to; " + participants.receiver.socketId)
//         if (participants.receiver.socketId) {
//             this.server.to(participants.receiver.socketId).emit('incomingCall', participants)
//         }
//     }

//     @SubscribeMessage('webRTCSignal')
//     async webRTCSignal(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
//         console.log(data.sdp)
//         if (data.isCaller) {
//             const receiverSocketId = data.ongoingCall.participants.receiver.socketId
//             if (receiverSocketId) {
//                 // console.log("send to; " + receiverSocketId)
//                 this.server.to(receiverSocketId).emit('completeP2PConnection', data)
//             }
//         } else {
//             const callerSocketId = data.ongoingCall.participants.caller.socketId
//             if (callerSocketId) {
//                 // console.log("send to; " + callerSocketId)
//                 this.server.to(callerSocketId).emit('completeP2PConnection', data)
//             }
//         }
//     }
// }
