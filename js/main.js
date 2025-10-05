/* === start script === */
window.onload = function () {
  /* === variables === */

  const thaiFoodList = [
    {
      id: 0,
      title: "Khao Pad",
      imgPath: "images/thai-food-webp/khao-pad.webp",
    },
    {
      id: 1,
      title: "Pad Thai",
      imgPath: "images/thai-food-webp/pad-thai.webp",
    },
    {
      id: 2,
      title: "Som Tum",
      imgPath: "images/thai-food-webp/som-tum.webp",
    },
    {
      id: 3,
      title: "Tom Yum Goong",
      imgPath: "images/thai-food-webp/tom-yum-goong.webp",
    },
    {
      id: 4,
      title: "Khao Niew Ma Muang",
      imgPath: "images/thai-food-webp/khao-niew-ma-muang.webp",
    },
    {
      id: 5,
      title: "Khao Mun Kai",
      imgPath: "images/thai-food-webp/khao-mun-kai.webp",
    },
    {
      id: 6,
      title: "Green Curry",
      imgPath: "images/thai-food-webp/green-curry.webp",
    },
    {
      id: 7,
      title: "Pad Kra Pow",
      imgPath: "images/thai-food-webp/pad-kra-pow.webp",
    },
    {
      id: 8,
      title: "Tom Kha Kai",
      imgPath: "images/thai-food-webp/tom-kha-kai.webp",
    },
    {
      id: 9,
      title: "Larb Moo",
      imgPath: "images/thai-food-webp/larb-moo.webp",
    },
    {
      id: 10,
      title: "Khao Soi",
      imgPath: "images/thai-food-webp/khao-soi.webp",
    },
    {
      id: 11,
      title: "Massaman Nuea",
      imgPath: "images/thai-food-webp/massaman-nuea.webp",
    },
  ];

  const germanFoodList = [
    {
      id: 0,
      title: "Bratwurst",
      imgPath: "images/german-food-webp/bratwurst.webp",
    },
    {
      id: 1,
      title: "Brötchen",
      imgPath: "images/german-food-webp/broetchein.webp",
    },
    {
      id: 3,
      title: "Currywurst",
      imgPath: "images/german-food-webp/currywurst.webp",
    },
    {
      id: 2,
      title: "Kartoffelpuffer",
      imgPath: "images/german-food-webp/kartoffelpuffer.webp",
    },
    {
      id: 4,
      title: "Kartoffelsalat",
      imgPath: "images/german-food-webp/kartoffelsalat.webp",
    },
    {
      id: 5,
      title: "Mett",
      imgPath: "images/german-food-webp/mett.webp",
    },
    {
      id: 6,
      title: "Brezel",
      imgPath: "images/german-food-webp/brezel.webp",
    },
    {
      id: 7,
      title: "Sauerkraut",
      imgPath: "images/german-food-webp/sauerkraut.webp",
    },
    {
      id: 8,
      title: "Schnitzel",
      imgPath: "images/german-food-webp/schnitzel.webp",
    },
    {
      id: 9,
      title: "Schweinshaxe",
      imgPath: "images/german-food-webp/schweinshaxe.webp",
    },
    {
      id: 10,
      title: "Knödel",
      imgPath: "images/german-food-webp/knoedel.webp",
    },
    {
      id: 11,
      title: "Apfelstrudel",
      imgPath: "images/german-food-webp/apfelstrudel.webp",
    },
  ];

  const countAttemptElement = document.getElementById("countAttempt");
  const attemptBadge = document.getElementById("attempt");
  const restartButton = document.getElementById("restartButton");
  const modeButton = document.querySelectorAll(".mode");
  const popup = document.getElementById("restart_popup");
  const numChoiceBox = 12;
  let attempt = 0;
  let foodList = thaiFoodList;
  let imageContainer;
  let wantedDish;

  // load all sounds at the beginning, reduce delay once called
  const soundCorrect = new Audio("sounds/correct.mp3");
  const soundWrong = new Audio("sounds/wrong.mp3");
  const soundChangeMode = new Audio("sounds/mode.mp3");
  const soundWin = new Audio("sounds/winner.mp3");

  // an array storing numbers from 0 to 11 (to indicate the index of foodList)
  let arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  /* === game start === */
  setMode();
  init();

  /* === Methods === */

  function init() {
    arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    attempt = 0;
    countAttemptElement.innerText = attempt;

    shuffle(foodList);
    addImages(foodList);
    wantedDish = randomDish();
  }

  function countAttempt() {
    ++attempt;
    countAttemptElement.innerText = attempt;
  }

  function setMode() {
    modeButton.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove "selected" from every buttons
        modeButton.forEach((btn) => btn.classList.remove("selected"));

        // Real time - no echo
        soundChangeMode.currentTime = 0;
        soundChangeMode.play();

        // Toggle "selected" on the clicked button
        this.classList.toggle("selected", true); // true - force adding

        // Update food list based on button text
        foodList =
          this.textContent === "Thai food" ? thaiFoodList : germanFoodList;
        reset();
      });
    });
  }

  function reset() {
    const imgParent = document.querySelectorAll(".img-parent");
    for (let i = 0; i < numChoiceBox; i++) {
      imgParent[i].removeChild(imgParent[i].firstChild);
      imgParent[i].classList.remove("hide");

      const box = document.querySelector(".box" + (i + 1));
      if (box) {
        box.onclick = null;
        box.classList.remove("fade");
      }
    }
    popup.classList.add("hide");
    init();
  }

  restartButton.addEventListener("click", reset);

  function addImages(foodList) {
    // a loop for adding images
    for (let i = 0; i < numChoiceBox; i++) {
      imageContainer = document.querySelector(".box" + (i + 1));

      imageContainer.innerHTML = ""; // Remove old content completely

      const img = document.createElement("img");
      img.src = foodList[i].imgPath;
      img.alt = foodList[i].title;
      imageContainer.appendChild(img);
      imageContainer.classList.add("fx");

      // adding game logic to each container
      imageContainer.onclick = function () {
        const imgElement = this.querySelector("img");

        if (imgElement.alt === wantedDish) {
          countAttempt();
          soundCorrect.currentTime = 0;
          soundCorrect.play();
          flashAttemptColor("green");
          this.classList.add("fade", "hide");
          wantedDish = randomDish();
        } else {
          countAttempt();
          soundWrong.currentTime = 0;
          soundWrong.play();
          flashAttemptColor("red");
        }
      };
    }
  }

  function randomDish() {
    if (arrNumbers.length === 0) {
      popup.classList.remove("hide");
      soundWin.play();
    } else {
      const textDisplay = document.getElementById("text-display");
      // random one number within the remaining array length
      const index = Math.floor(Math.random() * arrNumbers.length);

      // point to array
      const foodIndex = arrNumbers[index];

      // remove one number (index position) in the array - so it is called only once
      arrNumbers.splice(index, 1);

      // display the name of the random dish
      textDisplay.innerText = foodList[foodIndex].title;

      // for debugging
      // console.log("Selected dish:", foodList[foodIndex].title);
      // console.log("Remaining numbers:", arrNumbers);

      return foodList[foodIndex].title;
    }
  }

  // keyword: shuffle-without-repeat tabindex="-1"
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // ES6 switching
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function flashAttemptColor(color) {
    attemptBadge.classList.add(color);
    setTimeout(() => {
      attemptBadge.classList.remove(color);
    }, 200);
  }
};
