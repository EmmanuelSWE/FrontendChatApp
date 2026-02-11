export class Message {
  constructor(mid, sender, message, cid) {
    this.mid = mid;              // string (format of cid, chat number)
    this.sender = sender;        // uid
    this.message = message;      // string
    this.deleted = false;        // boolean
    this.createdAt = new Date(); // date
    this.cid = cid;              // string
  }

  sendMessage(chatRoom) {
    // validate and send message to chatRoom
  }
}
