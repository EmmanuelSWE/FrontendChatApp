import { User } from "../models/user.js";


//set up the form
const signInForm = document.getElementById('SubmitForm');
const fNameInput = document.getElementById('fNameInput');
const uNameInput = document.getElementById('uNameInput');

const password = document.getElementById('password');


//function to signup
const signUp= async ()=>{
    //get the number of user
    const Users = JSON.parse(localStorage.getItem('Users'));
   const  count = Users ==null ? 0 : Users.length
    const newUser = new User(count+1, fNameInput.value,uNameInput.value,'pic', password.value);

    User.signUp(newUser);
}


//setting the fucntionality 

signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); // so that it doesnt reload 
   
    signUp();
})