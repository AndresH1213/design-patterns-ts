class Participant {
  public chatLog: string[];
  public room: ChatRoom;
  constructor(public name: string) {
    this.chatLog = [];
  }

  receive(sender: string, message: string) {
    let s = `${sender}: '${message}'`;
    this.chatLog.push(s);
    console.log(`[${this.name}'s chat session] ${s}`);
  }

  say(message: string) {
    this.room.broadcast(this.name, message);
  }

  pm(who: string, message: string) {
    this.room.message(this.name, who, message);
  }
}

class ChatRoom {
  people: Participant[];
  constructor() {
    this.people = [];
  }

  join(p: Participant) {
    let joinMsg = `${p.name} joins the chat`;
    this.broadcast('room', joinMsg);
    p.room = this;
    this.people.push(p);
  }

  broadcast(source: string, message: string) {
    for (let p of this.people) {
      if (p.name !== source) {
        p.receive(source, message);
      }
    }
  }

  message(source: string, destination: string, message: string) {
    for (let p of this.people) {
      if (p.name === destination) {
        p.receive(source, message);
      }
    }
  }
}

let room = new ChatRoom();
let johny = new Participant('Johny');
let janes = new Participant('Janes');

room.join(johny);
room.join(janes);

johny.say('hi room');
janes.say('oh, hey johny');

let simon = new Participant('Simon');
room.join(simon);
simon.say('hi everyone!');

janes.pm('Simon', 'glad you could join us!');
