/* === start script === */
window.onload = function () {
  /* === variables === */
  const thaiFoodList = [
    "Som-Tum",
    "Tom-Kha-Kai",
    "Khao-Niew-Ma-Muang",
    "Fried-Rice",
    "Green-Curry",
    "Khao-Mun-Kai",
    "Pad-Thai",
    "Pad-Kra-Pow",
    "Tom-Yum-Goong",
  ];

  const germanFoodList = [
    "Schnitzel",
    "Bratwurst",
    "Currywurst",
    "Pretzel",
    "Sauerkraut",
    "Mett",
  ];

  const restartButton = document.getElementById("restart");
  let modeButtons = document.querySelectorAll(".mode");
  let attempt = 0;
  let foodList = thaiFoodList;
  let folderName = "/thai-food-webp/";
  let box;
  let wantedDish;

  setImages(foodList, folderName);
  setMode();
  wantedDish = randomDish();

  /* === Methods === */
  function countAttempt() {
    const countAttempt = document.getElementById("countAttempt");
    attempt++;
    console.log(countAttempt);
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
          reset();
        } else {
          foodList = germanFoodList;
          folderName = "/german-food-webp/";
          reset();
        }
      });
    }
  }

  

  restartButton.addEventListener("click", function () {
     reset();
  });

  function reset() {
   const imgParent = document.querySelectorAll('.img-parent');
   wantedDish = randomDish();
   shuffle();
   for (let i = 0; i < 9; i++) {
     imgParent[i].removeChild(imgParent[i].firstChild); 
   }
   setImages(foodList, folderName);
  }


  function setImages(foodList, folderName) {
    // a loop for generating images
    for (let i = 0; i < 9; i++) {
      box = document.querySelector(".box" + (i + 1));
      const img = document.createElement("img");
      img.src = "images" + folderName + foodList[i] + ".webp";
      img.alt = foodList[i];
      box.appendChild(img);
      box.classList.add("fx");
    }
    // a loop for adding .fade and .hide classes to image
    const imageEffects = document.querySelectorAll(".fx");
    for (let i = 0; i < 9; i++) {
      imageEffects[i].addEventListener("click", function () {
        countAttempt();
        imageEffects[i].classList.add("fade");
        imageEffects[i].classList.add("hide");
      });
    }
  }
  
  function randomDish() {
    let randNum = Math.floor(Math.random() * 9);
    const textDisplay = document.getElementById('text-display');
    textDisplay.innerText = foodList[randNum];
    return foodList[randNum];
  }

  function shuffle(){
    for (let i = 0; i < 9; i++) {
      let randPointer = Math.floor(Math.random() * 9);
      // take this to store temporily somewhere
      let temp = foodList[randPointer];
      // take the 1 item to random position
      foodList[randPointer] = foodList[i]
      foodList[i] = temp;
    }
    return foodList;
  }


};
