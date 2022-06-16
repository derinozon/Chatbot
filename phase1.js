// import readline module
const readline = require("readline");

// create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const arrayConversation = [
  {
    tag: "greeting",
    pattern: [
      "hi",
      "hello",
      "good day",
      "greeting",
      "good morning",
      "good afternoon",
      "what's up",
    ],
    response: [
      "HELLO",
      "GREETINGS FROM BOT",
      "GOOD DAY",
      "GUTEN TAG",
      "GREETINGS",
      "WELCOME",
      "YO",
      "WHAT IS UP",
    ],
    step: 0,
  },
  {
    tag: "intro",
    pattern: ["name", "who", "what", "When", "where", "why"],
    response: ["ALEXA", "CHATBOT", "NICE!", "BOTTY", "COOL", "ROBOT", "SIRI"],
    step: 1,
  },
  {
    tag: "small talk",
    pattern: ["how do you do", "how are you", "wie geht's", "wie geht"],
    response: [
      "I AM GOOD!",
      "I DON'T HAVE FEELING",
      "I LIKE TODAY, BECAUSE I GET TO TALK TO YOU",
    ],
    step: 2,
  },
  {
    tag: "stop",
    pattern: ["stop"],
    response: ["OK", "BYE"],
    step: 3,
  },
];

function returnStep(array, inputData) {
  return array
    .filter((object) =>
      object.pattern.find((element) => inputData.includes(element))
    )
    .map((object) => object.step);
}
function giveResponse(array, step) {
  return array[step]["response"][
    Math.floor(Math.random() * array[step]["response"].length)
  ];
}

function noReply(array, step) {
  if (step < 2) {
    return giveResponse(array, step + 1);
  } else {
    return giveResponse(array, step);
  }
}

let stepRecord = 1;

// create empty user input
let answer = "";
let reply = "";

// question user to enter name
rl.question("Welcome!\n", function (string) {
  if (string !== "1234") {
    answer = string.toLowerCase();
    console.log(`You : ${answer}`);
    stepRecord = Math.max.apply(
      null,
      Object.values(returnStep(arrayConversation, answer))
    );
    reply = giveResponse(arrayConversation, stepRecord);
    console.log(`BOT would like to say: ${reply}`);
  } else {
    reply = noReply(arrayConversation, stepRecord);
    console.log(`BOT would like to say: ${reply}`);
  }
  // close input stream
  rl.close();
});
