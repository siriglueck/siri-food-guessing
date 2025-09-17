/* === start script === */
window.onload = function () {
  /* === variables === */

  const thaiFoodList = [
    {
      id: 0,
      title: "Khao Pad",
      img: "images/thai-food-webp/khao-pad.webp",
    },
    {
      id: 1,
      title: "Pad Thai",
      img: "images/thai-food-webp/pad-thai.webp",
    },
    {
      id: 2,
      title: "Som Tum",
      img: "images/thai-food-webp/som-tum.webp",
    },
    {
      id: 3,
      title: "Tom Yum Goong",
      img: "images/thai-food-webp/tom-yum-goong.webp",
    },
    {
      id: 4,
      title: "Khao Niew Ma Muang",
      img: "images/thai-food-webp/khao-niew-ma-muang.webp",
    },
    {
      id: 5,
      title: "Khao Mun Kai",
      img: "images/thai-food-webp/khao-mun-kai.webp",
    },
    {
      id: 6,
      title: "Green Curry",
      img: "images/thai-food-webp/green-curry.webp",
    },
    {
      id: 7,
      title: "Pad Kra Pow",
      img: "images/thai-food-webp/pad-kra-pow.webp",
    },
    {
      id: 8,
      title: "Tom Kha Kai",
      img: "images/thai-food-webp/tom-kha-kai.webp",
    },
    {
      id: 9,
      title: "Larb Moo",
      img: "images/thai-food-webp/larb-moo.webp",
    },
    {
      id: 10,
      title: "Khao Soi",
      img: "images/thai-food-webp/khao-soi.webp",
    },
    {
      id: 11,
      title: "Massaman Nuea",
      img: "images/thai-food-webp/massaman-nuea.webp",
    },
  ];

  const germanFoodList = [
    {
      id: 0,
      title: "Bratwurst",
      img: "images/german-food-webp/bratwurst.webp",
    },
    {
      id: 1,
      title: "Brötchen",
      img: "images/german-food-webp/broetchein.webp",
    },
    {
      id: 3,
      title: "Currywurst",
      img: "images/german-food-webp/currywurst.webp",
    },
    {
      id: 2,
      title: "Kartoffelpuffer",
      img: "images/german-food-webp/kartoffelpuffer.webp",
    },
    {
      id: 4,
      title: "Kartoffelsalat",
      img: "images/german-food-webp/kartoffelsalat.webp",
    },
    {
      id: 5,
      title: "Mett",
      img: "images/german-food-webp/mett.webp",
    },
    {
      id: 6,
      title: "Brezel",
      img: "images/german-food-webp/brezel.webp",
    },
    {
      id: 7,
      title: "Sauerkraut",
      img: "images/german-food-webp/sauerkraut.webp",
    },
    {
      id: 8,
      title: "Schnitzel",
      img: "images/german-food-webp/schnitzel.webp",
    },
    {
      id: 9,
      title: "Schweinshaxe",
      img: "images/german-food-webp/schweinshaxe.webp",
    },
    {
      id: 10,
      title: "Knödel",
      img: "images/german-food-webp/knoedel.webp",
    },
    {
      id: 11,
      title: "Apfelstrudel",
      img: "images/german-food-webp/apfelstrudel.webp",
    },
  ];
  const countAttemptElement = document.getElementById("countAttempt");
  const restartButton = document.getElementById("restartButton");
  const modeButtons = document.querySelectorAll(".mode");
  const attemptBadge = document.getElementById("attempt");
  const popup = document.getElementById("restart_popup");
  const numChoiceBox = 12;
  let attempt = 0;
  let foodList = thaiFoodList;
  let box;
  let wantedDish;

  // load all sounds at the beginning, reduce delay
  // browser loads .wav faster than .mp3
  const soundCorrect = new Audio("sounds/correct.wav");
  const soundWrong = new Audio("sounds/wrong.wav");
  const soundChangeMode = new Audio("sounds/mode.wav");
  const soundWin = new Audio("sounds/winner.wav");

  // an array storing numbers from 0 to 11 (to indicate the index of foodList)
  let numbers = Array.from({ length: 12 }, (_, i) => i);

  setMode();
  init();

  /* === Methods === */

  function init() {
    numbers = Array.from({ length: numChoiceBox }, (_, i) => i);
    attempt = 0;
    countAttemptElement.innerText = attempt;

    shuffle(foodList);
    setImages(foodList);
    wantedDish = randomDish();
  }

  function countAttempt() {
    ++attempt;
    countAttemptElement.innerText = attempt;
  }

  function setMode() {
    modeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove "selected" from all buttons
        modeButtons.forEach((btn) => btn.classList.remove("selected"));
        soundChangeMode.currentTime = 0;
        soundChangeMode.play();

        // Toggle "selected" on the clicked button
        this.classList.toggle("selected", true); // force add

        // Update food list based on button text
        foodList =
          this.textContent === "Thai food" ? thaiFoodList : germanFoodList;
        reset();
      });
    });
  }

  restartButton.addEventListener("click", reset);

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

  function setImages(foodList) {
    // a loop for generating images
    for (let i = 0; i < numChoiceBox; i++) {
      box = document.querySelector(".box" + (i + 1));

      box.innerHTML = ""; // Remove old content completely

      const img = document.createElement("img");
      //img.src = "images" + folderName + foodList[i] + ".webp";
      img.src = foodList[i].img;
      img.alt = foodList[i].title;
      box.appendChild(img);
      box.classList.add("fx");

      // game logic assigned to each box

      box.onclick = function () {
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

  // keyword: shuffle-without-repeat tabindex="-1"

  function randomDish() {
    if (numbers.length === 0) {
      popup.classList.remove("hide");
      soundWin.play();
    } else {
      const textDisplay = document.getElementById("text-display");

      // สุ่มตำแหน่งใน numbers
      const index = Math.floor(Math.random() * numbers.length);

      // ดึง index จริงของอาหาร
      const foodIndex = numbers[index];

      // ลบออกเพื่อกันซ้ำ
      numbers.splice(index, 1);

      // แสดงชื่อจานที่อยากกิน
      textDisplay.innerText = foodList[foodIndex].title;

      console.log("Selected dish:", foodList[foodIndex].title);
      console.log("Remaining numbers:", numbers);

      return foodList[foodIndex].title;
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // function playSound(inputSound) {
  //   var sound = new Audio("sounds/" + inputSound + ".mp3");
  //   sound.play();
  // }

  function flashAttemptColor(Color) {
    attemptBadge.classList.add(Color);
    setTimeout(function () {
      attemptBadge.classList.remove(Color);
    }, 200);
  }
};
