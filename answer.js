const array1 = [
  {
    tag: "greeting",
    pattern: [
      "hi",
      "hello",
      "good day",
      "greeting",
      "good morning",
      "good afternoon",
      "yo",
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
];

// function filterIt(arr, searchKey) {
//   return arr.filter((obj) =>
//     Object.keys(obj).some((key) => obj[key].includes(searchKey))
//   );
// }

// console.log(filterIt(array1, "hi"));

const array2 = [
  {
    tag: "greeting",
    pattern: [18, 35, 22, 24, 20],
    response: "HELLO",
    step: 1,
  },
  { tag: "intro", pattern: "name", response: "ALEXA", step: 2 },
];

const array3 = [18, 35, 22, 24, 20];

const inputData = "hi there";

array2.forEach((element) => console.log(element.pattern));

console.log(array2.forEach(object)=>);

function checkVal(val) {
  return val > 20;
}

function returnStep(array, searchKey) {
  const searchKeyword = array.find((arr) => arr.pattern.includes(searchKey));
  return searchKeyword.step;
}

console.log(returnStep(array1, "hi"));
//console.log(array1[0].pattern);
array1.forEach((obj) => {
  console.log(obj.step);
});

const mapP = array1.map((arr) => {
  return arr.step;
});
console.log("map : ", mapP);

// function returnStep(array, searchKey) {
//   const filterIT2 = array
//     .filter((arr) => {
//       return searchKey.includes(arr.pattern);
//     })
//     .map((arr) => {
//       return arr.response;
//     });

//   return filterIT2;
// }

function getResponse(array, step) {
  console.log(
    array[step - 1].response[
      Math.floor(Math.random() * array[step - 1].response.length)
    ]
  );
}

// let inputWord = "hi";
// getResponse(array1, returnStep(array1, inputWord));

function filterIt2(array, searchKey) {
  const filterIT2 = array
    .filter((arr) => {
      return searchKey.includes(arr.pattern);
    })
    .map((arr) => {
      return arr.response;
    });
  console.log(filterIT2);
}

//console.log(filterIT2);
//console.log(filterIt2(array2, "hi"));
//filterIt2(array2, "terhi gggfdrfdg");

/* for Each
arrays.forEach(function(array){
    console.log(array.attribute);
});

map 
const mapAttribute = arrays.map(function(array){
    return array.attribute;
});
console.log(printAttribute);

filter 
const filterAttribute = arrays.filter(function(array){
    return array.attribute === neededValue;
});
console.log(filterAttribute);

filter and map
const filtermapAttribute = arrays.filter(function(array){
    return array.attribute1 === neededValue;
}).map(function(array){return array.attribute2;});
console.log(filtermapAttribute);

*/
