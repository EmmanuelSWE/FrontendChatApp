// small testing file to test if the messaging is working


//first get the items
const list = document.getElementById('testBlock');
const input = document.getElementById('Testinput');
const button = document.getElementById('sendButton');



//function to add messages on the list. 
const addToList= (message) => {
    const listItem = document.createElement('li');
    listItem.innerText = message;

    list.appendChild(listItem);
}

//function to sent the message: 
const sendMessage = (words) => {
    localStorage.setItem('chat', words);
}


//adding event listener??
window.addEventListener('storage', (event) => {
    console.log(`just got a message`);
    if(event.key === 'chat'){

        console.log(`recieved value is ${event.newValue}`)
        addToList(event.newValue);
    }
})

button.addEventListener('click', ()=>{
    sendMessage(input.value);
    console.log(`sending ${input.value}`);
})



