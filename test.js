const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const submitButton = document.querySelector(".submitbutton");
let userInput;
let botResponse;

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
      "guten tag",
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
    pattern: ["name", "who", "intro"],
    response: [
      "MY NAME IS CHATBOT",
      "I AM MADE FOR INTERNET TECHNOLOGY PROJECT",
    ],
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
    tag: "history",
    pattern: ["history", "origin", "fun fact", "pizza"],
    response: [
      "Pizza has a long history. Flatbreads with toppings were consumed by the ancient Egyptians, Romans and Greeks.",
      "TRY GOOGLE IT.",
      "Everyone loves PIZZA",
    ],
    step: 3,
  },
];

const arrayMenu = [
  {
    name: "Carbonara Pasta",
    allergy: ["dairy", "fat", "vegan"],
    ingredient: ["cheesy", "dairy"],
    point: 0,
  },
  {
    name: "Margahrita Pizza",
    allergy: ["dairy", "fat", "vegan"],
    ingredient: ["sour", "dairy"],
    point: 0,
  },
  {
    name: "Seafood Pizza",
    allergy: ["dairy", "fat", "seafood", "vegan"],
    ingredient: ["cheesy", "dairy", "seafood"],
    point: 0,
  },
  {
    name: "Mushroom Pizza",
    allergy: ["dairy", "fat"],
    ingredient: ["cheesy", "dairy"],
    point: 0,
  },
  {
    name: "Salad",
    allergy: [],
    ingredient: ["cheesy"],
    point: 0,
  },
  {
    name: "Tiramisu",
    allergy: ["dairy", "fat"],
    ingredient: ["sweet", "dairy"],
    point: 0,
  },
];

