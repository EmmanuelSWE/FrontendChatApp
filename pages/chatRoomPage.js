import { User } from '../models/user.js';
import { ChatRoom } from '../models/chatRoom.js';
import { addToList ,sendMessage } from '../utility/test.js';
import { Message } from '../models/messages.js';
console.log(`the page is loadded`)

//when page is loaded, add these
document.addEventListener('DOMContentLoaded', ()=>{

  loadLists();

  // Get the profile container
const profileDiv = document.getElementById('profile');

// Clear it and rebuild everything
profileDiv.innerHTML = `
    <div id="userProfile">
        <img src="../assets/bubble1.jpg" style="border-radius: 100%; width: 3rem; height: 3rem; padding: 2px; border: 1px solid grey; object-fit: cover;">
    </div>  
    <div style="display: flex; gap: 20px;">
      <button id="logOutbtn"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    <button id="settings"><i class="fa-solid fa-gear"></i></button>
    </div>
`;

// NOW add event listeners AFTER the buttons exist in the DOM
document.getElementById('logOutbtn').addEventListener('click', () => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    User.logOut(sessionUser);
});

document.getElementById('settings').addEventListener('click', () => {
    window.location.href = './profile.html';
});


})


export const filterUsers =( users,listone, listtwo) => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    
    for(let i = 0; i < users.length; i++){
        
        // Skip the current session user
        if(users[i].id === sessionUser.id) {
            continue;
        }
        
        if(users[i].status === 'online'){
            listone.appendChild(createListElement(users[i].userName));
        }else{
            listtwo.appendChild(createListElement(users[i].userName));
        }
    }
}


export const filterGroups = ( chatRooms,list) =>{
  if(chatRooms != null){
   
    chatRooms.forEach(chat =>{

    if(chat.cType === 'group' ){
        list.appendChild(createListElement(chat.cname,'group'));
    }
  }) 
  }
}
const createListElement = (message, type = '') => {
    const listItem = document.createElement('li');
    listItem.style.backgroundColor = '#191919';
    listItem.style.marginBottom = '2%';
    listItem.style.width = '100%';
    listItem.style.display = 'flex';
    listItem.style.alignItems = 'center';
    listItem.style.gap = '10px';
    listItem.style.padding = '8px';
    listItem.style.borderRadius = '5px';
    
    // Add image if type is truthy (group)
    if (!type) {
        const groupImage = document.createElement('img');
        groupImage.src = '../assets/bubble1.jpg';
        groupImage.style.borderRadius = '100%';
        groupImage.style.width = '2.5rem';
        groupImage.style.height = '2.5rem';
        groupImage.style.padding = '2px';
        groupImage.style.border = '1px solid grey';
        groupImage.style.objectFit = 'cover';
        listItem.appendChild(groupImage);
    }
    
    const text = document.createElement('h4');
    text.innerText = message;
    text.style.margin = '0';
    text.style.flex = '1';
    
    text.addEventListener('click', () => {
        loadChatRoom(message, type);
    });
    
    listItem.appendChild(text);
    return listItem;
}

export const loadLists =() =>{
const onlineContainer = document.getElementById('itemContainerOnline');
const offlineContainer = document.getElementById('itemContainerOffline');
const grpContainer = document.getElementById('itemContainerGroup');

onlineContainer.replaceChildren();
offlineContainer.replaceChildren();
grpContainer.replaceChildren();

//get the stuff
// Create 10 users
const users = JSON.parse(localStorage.getItem('Users'));


console.log('users loaded')
// Create 10 chat rooms
const chatRooms =JSON.parse(localStorage.getItem('chatRooms'));
console.log('chatRooms loaded')



filterUsers(users,onlineContainer,offlineContainer);
filterGroups(chatRooms,grpContainer);
}




