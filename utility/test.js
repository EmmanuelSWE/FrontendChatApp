// small testing file to test if the messaging is working


//first get the items
const list = document.getElementById('testBlock');
//const input = document.getElementById('Testinput');

    
   function formatHoursMinutes(date) {
    if(date){
        const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
    }
    else{
        return 'something wrong'
    }
}

//function to add messages on the list. 
export const addToList = (message, textSide) => {
    const side = textSide ?? 'right';
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    
    const formattedTime = formatHoursMinutes(new Date(message.createdAt));
    
    // Determine sender name
    let senderName = '';
    if (message.sender.id === sessionUser.id) {
        senderName = 'You';
    } else {
        senderName = message.sender.userName || message.sender.name || 'User';
    }

  

    
    const messageHTML = `
        <li style="margin: 2%; display: flex; width: 100%; justify-content: ${side !== 'right' ? 'flex-start' : 'flex-end'};">
            <div style="display: grid; grid-template-rows: auto auto auto; gap: 5px; max-width: 70%;">
                <!-- Row 1: Image and Name -->
                <div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center; ${side !== 'right' ? '' : 'direction: rtl;'}">
                    <img src="../assets/bubble1.jpg" style="border-radius: 100%; width: 2.5rem; height: 2.5rem; padding: 2px; border: 1px solid grey; object-fit: cover;">
                    <span style="font-size: 0.9rem; font-weight: bold; color: #fff; ${side !== 'right' ? 'text-align: left;' : 'text-align: right;'}">
                        ${senderName}
                    </span>
                </div>
                <!-- Row 2: Message Text -->
                <div style="border-radius: 18px; padding: 10px 20px; background-color: ${side !== 'right' ? 'black' : '#3b3b3b'}; color: white; line-height: 1.5; font-size: 1rem; width: fit-content; justify-self: ${side !== 'right' ? 'start' : 'end'};">
                    ${message.message}
                </div>
                <!-- Row 3: Timestamp -->
                <p style="margin: 0; padding: 0 5px; font-size: 0.75rem; color: #999; text-align: ${side !== 'right' ? 'left' : 'right'}; justify-self: ${side !== 'right' ? 'start' : 'end'};">
                    ${formattedTime}
                </p>
            </div>
        </li>
    `;
    
    list.innerHTML += messageHTML;
    list.scrollTop = list.scrollHeight;
}
//function to sent the message: 
export const sendMessage = (message) => {
    localStorage.setItem('chat', JSON.stringify(message));

    console.log(`here is the message `)
   addToList(message);
}


//adding event listener??
window.addEventListener('storage', (event) => {
    console.log(`just got a message`);
    if(event.key === 'chat'){

       //first the currentsession of the chat
       const currentChat = JSON.parse(sessionStorage.getItem('currentChat'));
       if(currentChat != null && currentChat.cid === JSON.parse(event.newValue).cid){ //checking if the user in the session is in the chat
         console.log(`recieved NEW value is ${JSON.parse(event.newValue).message}`)
       addToList(JSON.parse(event.newValue), 'left');
       }else{
        console.log(`recieved message but not in this chat`);
       }
    }
})



//drop list buttons and containers
const onlineBtn = document.getElementById('onlineGrpBtn');
const offlineBtn = document.getElementById('offlineGrpBtn');
const grpBtn = document.getElementById('grpBtn');

const onlineContainer = document.getElementById('itemContainerOnline');
const offlineContainer = document.getElementById('itemContainerOffline');
const grpContainer = document.getElementById('itemContainerGroup');
//droping the list 
const dropList = (button,listContainter) => {
     

        
    button.addEventListener('click', ()=>{
       const val = window.getComputedStyle(listContainter).display; // to properly check for the current style of an element
            
      
       listContainter.style.display = val != 'none' ? 'none' : 'block';
    })

}

if(window.location.href === './chatPage.html'){
    //setting functionality
dropList(onlineBtn,onlineContainer);
dropList(offlineBtn, offlineContainer);
dropList(grpBtn, grpContainer);


}


