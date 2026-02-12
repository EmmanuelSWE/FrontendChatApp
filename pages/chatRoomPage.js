import { User } from '../models/user.js';
import { ChatRoom } from '../models/chatRoom.js';
import { addToList ,sendMessage } from '../utility/test.js';
import { Message } from '../models/messages.js';
console.log(`the page is loadded`)

export const filterUsers =( users,listone, listtwo) => {
    for(let i = 0; i < users.length; i++){

        
        if(users[i].status ==='online'){
            listone.appendChild(createListElement(users[i].userName));
        }else{
                listtwo.appendChild(createListElement(users[i].userName));
        }
    }
}


export const filterGroups = ( chatRooms,list) =>{
  if(chatRooms != null){
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    chatRooms.forEach(chat =>{

    if(chat.cType === 'group'){
        list.appendChild(createListElement(chat.cname));
    }
  }) 
  }
}
const createListElement = (message) =>{
        const text = document.createElement('h4');
    text.innerText = `${message}`
    
    text.addEventListener('click', () => {
      loadChatRoom(message);
    })

    const listItem = document.createElement('li')
    listItem.style.backgroundColor ='#191919';
    listItem.width = '100%';
    listItem.appendChild(text);
    return listItem;
}

//when page is loaded, add these
document.addEventListener('DOMContentLoaded', ()=>{
const onlineContainer = document.getElementById('itemContainerOnline');
const offlineContainer = document.getElementById('itemContainerOffline');
const grpContainer = document.getElementById('itemContainerGroup');

//get the stuff
// Create 10 users
const users = JSON.parse(localStorage.getItem('Users'));


console.log('users loaded')
// Create 10 chat rooms
const chatRooms =JSON.parse(localStorage.getItem('ChatRooms'));
console.log('chatRooms loaded')



filterUsers(users,onlineContainer,offlineContainer);
filterGroups(chatRooms,grpContainer);

})



//function to load chat room
const loadChatRoom =(userName)=>{
  //first get chat 
const sessionUser = JSON.parse(sessionStorage.getItem('user'));
  const currentChat = getchatRoom(userName);

  if(currentChat === null){
    console.log('stoped');
    return null;
  }
 console.log(`these are the elements of a chatRoom : ${currentChat.cname}`)

  //then after that change the name of heading
  const nameElement = document.getElementById('UserName');
   
  if((currentChat.cType != 'group' && currentChat != null)){
    const [chatName] = currentChat.members.filter( item => {
    return item.id != sessionUser.id;
  })

  nameElement.innerText = chatName.userName;
  }else {
    nameElement.innerText = currentChat.cname;
  }

  //after that load the chats
  loadChats(currentChat);


}


//function to check if they have a chat room or it has to be created
const getchatRoom = (userName) => {
  const realUser = User.getUser(userName);
  const sessionUser = JSON.parse(sessionStorage.getItem('user'));
  //once you have the user now begin to look for the user

  if (realUser.id === sessionUser.id) {
        console.log("You cannot chat with yourself");
        return null;
    }
  let chatRoom;
  let chatRooms = JSON.parse(localStorage.getItem('chatRooms'));

  let count = chatRooms != null ? chatRooms.length : 0;

  if(chatRooms != null){
    //first see if there is one like that
 if(   chatRooms.some( chat=> {
     return  (chat.members[0].id === realUser.id || chat.members[0].id == sessionUser.id)  && ( (chat.members[1].id === realUser.id || chat.members[1].id == sessionUser.id) );
    })){ // if there is one like that the we have to find it 
        [chatRoom] = chatRooms.filter( chat => { return (chat.members[0].id === realUser.id || chat.members[0].id == sessionUser.id)  && ( (chat.members[1].id === realUser.id || chat.members[1].id == sessionUser.id) )});

    } else{ // or we make a new one
        chatRoom = new ChatRoom(count + 1, 'privateChat1', 'private', [realUser, sessionUser]);
        chatRooms.push(chatRoom);
       localStorage.setItem('chatRooms',JSON.stringify(chatRooms));
    }

  }else { //create chatRoom
    chatRoom = new ChatRoom(count + 1, 'privateChat', 'private', [realUser, sessionUser]);
    chatRooms = [chatRoom];
    localStorage.setItem('chatRooms',JSON.stringify(chatRooms));
  }

  sessionStorage.setItem('currentChat', JSON.stringify(chatRoom)); // saving the current chat
  return chatRoom;

}


//function to load chats of the message
const loadChats =(chatRoom) => {
  const sessionUser = JSON.parse(sessionStorage.getItem('user'));
  const list = document.getElementById('testBlock');
  list.replaceChildren(); // clear the entire list
console.log(`loading message ${chatRoom.messages.length}`)
  chatRoom.messages.forEach(message => {

    console.log(`loading message ${message.message}`)
    if(message.sender.id === sessionUser.id ){
      addToList(message.message);
    }else{
       addToList(message.message,'left' );
    }
    
  })

}


//sending MessageFunction
const sendchatBlock =() => {
  const input = document.getElementById('Testinput');
   const sessionUser = JSON.parse(sessionStorage.getItem('user'));
  const currentChat = JSON.parse(sessionStorage.getItem('currentChat'));
  const messageToSend = new Message(currentChat.length != null ? currentChat.length + 1 : 1, sessionUser, input.value, currentChat.cid);
  currentChat.messages.push(messageToSend);
  sessionStorage.setItem('currentChat', JSON.stringify(currentChat)); // saving the current chat

  console.log(`now the number of message is ${currentChat.messages.length}`)
  //replace the chat.
  const chatRooms = JSON.parse(localStorage.getItem('chatRooms'));
  const index = chatRooms.findIndex( item => {
 return item.cid === currentChat.cid});


  console.log(`this is the index of the chat ${index}`)
  if(index != -1){ //index found replace
    console.log(`chatRoom found`);

    chatRooms[index] = currentChat;
     localStorage.setItem('chatRooms',JSON.stringify(chatRooms));
  }
  console.log(`sending ${messageToSend.message}`);

  //after replacing you send the chat
  sendMessage(messageToSend);
  
}


const button = document.getElementById('sendButton');

button.addEventListener('click', ()=>{
    sendchatBlock();
    
})