// import readline module
const readline = require("readline");

// create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userInput;
let resultReq = [];
let requestKey = [];
let a = "";
let b = "";

// question user to enter user input
rl.question("Welcome!\n", function (string) {
  userInput = string.toLowerCase();
  for (let i = 0; i < arrayKeyword.length; i++) {
    a = Object.values(arrayKeyword[i]);
    for (let j = 0; j < a.length; j++) {
      b = Object.values(a[j]);
      for (let k = 0; k < b.length; k++) {
        if (userInput.includes(b[k])) {
          resultReq.push(b[k]);
          if (!requestKey.includes(b[0])) {
            requestKey.push(b[0]);
          }
        }
      }
    }
  }

  console.log(`Input Data: ${string}`);
  console.log(`result : ${resultReq} \nkeys: ${requestKey}`);
  rl.close();
});

const arrayKeyword = [
  { dairy: ["dairy", "milk", "cream", "cheese"] },
  { seafood: ["seafood", "shrimp", "fish", "squid", "crab"] },
  { sweet: ["sweet", "dessert", "sugar"] },
  { spicy: ["spicy", "hot", "chilli", "strong"] },
  { lowfat: ["lowfat", "low-fat", "on diet", "i am fat"] },
  { vegan: ["vegan", "vegetarian"] },
];
//const inputData = "I am a VEgAN and I am FaT";
//let userInput = inputData.toLowerCase();

// for (let i = 0; i < arrayKeyword.length; i++) {
//   a = Object.values(arrayKeyword[i]);
//   for (let j = 0; j < a.length; j++) {
//     b = Object.values(a[j]);
//     for (let k = 0; k < b.length; k++) {
//       if (userInput.includes(b[k])) {
//         resultReq.push(b[k]);
//         if (!requestKey.includes(b[0])) {
//           requestKey.push(b[0]);
//         }
//       }
//     }
//   }
// }

// console.log(`Input Data: ${inputData}`);
// console.log(`result : ${resultReq} \nkeys: ${requestKey}`);

// const mk = arrayKeyword.filter((object) => {
//   Object.values(object).filter((element) => {
//     Object.values(element).filter((subelement) => {
//       if (inputData.includes(subelement)) {
//         resultReq.push(Object.keys(object));
//       }
//     });
//   });
// });

// const xk = arrayKeyword.filter((object) =>
//   Object.values(object).filter((element) => {
//     Object.values(element).filter((subelement) => {
//       if (inputData.includes(subelement)) {
//         return true;
//       }
//     });
//   })
// );

// for (let i = 0; i < arrayKeyword.length; i++) {
//   for (let j = 0; j < Object.values(arrayKeyword[i]).length; j++) {
//     result.push(
//       Object.values(Object.values(arrayKeyword[i])[j]).filter((subelement) =>
//         inputData.includes(subelement)
//       )
//     );
//   }
// }

// console.log(`result : ${resultReq} xk: ${xk}`);

// let currentReq = "";
// currentReq = arrayKeyword.filter((element) =>
//   inputData.includes(Object.values(element))
// );
// console.log(currentReq);

// function findReq(arrayNot, arrayYes, arrayKeyword, inputData) {
//   currentReq = arrayKeyword.filter((element) => inputData.includes(element));

//   if (inputData.includes(arrayNot)) {
//     curentReq = arrayNot.userRequirement.push();
//   }
//   return array
//     .filter((object) =>
//       object.pattern.find((element) => inputData.includes(element))
//     )
//     .map((object) => object.step);
// }