function returnStep(array, inputData) {
  return Math.max.apply(
    0,
    array
      .filter((object) =>
        object.pattern.find((element) => inputData.includes(element))
      )
      .map((object) => object.step)
  );
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

const arrayKeyword = [
  { dairy: ["dairy", "milk", "cream", "cheese"] },
  { seafood: ["seafood", "shrimp", "fish", "squid", "octopus", "crab"] },
  { meat: ["pork", "beef", "chicken", "meat"] },
  { sweet: ["sweet", "dessert", "sugar"] },
  { spicy: ["spicy", "hot", "chilli", "strong"] },
  { salty: ["savory", "salt"] },
  { sour: ["sour", "lemon"] },
  { lowfat: ["lowfat", "low-fat", "on diet", "i am fat"] },
  { vegan: ["vegan", "vegetarian"] },
];

const arrayGoodBad = [
  {
    tag: "bad",
    pattern: ["allergic", "allergy", "hate", "without", "don't"],
    step: 0,
  },
  {
    tag: "good",
    pattern: ["like", "love", "prefer", "favorite"],
    step: 1,
  },
];

function returnTag(arrayGoodBad, inputData) {
  return Math.min.apply(
    null,
    arrayGoodBad
      .filter((object) =>
        object.pattern.find((element) => inputData.includes(element))
      )
      .map((object) => object.step)
  );
}

function createUserReq(tag, keywordarray, inputdata, result, keyresult) {
  if (tag == "bad") {
    appendKeyword(keywordarray, inputdata, result, keyresult.allergy);
  } else if (tag == "good") {
    appendKeyword(keywordarray, inputdata, result, keyresult.ingredient);
  }
}

function appendKeyword(keywordarray, inputdata, result, keyresult) {
  for (let i = 0; i < keywordarray.length; i++) {
    let a = Object.values(keywordarray[i]);
    for (let j = 0; j < a.length; j++) {
      let b = Object.values(a[j]);
      for (let k = 0; k < b.length; k++) {
        if (inputdata.includes(b[k])) {
          result.push(b[k]);
          if (!keyresult.includes(b[0])) {
            keyresult.push(b[0]);
          }
        }
      }
    }
  }
}

const recommendMenu = (array, inputReq) => {
  //filter menus with user allergy out

  const filterAllergy = array.filter(
    (object) =>
      !inputReq.allergy.some((element) => object.allergy.includes(element))
  );

  for (let i = 0; i < filterAllergy.length; i++) {
    let a = filterAllergy[i]["ingredient"];
    for (let j = 0; j < a.length; j++) {
      if (inputReq["ingredient"].includes(a[j])) {
        filterAllergy[i].point += 1;
      }
    }
  }

  //sorted by foody points
  const finalList = filterAllergy.sort((a, b) => b.point - a.point);
  return finalList;
};

const waitingForResponse = async () => {
  await delay(3000);
  console.log("Waited 30s");
  document.getElementById("btn").click();
};

let count = 0;
let phase = 0;
let finalList;
let i = 0;
let userReq = [];
let keyReq = { allergy: [], flavor: [], ingredient: [] };
let running = true;

submitButton.addEventListener("click", (button) => {
  let inputString = document.querySelector(".textInput").value;
  userInput = inputString.toLowerCase();
  document.querySelector(
    "#valueInput"
  ).innerHTML += `<br> You said: ${inputString} <br>`;
  try {
    if (phase <= 1) {
      botResponse = giveResponse(
        arrayConversation,
        returnStep(arrayConversation, userInput)
      );
      phase = 1;
      count = count + 1;
      console.log(returnStep(arrayConversation, userInput));
      if (count > 1) {
        botResponse = botResponse + "<br> Do you have any food preference?";
        count = 0;
        phase = 2;
      }
    } else if (phase === 2) {
      let tag1 = arrayGoodBad[returnTag(arrayGoodBad, userInput)].tag;
      console.log(tag1);
      createUserReq(tag1, arrayKeyword, userInput, userReq, keyReq);
      botResponse = `OK so food with ${userReq} is ${tag1} for you. <br> Do you have any allergy`;
      phase += 1;
    } else if (phase === 3) {
      switch (userInput.includes("yes")) {
        case true:
          botResponse = `Oh what are you allergic to?`;
          phase += 1;
          break;
        default:
          botResponse = `Do you have any favorite ingredients to eat?`;
          phase += 2;
          break;
      }
    } else if (phase === 4) {
      createUserReq("bad", arrayKeyword, userInput, userReq, keyReq);
      botResponse = `Okay..you are allergic to ${keyReq.allergy}. <br> Do you have any favorite ingredients to eat?`;
      phase += 1;
    } else if (phase === 5) {
      createUserReq("good", arrayKeyword, userInput, userReq, keyReq);
      finalList = recommendMenu(arrayMenu, keyReq);
      console.log(keyReq);
      console.log(finalList);
      botResponse = `Okay..I am ready to recommend you the food. <br> I recommend you to eat ${finalList[i].name}. Do you want this`;
      phase += 1;
    } else if (phase === 6) {
      switch (userInput.includes("yes") || userInput.includes("ok")) {
        case true:
          botResponse = `Enjoy your ${finalList[i].name}.`;
          phase += 1;
          break;
        default:
          i++;
          botResponse = `Then.. I recommend you to eat ${finalList[i].name}. Do you want this`;
          break;
      }
    }
    document.querySelector(
      "#valueInput"
    ).innerHTML += `<br> BOT said: ${botResponse} <br>`;
  } catch (e) {
    console.log(e);
    if (e instanceof TypeError) {
      if (botResponse === undefined && phase === 0) {
        document.querySelector(
          "#valueInput"
        ).innerHTML += `<br>BOT said: Hello Welcome to the Chatbot project..<br> Type something so we can start the process<br>`;
      } else if (botResponse === undefined) {
        document.querySelector(
          "#valueInput"
        ).innerHTML += `<br> BOT said: I DO NOT UNDERSTAND YOU. <br>I AM CONFUSED<br>`;
      } else {
        document.querySelector(
          "#valueInput"
        ).innerHTML += `<br> BOT said: I DO NOT UNDERSTAND YOU. <br>I SAID ${botResponse} <br>`;
      }
    }
  }

  document.querySelector(".textInput").value = "";
});

let lastMove = Date.now();
document.addEventListener("mousemove", function () {
  if (Date.now() - lastMove > 30000) {
    if (phase === 0) {
      document.querySelector(
        "#valueInput"
      ).innerHTML += `<br>BOT said: Hello Welcome to the Chatbot project..<br> Type something so we can start the process<br>`;
    } else {
      document.querySelector(
        "#valueInput"
      ).innerHTML += `<br> BOT said: I SAID ${botResponse} last 30 second and you did not respond. <br> Please answer me.<br>`;
    }
    lastMove = Date.now();
  }
});
