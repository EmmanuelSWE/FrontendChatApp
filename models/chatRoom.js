
export class ChatRoom {
  constructor(cid, cname, cType) {
    this.cid = cid;          // string
    this.cname = cname;      // string
    this.cType = cType;      // string ("private" or "group")
    this.chatNum = 0;        // string/number
    this.messages = [];      // array of Message
    this.members = [];       // array of Users
  }

  validateUsers(users) {
    // check if users are in the chat
  }

  validateMessage(message) {
    // validate message content
  }

  sendMessageToChat(user) {
    // send message to chat
  }

}
