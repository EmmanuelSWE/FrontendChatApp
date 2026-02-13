
export class ChatRoom {
  constructor(cid, cname, cType , members = []) {
    this.cid = cid;          // string
    this.cname = cname;      // string
    this.cType = cType;      // string ("private" or "group")
    this.chatNum = 0;        // string/number
    this.messages = [];      // array of Message
    this.members = members;       // array of Users
  }


  static createGroup(cid, cname , user,members = [user]){
    return new ChatRoom(cid, cname, 'group' , members);
  }


}
