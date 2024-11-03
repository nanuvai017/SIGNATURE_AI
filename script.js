const name = document.querySelector("#First-name");
const sign = document.querySelector(".signature-main");
const uppercase = document.querySelectorAll(".letter-bank .up");
const lowercase = document.querySelectorAll(".letter-bank .lo");
const signedBy = document.querySelector(".signed-by");
const modal = document.querySelector(".modal");
const downloadBtn = document.getElementById("download-btn"); // Button for downloading the signature

name.addEventListener("keydown", (event) => {
  if (event.code === `Key${event.key.toUpperCase()}` || event.code == "Space") {
    var key = event.key;
    draw(key, true);
  } else if (event.code == "Backspace") {
    setTimeout(function () {
      var value = name.value;
      sign.innerHTML = "";
      var letters = value.split("");
      letters.forEach((item, i) => {
        draw(item, false);
      });
    }, 50);
  }
  setTimeout(function () {
    if (!name.value) {
      modal.classList.remove("active");
    } else {
      modal.classList.add("active");
    }
  }, 50);
});

function draw(key, animate) {
  if (key == " ") {
    const space = document.createElement("div");
    space.style.minWidth = "12px";
    sign.appendChild(space);
  } else {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i)
    );

    for (i = 0; i < alphabet.length; i++) {
      var item = alphabet[i];

      if (key.toLowerCase() == item) {
        const letter = document.createElement("div");
        if (key == item.toUpperCase()) {
          letter.innerHTML = uppercase[i].innerHTML;
          letter.classList.add("up");
        } else {
          letter.innerHTML = lowercase[i].innerHTML;
          letter.classList.add("lo");
        }
        letter.classList.add(item);
        if (animate) {
          setTimeout(function () {
            letter.querySelector("svg path").style.strokeDashoffset = "0";
          }, 50);
        } else {
          letter.querySelector("svg path").style.strokeDashoffset = "0";
        }
        sign.appendChild(letter);
      }
    }
  }
}

downloadBtn.addEventListener("click", () => {
  // Use html2canvas to capture the signature area
  html2canvas(sign).then((canvas) => {
    // Convert canvas to a data URL
    const dataURL = canvas.toDataURL("image/png");

    // Create a link element to download the image
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "signature.png";

    // Trigger the download
    downloadLink.click();
  });
});