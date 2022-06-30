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
    ingredient: ["meat", "dairy"],
    point: 0,
  },
  {
    name: "Margahrita Pizza",
    allergy: ["dairy", "fat", "vegan"],
    ingredient: ["sour", "dairy", "meat"],
    point: 0,
  },
  {
    name: "Seafood Pizza",
    allergy: ["dairy", "fat", "seafood", "vegan"],
    ingredient: ["salty", "dairy", "seafood"],
    point: 0,
  },
  {
    name: "Mushroom Pizza",
    allergy: ["dairy", "fat"],
    ingredient: ["mushroom", "dairy"],
    point: 0,
  },
  {
    name: "Salad",
    allergy: [],
    ingredient: ["lowfat"],
    point: 0,
  },
  {
    name: "Tiramisu",
    allergy: ["dairy", "fat"],
    ingredient: ["sweet", "dairy"],
    point: 0,
  },
];

function returnStep(inputData) {
  return Math.max.apply(
    0,
    arrayConversation
      .filter((object) =>
        object.pattern.find((element) => inputData.includes(element))
      )
      .map((object) => object.step)
  );
}

function giveResponse(step) {
  return arrayConversation[step]["response"][
    Math.floor(Math.random() * arrayConversation[step]["response"].length)
  ];
}

const arrayKeyword = [
  { dairy: ["dairy", "milk", "cream", "cheese"] },
  { seafood: ["seafood", "shrimp", "fish", "squid", "octopus", "crab"] },
  { meat: ["meat", "beef", "chicken", "pork"] },
  { sweet: ["sweet", "dessert", "sugar"] },
  { spicy: ["spicy", "hot", "chilli", "strong"] },
  { salty: ["savory", "salt"] },
  { sour: ["sour", "lemon"] },
  { lowfat: ["lowfat", "low-fat", "on diet", "i am fat"] },
  { vegan: ["vegan", "vegetarian"] },
  { mushroom: ["mushroom", "champignon"] },
];

const arrayGoodBad = [
  {
    tag: "bad",
    pattern: [
      "allergic",
      "allergy",
      "hate",
      "without",
      "don't",
      "dont",
      "vegan",
      "vegetarian",
      "on diet",
      "i am fat",
    ],
    step: 0,
  },
  {
    tag: "good",
    pattern: ["like", "love", "prefer", "favorite"],
    step: 1,
  },
];

const arrayDrink = [
  { menu: ["Carbonara Pasta"], drink: "white wine" },
  {
    menu: ["Margahrita Pizza", "Mushroom Pizza", "Seafood Pizza"],
    drink: "cola",
  },
  { menu: ["Salad", "Tiramisu"], drink: "water" },
];

function returnTag(inputData) {
  return Math.min.apply(
    null,
    arrayGoodBad
      .filter((object) =>
        object.pattern.find((element) => inputData.includes(element))
      )
      .map((object) => object.step)
  );
}

function findDrink(dish) {
  for (let i = 0; i < arrayDrink.length; i++) {
    let a = arrayDrink[i].menu;
    for (let j = 0; j < a.length; j++) {
      if (dish === a[j]) {
        return arrayDrink[i].drink;
      }
    }
  }
}

function createUserReq(tag, array, inputdata, result, keyresult) {
  if (tag == "bad") {
    appendKeyword(array, inputdata, result, keyresult.allergy);
  } else if (tag == "good") {
    appendKeyword(array, inputdata, result, keyresult.ingredient);
  }
}