//function to load chat room
const loadChatRoom = (userName, type = '') => {
    // first get chat 
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    const currentChat = getchatRoom(userName, type);

    if (currentChat === null) {
        console.log('stopped');
        return null;
    }
    console.log(`these are the elements of a chatRoom : ${currentChat.cname}`);

    // CHANGE THE HEADER - ADDED IMAGE
    const headerElement = document.getElementById('contactName');
    const headerContainer = headerElement.parentElement; // Get the header parent
    
    // Clear existing content
    headerContainer.innerHTML = '';
    
    // Create flex container for image and name
    headerContainer.style.display = 'flex';
    headerContainer.style.alignItems = 'center';
    headerContainer.style.gap = '10px';
    headerContainer.style.padding = '10px';
    
    // Create image element
    const profileImage = document.createElement('img');
    profileImage.src = '../assets/bubble1.jpg';
    profileImage.style.borderRadius = '100%';
    profileImage.style.width = '3rem';
    profileImage.style.height = '3rem';
    profileImage.style.padding = '2px';
    profileImage.style.border = '1px solid grey';
    profileImage.style.objectFit = 'cover';
    
    // Create name element
    const nameElement = document.createElement('h1');
    nameElement.id = 'contactName';
    const chatBanner = document.getElementById('UserName');
    
    if (currentChat.cType != 'group' && currentChat != null) {
        const [chatName] = currentChat.members.filter(item => {
            return item.id != sessionUser.id;
        });
        nameElement.innerText = chatName.userName;
        chatBanner.innerText = chatName.userName;
    } else {
        nameElement.innerText = currentChat.cname;
        chatBanner.innerText = currentChat.userName;
    }
    
    // Assemble
    headerContainer.appendChild(profileImage);
    headerContainer.appendChild(nameElement);

    // after that load the chats
    loadChats(currentChat);
}

//function to check if they have a chat room or it has to be created
const getchatRoom = (userName ,type='') => {
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
  //if it is a group of people then what happens is simple
  if(type){ 
    //looking for a group chatRoom 
    chatRooms.forEach(chat =>{

    if(chat.cType === 'group' && chat.cname === userName){
       chatRoom = chat;
       return chatRoom;
    }
  }) 
  } else { //looking for a private chat
  //creating a chat room with anyone
  if(chatRooms != null){


    chatRooms.forEach(chat =>{

    if(chat.cType === 'group' && chat.cname === userName){
       chatRoom = chat;
       return chatRoom;
    }})
    //first see if there is one like that
 if(   chatRooms.some( chat=> {
     return  chat.cType != 'group' && (chat.members[0].id === realUser.id || chat.members[0].id == sessionUser.id)  && ( (chat.members[1].id === realUser.id || chat.members[1].id == sessionUser.id) );
    })){ // if there is one like that the we have to find it 
        [chatRoom] = chatRooms.filter( chat => { return chat.cType != 'group' && (chat.members[0].id === realUser.id || chat.members[0].id == sessionUser.id)  && ( (chat.members[1].id === realUser.id || chat.members[1].id == sessionUser.id) )});

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
      addToList(message);
    }else{
       addToList(message,'left' );
    }
    
  })

}


//sending MessageFunction
const sendchatBlock =() => {
  const input = document.getElementById('Testinput');
   const sessionUser = JSON.parse(sessionStorage.getItem('user'));
  const currentChat = JSON.parse(sessionStorage.getItem('currentChat'));
  const messageToSend = new Message(currentChat.messages.length != null ? currentChat.messages.length : 1, sessionUser, input.value, currentChat.cid);
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


//event listener for the button
const makegrp = document.getElementById('makeGroup');
const grpInput = document.getElementById('inputSection');
makegrp.addEventListener('click', ()=>{
       const val = window.getComputedStyle(grpInput).display; // to properly check for the current style of an element
            
      
       grpInput.style.display = val != 'none' ? 'none' : 'block';
    })
const grpButton = document.getElementById('grpButton');
const grpinputBox = document.getElementById('grpInput');
grpButton.addEventListener('click', () => {


const grpContainer = document.getElementById('itemContainerGroup');

grpContainer.replaceChildren();
  const sessionUser =JSON.parse(sessionStorage.getItem('user'));
  let chatRooms = JSON.parse(localStorage.getItem('chatRooms'));
  chatRooms.push(ChatRoom.createGroup( chatRooms.length,grpinputBox.value,sessionUser))

  filterGroups(chatRooms,grpContainer);

  //add when filtering is done
  localStorage.setItem('chatRooms',JSON.stringify(chatRooms));


  
})


//logOut functionality
const logOut = document.getElementById('logOutbtn');

