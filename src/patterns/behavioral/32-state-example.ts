import readline from 'readline';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

enum State_ {
  offHook = 'off hook',
  connecting = 'conecting',
  connected = 'connected',
  onHold = 'on hold',
  onHook = 'on hook',
}

enum Trigger {
  callDialed = 'dial a number',
  hungUp = 'hang up',
  callConnected = 'call is connected',
  placedOnHold = 'placed on hold',
  takenOffHold = 'taken off hold',
  leftMessage = 'leave a message',
}

let rules = {};
rules[State_.offHook] = [
  {
    trigger: Trigger.callDialed,
    state: State_.connecting,
  },
];
rules[State_.connecting] = [
  {
    trigger: Trigger.hungUp,
    state: State_.onHook,
  },
  {
    trigger: Trigger.callConnected,
    state: State_.connected,
  },
];
rules[State_.connected] = [
  {
    trigger: Trigger.leftMessage,
    state: State_.onHook,
  },
  {
    trigger: Trigger.hungUp,
    state: State_.onHook,
  },
  {
    trigger: Trigger.placedOnHold,
    state: State_.onHold,
  },
];
rules[State_.onHold] = [
  {
    trigger: Trigger.takenOffHold,
    state: State_.connected,
  },
  {
    trigger: Trigger.hungUp,
    state: State_.onHook,
  },
];

let state = State_.offHook;
let exitState = State_.onHook;

let getInput = function () {
  let prompt = [`The phone is currently in ${state}`, `What's next:`];

  for (let i = 0; i < rules[state].length; i++) {
    let t = rules[state][i].trigger;
    prompt.push(`${i}. ${t}`);
  }
  prompt.push('');
  rl.question(prompt.join('\n'), function (answer) {
    let input = parseInt(answer);
    state = rules[state][input].state;

    if (state !== exitState) {
      getInput();
    } else {
      console.log('We are done using the phone.');
      rl.close();
    }
  });
};

getInput();
