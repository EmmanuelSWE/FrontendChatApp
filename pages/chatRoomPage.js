import { User } from '../models/user.js';
import { ChatRoom } from '../models/chatRoom.js';
console.log(`the page is loadded`)
// Create 10 users
const users = [
  new User("1", "Alice", "alice.png"),
  new User("2", "Bob", "bob.png"),
  new User("3", "Charlie", "charlie.png"),
  new User("4", "Diana", "diana.png"),
  new User("5", "Ethan", "ethan.png"),
  new User("6", "Fiona", "fiona.png"),
  new User("7", "George", "george.png"),
  new User("8", "Hannah", "hannah.png"),
  new User("9", "Ian", "ian.png"),
  new User("10", "Julia", "julia.png"),
];

// Mark 5 users as online
users[0].status = "online";  // Alice
users[1].status = "online";  // Bob
users[2].status = "online";  // Charlie
users[3].status = "online";  // Diana
users[4].status = "online";  // Ethan

// Create 10 chat rooms
const chatRooms = [
  new ChatRoom("c1", "Private Room 1", "private"),
  new ChatRoom("c2", "Private Room 2", "private"),
  new ChatRoom("c3", "Private Room 3", "private"),
  new ChatRoom("c4", "Private Room 4", "private"),
  new ChatRoom("c5", "Private Room 5", "private"),

  new ChatRoom("c6", "Group Room 1", "group"),
  new ChatRoom("c7", "Group Room 2", "group"),
  new ChatRoom("c8", "Group Room 3", "group"),
  new ChatRoom("c9", "Group Room 4", "group"),
  new ChatRoom("c10", "Group Room 5", "group"),
];

const createListElement = (message) =>{
        const text = document.createElement('h4');
    text.innerText = `${message}`
    return text;
}

export const filterUsers =( listone, listtwo) => {

    
    for(let i = 0; i < users.length; i++){

        
        if(users[i].status ==='online'){
            listone.appendChild(createListElement(users[i].userName));
        }else{
                listtwo.appendChild(createListElement(users[i].userName));
        }
    }
}


export const filterGroups = (list) =>{
  chatRooms.forEach(chat =>{

    if(chat.cType === 'group'){
        list.appendChild(createListElement(chat.cname));
    }
  }) 
}


//when page is loaded, add these
document.addEventListener('DOMContentLoaded', ()=>{
const onlineContainer = document.getElementById('itemContainerOnline');
const offlineContainer = document.getElementById('itemContainerOffline');
const grpContainer = document.getElementById('itemContainerGroup');

filterUsers(onlineContainer,offlineContainer);
filterGroups(grpContainer);

})

