/* === start script === */
window.onload = function () {
  /* === variables === */

  const thaiFoodList = [
    {
      id: 1,
      title: "Fired Rice",
      img: "images/thai-food-webp/fried-rice.webp",
    },
    {
      id: 2,
      title: "Pad Thai",
      img: "images/thai-food-webp/pad-thai.webp",
    },
    {
      id: 3,
      title: "Som Tum",
      img: "images/thai-food-webp/som-tum.webp",
    },
    {
      id: 4,
      title: "Tom Yum Goong",
      img: "images/thai-food-webp/tom-yum-goong.webp",
    },
    {
      id: 5,
      title: "Khao Niew Ma Muang",
      img: "images/thai-food-webp/khao-niew-ma-muang.webp",
    },
    {
      id: 6,
      title: "Khao Mun Kai",
      img: "images/thai-food-webp/khao-mun-kai.webp",
    },
    {
      id: 7,
      title: "Green Curry",
      img: "images/thai-food-webp/green-curry.webp",
    },
    {
      id: 8,
      title: "Pad Kra Pow",
      img: "images/thai-food-webp/pad-kra-pow.webp",
    },
    {
      id: 9,
      title: "Tom Kha Kai",
      img: "images/thai-food-webp/tom-kha-kai.webp",
    },
    {
      id: 10,
      title: "Larb Moo",
      img: "images/thai-food-webp/larb-moo.webp",
    },
    {
      id: 11,
      title: "Khao Soi",
      img: "images/thai-food-webp/khao-soi.webp",
    },
    {
      id: 12,
      title: "Massaman Nuea",
      img: "images/thai-food-webp/massaman-nuea.webp",
    },
  ];

  const germanFoodList = [
    "Schnitzel",
    "Bratwurst",
    "Currywurst",
    "Pretzel",
    "Sauerkraut",
    "Mett",
    "Schweinshaxe",
    "Broetchein",
    "Kartoffelsalat",
  ];

  const restartButton = document.getElementById("restart");
  const modeButtons = document.querySelectorAll(".mode");
  const attemptBadge = document.getElementById("attempt");
  const numChoiceBox = 12;
  let attempt = 0;
  let foodList = thaiFoodList;
  let folderName = "/thai-food-webp/";
  let box;
  let wantedDish;

  // an array storing numbers from 0 to 11 (to indicate the index of foodList)
  let numbers = Array.from({ length: 12 }, (_, i) => i);

  init();

  /* === Methods === */

  function init() {
    shuffle(foodList);
    setImages(foodList);
    setMode();
    wantedDish = randomDish();
    // reset();
  }

  function countAttempt() {
    const countAttempt = document.getElementById("countAttempt");
    attempt++;
    countAttempt.innerText = attempt;
  }

  function setMode() {
    for (let i = 0; i < modeButtons.length; i++) {
      modeButtons[i].addEventListener("click", function () {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent === "Thai food") {
          foodList = thaiFoodList;
          folderName = "/thai-food-webp/";
        } else {
          foodList = germanFoodList;
          folderName = "/german-food-webp/";
        }
        reset();
      });
    }
  }

  restartButton.addEventListener("click", function () {
    reset();
  });

  function reset() {
    const countAttempt = document.getElementById("countAttempt");
    const imgParent = document.querySelectorAll(".img-parent");
    wantedDish = randomDish();
    shuffle(foodList);
    playSound("reset");
    for (let i = 0; i < numChoiceBox; i++) {
      imgParent[i].removeChild(imgParent[i].firstChild);
      imgParent[i].classList.remove("hide");
    }
    setImages(foodList, folderName);
    attempt = 0;
    countAttempt.innerText = 0;
  }

  function setImages(foodList, folderName) {
    // a loop for generating images
    for (let i = 0; i < numChoiceBox; i++) {
      box = document.querySelector(".box" + (i + 1));

      box.innerHTML = ""; // Remove old content completely

      const img = document.createElement("img");
      //img.src = "images" + folderName + foodList[i] + ".webp";
      img.src = thaiFoodList[i].img;
      img.alt = foodList[i].title;
      box.appendChild(img);
      box.classList.add("fx");

      // game logic assigned to each box

      box.addEventListener("click", function () {
        const img = this.querySelector("img");

        if (img.alt == wantedDish) {
          countAttempt();
          playSound("correct");
          flashAttemptColor("green");
          this.classList.add("fade", "hide");
          wantedDish = randomDish();
        } else {
          countAttempt();
          playSound("wrong");
          flashAttemptColor("red");
        }
      });
    }
  }

  // keyword: shuffle-without-repeat

  function randomDish() {
    if (numbers.length === 0) {
      // ❌ ไม่ reset
      console.log("All dishes have been selected already.");
      return "No more dishes!";
    }

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

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function playSound(inputSound) {
    var sound = new Audio("sounds/" + inputSound + ".mp3");
    sound.play();
  }

  function flashAttemptColor(Color) {
    attemptBadge.classList.add(Color);
    setTimeout(function () {
      attemptBadge.classList.remove(Color);
    }, 200);
  }
};
