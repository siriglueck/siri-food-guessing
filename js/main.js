/* === start script === */

window.onload = function () {
  /* === variables === */

  const thaiFoodList = [
    "1-som-tum.webp",
    "2-tom-kha-kai.webp",
    "3-khao-niew-ma-muang.webp",
    "4-fried-rice.webp",
    "5-green-curry.webp",
    "6-khao-mun-kai.webp",
    "7-pad-thai.webp",
    "8-pad-kra-pow.webp",
    "9-tom-yum-goong.webp",
  ];

  const germanFoodList = [
    "1-schnitzel.webp",
    "2-bratwurst.webp",
    "3-currywurst.webp",
    "4-pretzel.webp",
    "5-sauerkraut.webp",
    "6-mett.webp",
  ];

  let modeButtons = document.querySelectorAll(".mode");
  let attempt = 0;

  let foodList = thaiFoodList;
  let folderName = "/thai-food-webp/";
  let box;

  setMode();
  setImages(foodList, folderName);

    function countAttempt() {
    const countAttempt = document.getElementById("countAttempt");
    attempt++;
    console.log(countAttempt);
    countAttempt.innerText = attempt;
  }
   
  function setMode(){
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
          modeButtons[0].classList.remove("selected");
          modeButtons[1].classList.remove("selected");
          this.classList.add("selected");
          if (this.textContent === "Thai food") {
            foodList = thaiFoodList;
            folderName = "/thai-food-webp/";
            console.log(foodList);
            console.log(folderName);
            reset();
            setImages(foodList, folderName);
          } else {
            foodList = germanFoodList;
            folderName = "/german-food-webp/";
            console.log(foodList);
            console.log(folderName);
            reset();
            setImages(foodList, folderName);
          }
		  });
     }
  }

  const restartButton = document.getElementById('restart');

  restartButton.addEventListener('click', function(){
    reset();
    setImages(foodList, folderName);
  });

function reset() {
  foodList.forEach((imgName, index) => {
    const box = document.querySelector(".box" + (index + 1));
    box.classList.remove("img");
    
    // Remove all img elements inside the box
    const imgs = box.querySelectorAll("img");
    imgs.forEach(img => img.remove());
  });
}


  // loop for generating images
  function setImages(foodList, folderName) {
    foodList.forEach((imgName, index) => {
      box = document.querySelector(".box" + (index + 1));
      box.classList.add("img");
      const img = document.createElement("img");
      img.src = "images" + folderName + imgName;
      img.alt = imgName;
      box.appendChild(img);
    });

    const images = document.querySelectorAll(".img");
    console.log(images);
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("click", function () {
        countAttempt();
        images[i].classList.add("fade");
        images[i].classList.add("hide");
      });
    }
  }
};
