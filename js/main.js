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
  "6-mett.webp"
];

let attempt = 0;

/* === start script === */

window.onload = function () {

  function countAttempt() {
    const countAttempt = document.getElementById('countAttempt');
    attempt++;
    console.log(countAttempt);
    countAttempt.innerText = attempt;
  }

  let thaiFolder= '/thai-food-webp/';
  let germanFolder= '/german-food-webp/';

  setImages(germanFoodList, germanFolder);

  // loop for generating images
  function setImages(foodList, folderName) {
    foodList.forEach((imgName, index) => {
        let box = document.querySelector(".box" + (index + 1));
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
