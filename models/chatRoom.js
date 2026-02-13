//class for cchatRooms
export class ChatRoom {
  constructor(cid, cname, cType , members = []) {
    this.cid = cid;         
    this.cname = cname;      
    this.cType = cType;      
    this.chatNum = 0;        
    this.messages = [];      
    this.members = members;       
  }


  static createGroup(cid, cname , user,members = [user]){
    return new ChatRoom(cid, cname, 'group' , members);
  }


}
