export class User {
  constructor(id, userName, profilePhoto, password) {
    this.id = id;                  // string
    this.userName = userName;      // string
    this.status = "offline";       // string
    this.profilePhoto = profilePhoto; // string
    this.currentSession = null;  
    this.password =password  // UserSession
  }

  static signUp(user) {
    // logic for signing up
    //first make sure all the values are truthy 

    console.log(`this is the user : ${user.id } ,${user.userName } ,${user.status },${user.profilePhoto }`);
    if(user.id && user.userName && user.status && user.profilePhoto ){
      console.log(`user valid`);
      //get the list of user
      let Users = JSON.parse(localStorage.getItem('Users'));

      if(Users){ //if truthy then you will add to it
        Users.push(user);

      }else { // make and array and push it
        Users = [user];
      }
      console.log(`saving user`);
      //after push it back
      localStorage.setItem('Users',JSON.stringify(Users));
       console.log(`user saved`);

    }else {
      console.log(`was unable to signup`);
    }
  }

  

  static login(attemptUser) {
    // logic for logging in
    //get all the users from localstorage 
    let Users = JSON.parse(localStorage.getItem('Users'));

    if(Users){
      console.log('Users are registerd');
      if(Users.some( user  => {
        return user.userName === attemptUser.userName && user.password === attemptUser.password;
      })){ // if there is someone with that same log in details then log them in
        sessionStorage.setItem('user', JSON.stringify(attemptUser));
        console.log(`${attemptUser.userName} has logged in succesfully`);
        return true;
      } 
      
      return false

    }else{
      console.log(`no users registerd`)
     
    }
  }

  logout() {
    // logic for logging out
  }

  sendMessage(chatRoom, body) {
    // sends message to a specific chat room
  }
}
