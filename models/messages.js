//message class
export class Message {
  constructor(mid, sender, message, cid) {
    this.mid = mid;           
    this.sender = sender;        
    this.message = message;      
    this.deleted = false;        
    this.createdAt = new Date();
    this.cid = cid;              
  }

  sendMessage(chatRoom) {
    // validate and send message to chatRoom
  }
}
