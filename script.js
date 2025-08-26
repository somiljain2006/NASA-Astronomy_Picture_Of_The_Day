const apikey = "fFLPc43asd3NnzuvirZgyqtbwfbj3cd7LoHuhLZY";
const titl = document.getElementById("title");
const img = document.getElementById("image");
const disc = document.getElementById("description");
const load = document.getElementById("loading");

let curr = new Date();
curr.setDate(curr.getDate() - 1);

const format = date => date.toISOString().split("T")[0];

async function apod(date) {
  load.textContent = "Preparing your cosmic view...";
  img.style.display = "none";
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${date}`);
    if (!res.ok) throw new Error("Error 404: Future under construction Come back later.");
    const data = await res.json();
    titl.textContent = data.title;
    disc.textContent = data.explanation;
    img.classList.remove("loaded");
    let imgUrl = "";
    if (data.media_type === "image") {
      imgUrl = data.url.replace(/^http:/, "https:");
    } else {
      imgUrl = "alternate.webp"; 
    }
    img.onload = () => {
      img.classList.add("loaded");
      load.textContent = "";
    };
    img.onerror = () => {
      load.textContent = "Could not load image";
    };
    img.src = imgUrl;
    img.style.display = "block";
  } catch (err) {
    load.textContent = err.message;
  }
}


document.getElementById("prev").addEventListener("click", () => {
  curr.setDate(curr.getDate() - 1);
  apod(format(curr));
});

document.getElementById("next").addEventListener("click", () => {
  curr.setDate(curr.getDate() + 1); 
  apod(format(curr));
});

apod(format(curr));

function reveal() {
  const rect = disc.getBoundingClientRect();
  const height = window.innerHeight;

  if (rect.top < height * 0.8) {
    disc.classList.add("visible");
    disc.classList.add("card-hover");
  } else {
    disc.classList.remove("visible"); 
    disc.classList.remove("card-hover");
  }
}
window.addEventListener("scroll", reveal);
