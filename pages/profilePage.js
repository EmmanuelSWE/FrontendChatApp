

const changeUserName = (newUserName) => {
    // Get current user from session storage
    let user = JSON.parse(sessionStorage.getItem('user'));
    
    if (user) {
        // Store old username for finding the user in array
        let oldUserName = user.userName;
        
        // Change the username
        user.userName = newUserName;
        
        // Load users array from local storage
        let Users = JSON.parse(localStorage.getItem('Users'));
        
        if (Users) {
            // Find and replace the user in the array using old username
            const userIndex = Users.findIndex(u => u.userName === oldUserName);
            if (userIndex !== -1) {
                Users[userIndex] = user;
                // Store the users array again
                localStorage.setItem('Users', JSON.stringify(Users));
                // Update session storage with the changed user
                sessionStorage.setItem('user', JSON.stringify(user));
          
                return true;
            }
        }
    }
   
    return false;
}


//loads all the users info when they log in 
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(sessionStorage.getItem('user'));
  
  if (currentUser) {
    document.querySelector('.welcome').textContent = `Welcome, ${currentUser.fullName || currentUser.name || 'User'}`;
    
    const inputs = document.querySelectorAll('.formGroup input');
    if (inputs[0]) {
      inputs[0].value = currentUser.fullName;
      inputs[0].disabled = true;
    }
    if (inputs[1]) {
      inputs[1].value = currentUser.userName || '';
      inputs[1].disabled = true;
    }
    
    document.querySelector('.displayName').textContent = currentUser.fullName ||  'User';
    
    const userTags = document.querySelectorAll('.userTag');
    if (userTags[1]) {
      userTags[1].textContent = `@${currentUser.userName || 'user'}`;
    }
  }
});

// Edit button functionality
document.getElementById('editBtn').addEventListener('click', function() {
  const inputs = document.querySelectorAll('.formGroup input');
  inputs.forEach(input => input.disabled = false);
});

// Save button functionality
document.getElementById('saveBtn').addEventListener('click', function() {
  const currentUser = JSON.parse(sessionStorage.getItem('user'));
  const inputs = document.querySelectorAll('.formGroup input');
  
  if (currentUser && inputs.length >= 2) {
    // Store old username for updating chatRooms
    const oldUserName = currentUser.userName;
    
    // Update user object with new values
    currentUser.fullName = inputs[0].value;
    currentUser.name = inputs[0].value;
    currentUser.username = inputs[1].value;
    currentUser.userName = inputs[1].value;
    
    // Update session storage
    sessionStorage.setItem('user', JSON.stringify(currentUser));
    
    // Update users array in local storage
    let users = JSON.parse(localStorage.getItem('Users')) || [];
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
    } else {
      users.push(currentUser);
    }
    
    localStorage.setItem('Users', JSON.stringify(users));
    
    //  Update username in ALL chat rooms where this user is a member
    let chatRooms = JSON.parse(localStorage.getItem('chatRooms')) || [];
    
    chatRooms = chatRooms.map(chatRoom => {
      // Update the user in the members array
      chatRoom.members = chatRoom.members.map(member => {
        if (member.id === currentUser.id) {
          return currentUser; // Replace with updated user object
        }
        return member;
      });
      
      // Also update any messages sent by this user
      if (chatRoom.messages) {
        chatRoom.messages = chatRoom.messages.map(message => {
          if (message.sender && message.sender.id === currentUser.id) {
            message.sender = currentUser; // Replace sender with updated user
          }
          return message;
        });
      }
      
      return chatRoom;
    });
    
    // Save updated chatRooms back to localStorage
    localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
    
    // Reload the page to reflect changes
    location.reload();
  }
});