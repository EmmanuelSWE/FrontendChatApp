import { User } from "../models/user.js";


//set up the form
const signInForm = document.getElementById('SubmitForm');
const fNameInput = document.getElementById('fNameInput');
const uNameInput = document.getElementById('uNameInput');
const email = document.getElementById('email');
const password = document.getElementById('password');


//function to signup
const signUp= async ()=>{
    //get the number of user
    const Users = JSON.parse(localStorage.getItem('Users'));

   const  count = Users ==null ? 0 : Users.length;

    const newUser = new User(count+1,uNameInput.value,'pic', password.value);

    User.signUp(newUser);

}


//setting the fucntionality 

signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); // so that it doesnt reload 
    console.log(`trying to sign a user up`);
    signUp();
})