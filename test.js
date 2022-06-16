console.log("HELLO THERE");

const array2 = [
  {
    pattern: [18, 35, 22, 24, 20, "apple"],
    step: 1,
  },
  {
    pattern: [108, 40, 50, 360, 520, "cool"],
    step: 2,
  },
];

for (let i = 0; i < array2.length; i++) {
  console.log(array2[i].pattern.find((element) => element > 20));
}

array2.forEach((jectob) =>
  console.log(jectob.pattern.find((element) => element > 20))
);
const x = "I have an apple and a pen";

function returnStep(array, inputData) {
  return array
    .filter((object) =>
      object.pattern.find((element) => inputData.includes(element))
    )
    .map((object) => object.step);
}

console.log(returnStep(array2, x));