function appendKeyword(array, inputdata, result, keyresult) {
  for (let i = 0; i < array.length; i++) {
    let a = Object.values(array[i]);
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

let count = 0;
let phase = 0;
let finalList;
let i = 0;
let index = 0;
let userReq = [];
let keyReq = { allergy: [], ingredient: [] };
let running = true;
let selectedDish;
let drink;

const callingBot = (inputClass, outputID) => {
  let inputString = document.querySelector(inputClass).value;
  userInput = inputString.toLowerCase();
  document.querySelector(
    outputID
  ).innerHTML += `<br> You said: ${inputString} <br>`;
  try {
    //phase 1 - chit chat
    if (phase <= 1) {
      botResponse = giveResponse(returnStep(userInput));
      phase = 1;
      count = count + 1;
      // console.log(returnStep(userInput));
      if (count > 3) {
        botResponse =
          botResponse +
          "<br> Do you have any food preference ? (Vegetarian? Vegan? On-diet?)";
        phase = 2;
      }
    }
    //phase 2,3,4 - requirements gathering(allergy - like/dislike)
    else if (phase === 2) {
      let tag1 = arrayGoodBad[returnTag(userInput)].tag;
      createUserReq(tag1, arrayKeyword, userInput, userReq, keyReq);
      botResponse = `OK I will keep that in my mind. <br> Do you have any allergy ?`;
      phase += 1;
    } else if (phase === 3) {
      createUserReq("bad", arrayKeyword, userInput, userReq, keyReq);
      switch (userInput.includes("yes") && keyReq.allergy == "") {
        case true:
          botResponse = `Oh! what are you allergic to?`;
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
    }
    //phase 5 - start recommend food
    else if (phase === 5) {
      createUserReq("good", arrayKeyword, userInput, userReq, keyReq);
      finalList = recommendMenu(arrayMenu, keyReq);
      console.log(finalList);
      botResponse = `Okay..I am ready to recommend you the food. <br> I recommend you to eat ${finalList[i].name}. Do you want this dish ?`;
      phase += 1;
    } else if (phase === 6) {
      if (
        userInput.includes("yes") ||
        userInput.includes("ok") ||
        userInput.includes("please")
      ) {
        selectedDish = finalList[i].name;
        drink = findDrink(selectedDish);
        botResponse = `Enjoy your ${selectedDish}. <br> Would you like to add ${drink} as a drink for your meal ?`;
        console.log(selectedDish);
        phase += 1;
      } else if (i + 1 < finalList.length) {
        i++;
        botResponse = `Then.. I recommend you to eat ${finalList[i].name}. Do you want this dish ?`;
      } else {
        botResponse = `You are so picky. You don't get to eat`;
      }
    } else if (phase === 7) {
      switch (
        userInput.includes("yes") ||
        userInput.includes("ok") ||
        userInput.includes("please")
      ) {
        case true:
          botResponse = `Then Enjoy your ${selectedDish} with ${drink}. See you!`;
          console.log(selectedDish, drink);
          phase += 1;
          break;
        default:
          botResponse = `Then Enjoy your ${selectedDish} without drink. See you!`;
          break;
      }
    }
    console.log(`Phase : ${phase}`);
    console.log(keyReq);
    document.querySelector(
      outputID
    ).innerHTML += `<br> BOT said: ${botResponse} <br>`;
  } catch (e) {
    console.log(e);
    if (e instanceof TypeError) {
      if (botResponse === undefined && phase === 0) {
        document.querySelector(
          outputID
        ).innerHTML += `<br>BOT said: Hello Welcome to the Chatbot project..<br> Type something like 'HI' so we can start the process<br>`;
      } else if (botResponse === undefined) {
        document.querySelector(
          outputID
        ).innerHTML += `<br> BOT said: I DO NOT UNDERSTAND YOU. <br>I AM CONFUSED<br>`;
      } else {
        document.querySelector(
          outputID
        ).innerHTML += `<br> BOT said: I DO NOT UNDERSTAND YOU. <br>I SAID ${botResponse} <br>`;
      }
    }
  }
  //empty the input field
  document.querySelector(inputClass).value = "";
};

//if user not reply in 30s repeat the previous response
let lastMove = Date.now();
const checkLastMove = (outputID) => {
  if (Date.now() - lastMove > 3000) {
    if (phase === 0) {
      document.querySelector(
        outputID
      ).innerHTML += `<br>BOT said: Hello Welcome to the Chatbot project..<br> Type something like 'HI' so we can start the process<br>`;
    } else {
      document.querySelector(
        outputID
      ).innerHTML += `<br> BOT said: I SAID ${botResponse} last 30 second and you did not respond. <br> Please answer me.<br>`;
    }
    lastMove = Date.now();
  }
};

//when user cilck send button -> call bot to answer
submitButton.addEventListener("click", (button) => {
  callingBot(".textInput", "#bodytext");
});

//if user not reply in 30s repeat the previous response
document.addEventListener("mousemove", function () {
  checkLastMove("#bodytext");
});
