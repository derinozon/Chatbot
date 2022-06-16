// import readline module
const readline = require("readline");

// create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const arrayMenu = [
//   {
//     name: "Carbonara Pasta",
//     allergy: ["dairy", "fat", "vegan"],
//     flavor: ["cheesy"],
//     ingredient: ["dairy"],
//   },
//   {
//     name: "Margahrita Pizza",
//     allergy: ["dairy", "fat", "vegan"],
//     flavor: ["sour"],
//     ingredient: ["dairy"],
//   },
//   {
//     name: "Seafood Pizza",
//     allergy: ["dairy", "fat", "seafood", "vegan"],
//     flavor: ["cheesy"],
//     ingredient: ["dairy", "seafood"],
//   },
//   {
//     name: "Mushroom Pizza",
//     allergy: ["dairy", "fat"],
//     flavor: ["cheesy"],
//     ingredient: ["dairy"],
//   },
//   {
//     name: "Salad",
//     allergy: [],
//     flavor: ["cheesy"],
//     ingredient: [""],
//   },
//   {
//     name: "Tiramisu",
//     allergy: ["dairy", "fat"],
//     flavor: ["sweet"],
//     ingredient: ["dairy"],
//   },
// ];

let userReq = {
  allergy: [],
  flavor: ["cheesy", "sweet", "spicy"],
  ingredient: ["meat"],
};

const arrayMenu = [
  {
    name: "Dairy Cheesy Meat",
    allergy: ["dairy", "vegan"],
    flavor: ["cheesy"],
    ingredient: ["meat"],
    point: 0,
  },
  {
    name: "Seafood sweet seafood",
    allergy: ["seafood"],
    flavor: ["sweet"],
    ingredient: ["meat"],
    point: 0,
  },
  {
    name: "Vegan and spicy vegan can eat",
    allergy: [],
    flavor: ["spicy"],
    ingredient: ["veg"],
    point: 0,
  },
];

//console.log(`User is allergic to : ${userReq.allergy}`);

const filterAllergy = arrayMenu.filter(
  (object) =>
    !userReq.allergy.some((element) => object.allergy.includes(element))
);

console.log(filterAllergy);
const favFlavor = filterAllergy.map((object) => {
  if (userReq.flavor.some((element) => object.flavor.includes(element))) {
    object.point += 1;
  }
});

const favIngredient = filterAllergy.map((object) => {
  if (
    userReq.ingredient.some((element) => object.ingredient.includes(element))
  ) {
    object.point += 1;
  }
});

// filterAllergy.forEach((object) => {
//   if (userReq.flavor.includes(object.flavor)) {
//     object.point += 1;
//   }
// });
// console.log(filterAllergy);

// filterAllergy.forEach((object) => {
//   if (userReq.ingredient.includes(object.ingredient)) {
//     object.point += 1;
//   }
// });

//console.log(favFlavor);
console.log(filterAllergy);

// const filterIngredient = filterFlavor.filter((object) =>
//   userReq.ingredient.some((element) => object.ingredient.includes(element))
// );

// console.log(`\nUser Requirement : \n`, userReq);
// if (filterIngredient == "") {
//   console.log("YOU DONT GET TO EAT");
// } else {
//   console.log(filterIngredient);
// }
