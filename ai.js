let userInput;
let botResponse;

// Gets data from json file //
const jsonRoot = JSON.parse(require("fs").readFileSync("aidata.json"));
const arrayConversation = jsonRoot["arrayConversation"];
const arrayMenu = jsonRoot["arrayMenu"];
const arrayKeyword = jsonRoot["arrayKeyword"];
const arrayGoodBad = jsonRoot["arrayGoodBad"];
const arrayDrink = jsonRoot["arrayDrink"];

function init() {
  phase = 1;
  i = 0;
  botResponse = "";
}

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

const isNegative = (str) => {
  return (
    str.includes("no") ||
    str.includes("nah") ||
    str.includes("nope") ||
    str.includes("don't") ||
    str.includes("do not") ||
    str.includes("dont")
  );
};

const isAffirmative = (str) => {
  return (
    str.includes("ok") ||
    str.includes("yes") ||
    str.includes("yea") ||
    str.includes("yeah") ||
    str.includes("sure") ||
    str.includes("please")
  );
};

let phase = 1;
let finalList;
let i = 0;
let userReq = [];
let keyReq = { allergy: [], ingredient: [] };
let selectedDish;
let drink;

// Main communication method //
const callingBot = (rawInput) => {
  if (phase === -1) return -1;

  userInput = rawInput.toLowerCase();

  try {
    //phase 1 - chit chat
    if (phase === 1) {
      if (userInput.includes("order")) {
        botResponse =
          "Are you on a specific diet I should know of? (Vegetarian? Vegan? On-diet?)";
        phase = 2;
      } else {
        botResponse = giveResponse(returnStep(userInput));
      }
    }
    //phase 2,3,4 - requirements gathering(allergy - like/dislike)
    else if (phase === 2) {
      if (!isNegative(userInput)) {
        let tag1 = arrayGoodBad[returnTag(userInput)].tag;
        createUserReq(tag1, arrayKeyword, userInput, userReq, keyReq);
      }
      botResponse = `OK I will keep that in my mind. Do you have any allergies?`;
      phase += 1;
    } else if (phase === 3) {
      createUserReq("bad", arrayKeyword, userInput, userReq, keyReq);
      switch (isAffirmative(userInput) && keyReq.allergy == "") {
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
      botResponse = `Okay..you are allergic to ${keyReq.allergy}.  Do you have any favorite ingredients to eat?`;
      phase += 1;
    }
    //phase 5 - start recommend food
    else if (phase === 5) {
      createUserReq("good", arrayKeyword, userInput, userReq, keyReq);
      finalList = recommendMenu(arrayMenu, keyReq);
      console.log(finalList);
      botResponse = `Okay..I am ready to recommend you the food.  I recommend you to eat ${finalList[i].name}. Do you want this dish ?`;
      phase += 1;
    } else if (phase === 6) {
      if (isAffirmative(userInput)) {
        selectedDish = finalList[i].name;
        drink = findDrink(selectedDish);
        botResponse = `Enjoy your ${selectedDish}. Would you like to add ${drink} as a drink for your meal?`;
        console.log(selectedDish);
        phase += 1;
      } else if (isNegative(userInput)) {
        if (i + 1 < finalList.length) {
          i++;
          botResponse = `Then.. I recommend you to eat ${finalList[i].name}. Do you want this dish ?`;
        } else {
          botResponse = `You are so picky. You don't get to eat. Bye!`;
          phase = -1;
        }
      } else {
        botResponse = "I didn't quite get that. Can you type a more clear answer as in 'yes' or 'no'?";
      }
    }
	else if (phase === 7) {
		let menu = `${selectedDish} without any drinks`;
        if (isAffirmative(userInput)) {
			menu = `${selectedDish} with ${drink}`;
    	}
	  botResponse = `Thank you for choosing our restaurant! You order of ${menu} will be prepared and delivered soon. I would be thankfull if you can rate your experience with me out of 5.`;
	  phase++;
    }
	else if (phase === 8) {
		let num = parseInt(userInput);
		if (num >= 0 && num <= 5) {
			botResponse = `Thanks for the feedback!`;
			phase=-1;
		}
		else {
			botResponse = `Invalid rating, can you try again?`;
		}
	  }
    console.log(`Phase : ${phase}`);
    console.log(keyReq);
  } catch (e) {
    console.log(e);
    if (e instanceof TypeError) {
      if (botResponse === undefined && phase === 1) {
        return "You can type something like 'Hello' or 'I would like to order' so we can start our conversation";
      } else if (botResponse === undefined) {
        return "I didn't quite get that. Could you try to ask differently?";
      } else {
        return `I didn't quite get that. Could you try to ask differently?`;
      }
    }
  }
  console.log(botResponse);
  return botResponse;
};

module.exports = {
  callingBot: (input) => {
    return callingBot(input);
  },
  init: () => {
    return init();
  }
};
