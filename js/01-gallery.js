import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

function createMarkup() {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img class="gallery__image" src=${preview} data-source=${original} alt=${description} />
  </a>
</div>`;
    })
    .join("");
}
let instance;

gallery.innerHTML = createMarkup();
gallery.addEventListener("click", onZoom);

function onZoom(event) {
  event.preventDefault();
  const {
    target: {
      dataset: { source },
    },
  } = event;
  instance = basicLightbox.create(`
    <img src="${source}" width="800" height="600">
`);

  instance.show();
  document.addEventListener("keydown", onClose);
}

function onClose(e) {
  if (e.code === "Escape") {
    instance.close();
    document.removeEventListener("keydown", onClose);
  }
}

// console.log(createMarkup());
