let userReq = {
  allergy: [],
  flavor: ["cheesy", "spicy"],
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

//filter menus with user allergy out
const filterAllergy = arrayMenu.filter(
  (object) =>
    !userReq.allergy.some((element) => object.allergy.includes(element))
);
//console.log(filterAllergy);

//give points to menu that have user favorite flavor
const favFlavor = filterAllergy.map((object) => {
  if (userReq.flavor.some((element) => object.flavor.includes(element))) {
    object.point += 1;
  }
});

//give points to menu that have user favorite ingredients
const favIngredient = filterAllergy.map((object) => {
  if (
    userReq.ingredient.some((element) => object.ingredient.includes(element))
  ) {
    object.point += 1;
  }
});

//show all menus with points
console.log(filterAllergy);

//sorted by foody points
const finalList = filterAllergy.sort((a, b) => b.point - a.point);
console.log(finalList);

//recommed food with the highest point first
//need to add yes or no logic for users
//if user selects no - recommend next dish
console.log(`\nUser Requirement : \n`, userReq);
if (finalList == "") {
  console.log("YOU DONT GET TO EAT");
} else {
  finalList.forEach((object) =>
    console.log(`BOT RECOMMEND YOU TO EAT : ${object["name"]} \n`)
  );
}

// REAL FOODMENU
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
