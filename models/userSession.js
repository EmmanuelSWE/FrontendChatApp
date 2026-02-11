class UserSession {
  constructor(sid, user) {
    this.sid = sid;              // string
    this.createdAt = new Date(); // date
    this.endedAt = null;         // date
    this.user = user;            // User object
  }

  startSession() {
    // set user status to online
  }

  endSession() {
    // set user status to offline
    this.endedAt = new Date();
  }

  get startTime() {
    return this.createdAt;
  }

  get endTime() {
    return this.endedAt || 0;
  }

  get getUser() {
    return this.user;
  }
}
