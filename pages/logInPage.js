import { User } from "../models/user.js";


//set up the form
const signInForm = document.getElementById('SubmitForm');
const uNameInput = document.getElementById('uNameInput');
const password = document.getElementById('password');


//function to signup
const logIn= async ()=>{
    //get the number of user
    let newUser = new User(0,uNameInput.value,'pic', password.value);
 console.log(`this is the user : ${newUser.id } ,${newUser.userName } ,${newUser.status },${newUser.profilePhoto }`);
    if(User.login(newUser)){
        window.location.href = './chatPage.html';
    }
    
}



//setting the fucntionality 

signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); // so that it doesnt reload 
    console.log(`trying to sign a user up`);
    logIn();
})