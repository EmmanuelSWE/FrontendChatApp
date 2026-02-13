export class User {
  constructor(id, fullName='', userName, profilePhoto, password) {
    this.id = id;   
    this.fullName = fullName;               // string
    this.userName = userName;      // string
    this.status = "offline";       // string
    this.profilePhoto = profilePhoto; // string
    this.currentSession = null;  
    this.password =password  // UserSession
  }


  static lookforUser(Users,qUser){
    let found = false;
      Users.forEach(user =>{
          if(user.userName === qUser.userName){
              qUser = user;
              found = true;
              return;
          }
        })   
        return found ==true ? qUser : null;
       
  }

  static getUser(userName){
        const queryUser = new User();
        queryUser.userName = userName
        let Users = JSON.parse(localStorage.getItem('Users'));

        if(Users != null && User.lookforUser(Users,queryUser) != null){
          return User.lookforUser(Users,queryUser);
        }

        return false;
  }

  static signUp(user) {
    // logic for signing up
    //first make sure all the values are truthy 

    console.log(`this is the user : ${user.id } ,${user.userName } ,${user.status },${user.profilePhoto }`);
    if(user.id && user.userName && user.status && user.profilePhoto ){
      console.log(`user valid`);
      //get the list of user
      let Users = JSON.parse(localStorage.getItem('Users'));

      if( Users != null && User.lookforUser(Users,user) != null){


        console.log('user name cannot be the same');
        return;
      }

      if(Users ){ //if truthy then you will add to it
        Users.push(user);

      }else { // make and array and push it
        Users = [user];
      }
      console.log(`saving user`);
      //after push it back
      localStorage.setItem('Users',JSON.stringify(Users));
       console.log(`user saved`);
       window.location.href = '../pages/logIn.html';

    }else {
      console.log(`was unable to signup`);
    }
  }

  

  static login(attemptUser) {
    // logic for logging in
    //get all the users from localstorage 
    let Users = JSON.parse(localStorage.getItem('Users'));

    if(Users != null){
      console.log('Users are registerd');
      if(Users.some( user  => {
        return user.userName === attemptUser.userName && user.password === attemptUser.password;
      })){ // if there is someone with that same log in details then log them in
console.log(` user found`);
        attemptUser = User.lookforUser(Users,attemptUser);
        attemptUser.status = 'online';
        console.log(`set user online`);
        
        // Find and replace the user in the Users array
        const userIndex = Users.findIndex(user => user.userName === attemptUser.userName);
        if (userIndex !== -1) {
          Users[userIndex] = attemptUser;
          localStorage.setItem('Users', JSON.stringify(Users));
        }
     
        sessionStorage.setItem('user', JSON.stringify(attemptUser));
       // console.log(`${attemptUser.userName} has logged in succesfully`);
        return true;
      } 
      
      return false

    }else{
      console.log(`no users registerd`)
     
    }
  }

 static logOut(currentUser){
  console.log('loggin out');
  // Get current user and set to offline
  
  
  if (currentUser) {
    currentUser.status = 'offline';
    
    // Update users array in localStorage
    let users = JSON.parse(localStorage.getItem('Users')) || [];
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    
    if (userIndex !== -1) {
      users[userIndex].status = 'offline';
    } 
    
    localStorage.setItem('Users', JSON.stringify(users));
  }
  
  // Clear session storage
  sessionStorage.clear();
  
  // Redirect to index.html
  window.location.href = '../index.html';

}


}



