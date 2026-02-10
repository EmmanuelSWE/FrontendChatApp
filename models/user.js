export class User {
  constructor(id, userName, profilePhoto) {
    this.id = id;                  // string
    this.userName = userName;      // string
    this.status = "offline";       // string
    this.profilePhoto = profilePhoto; // string
    this.currentSession = null;    // UserSession
  }

  static signUp() {
    // logic for signing up
  }

  static login() {
    // logic for logging in
  }

  logout() {
    // logic for logging out
  }

  sendMessage(chatRoom, body) {
    // sends message to a specific chat room
  }
}
