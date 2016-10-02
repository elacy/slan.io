/// <reference path="../messaging/message.ts" />
class UsernameChange extends Message {
  newName: string;
  oldName: string

  constructor(newName: string, oldName?: string){
    super();

    this.oldName = oldName;
    this.newName = newName;
  }
}
