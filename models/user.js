//user class
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

  
    if(user.id && user.userName && user.status && user.profilePhoto ){
     
      //get the list of user
      let Users = JSON.parse(localStorage.getItem('Users'));

      if( Users != null && User.lookforUser(Users,user) != null){


        alert('user name TAKEN!');
        return;
      }

      if(Users ){ //if truthy then you will add to it
        Users.push(user);

      }else { // make and array and push it
        Users = [user];
      }
     
      //after push it back
      localStorage.setItem('Users',JSON.stringify(Users));
      ;
       window.location.href = '../pages/logIn.html';

    }else {
      alert(`was unable to signup`);
    }
  }

  

  static login(attemptUser) {
    // logic for logging in
    //get all the users from localstorage 
    let Users = JSON.parse(localStorage.getItem('Users'));

    if(Users != null){
      
      if(Users.some( user  => {
        return user.userName === attemptUser.userName && user.password === attemptUser.password;
      })){ // if there is someone with that same log in details then log them in

        attemptUser = User.lookforUser(Users,attemptUser);
        attemptUser.status = 'online';
     
        
        // Find and replace the user in the Users array
        const userIndex = Users.findIndex(user => user.userName === attemptUser.userName);
        if (userIndex !== -1) {
          Users[userIndex] = attemptUser;
          localStorage.setItem('Users', JSON.stringify(Users));
        }
     
        sessionStorage.setItem('user', JSON.stringify(attemptUser));
    
        return true;
      } else{
        alert('User name or password incorret')
      }
      
      return false

    }else{
     
     
    }
  }

static async logOut(currentUser){
 
  if (currentUser) {
    
    
    // Update users array in localStorage
    let users = JSON.parse(localStorage.getItem('Users'));
    if (users) {  // Add null check
      const userIndex = users.findIndex(user => user.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex].status = 'offline';
        localStorage.setItem('Users', JSON.stringify(users));
      }
    }
    
    // Check if chatRooms exists BEFORE processing
    let chatRooms = JSON.parse(localStorage.getItem('chatRooms'));
    if (chatRooms != null) {  
      chatRooms.forEach( chat => {
        
        const index = chat.members.findIndex( user => user.id === currentUser.id);

        if(index != null){
          chat.members[index].status = 'offline';
        }
      })
      
      localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
    }
    //  Don't do anything if chatRooms doesn't exist
  }
  
  // Clear session storage
  sessionStorage.clear();
  
  // Redirect
  window.location.href = '../index.html';
}

}



