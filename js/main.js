const thaiFoodList = [
  "01-som-tum.webp",
  "02-tom-kha-kai.webp",
  "03-khao-niew-ma-muang.webp",
  "04-fried-rice.webp",
  "05-green-curry.webp",
  "06-khao-mun-kai.webp",
  "07-pad-thai.webp",
  "08-pad-kra-pow.webp",
  "09-tom-yum-goong.webp",
];

window.onload = function () {
  // loop for generating images
  thaiFoodList.forEach((imgName, index) => {
    let box = document.querySelector(".box" + (index + 1));
    box.classList.add("img");
    const img = document.createElement("img");
    img.src = "images/thai-food-webp/" + imgName;
    img.alt = imgName;
    box.appendChild(img);
  });

  const images = document.querySelectorAll(".img");
  console.log(images);
  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function () {
      console.log("clicked!");
      images[i].classList.add("fade");
      images[i].classList.add("hide");
    });
  }
};
