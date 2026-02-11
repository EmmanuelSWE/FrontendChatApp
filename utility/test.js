// small testing file to test if the messaging is working


//first get the items
const list = document.getElementById('testBlock');
const input = document.getElementById('Testinput');
const button = document.getElementById('sendButton');



//function to add messages on the list. 
const addToList= (message,textSide) => {

    const side = textSide ?? 'right';

   

    const listItem = document.createElement('li');
    const textBox = document.createElement('p');
    
    textBox.innerText = message
    textBox.style.position = 'relative';
    listItem.style.display = 'flex';
   
    if(side != 'right'){
        textBox.style.backgroundColor = 'black';
          listItem.style.flexDirection = 'row';
    }else{
         textBox.style.backgroundColor = 'rgb(140, 137, 137)';
          listItem.style.flexDirection = 'row-reverse';
    }
       
    
    listItem.appendChild(textBox);
       
    
    listItem.style.width= '100%';
    

    list.appendChild(listItem);
    list.scrollTop = list.scrollTop + 5;
}

//function to sent the message: 
const sendMessage = (words) => {
    localStorage.setItem('chat', words);

    addToList(words);
}


//adding event listener??
window.addEventListener('storage', (event) => {
    console.log(`just got a message`);
    if(event.key === 'chat'){

        console.log(`recieved value is ${event.newValue}`)
        addToList(event.newValue, 'left');
    }
})

button.addEventListener('click', ()=>{
    sendMessage(input.value);
    console.log(`sending ${input.value}`);
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

//setting functionality
dropList(onlineBtn,onlineContainer);
dropList(offlineBtn, offlineContainer);
dropList(grpBtn, grpContainer);




