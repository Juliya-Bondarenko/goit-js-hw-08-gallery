import galleryImages from "./galleryItems.js";

const refs = {
  galleryBox: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
  modalCloseBtn: document.querySelector(".lightbox__button"),
  modalOverlay: document.querySelector(".lightbox__overlay"),
};

const galleryMarkup = createImgCard(galleryImages);
refs.galleryBox.insertAdjacentHTML("beforeend", galleryMarkup);

refs.galleryBox.addEventListener("click", onGalleryCardClick);
refs.modalCloseBtn.addEventListener("click", onCloseModal);
refs.modalOverlay.addEventListener("click", onOverlayClick);

function createImgCard(galleryImages) {
  return galleryImages
    .map((image) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function onGalleryCardClick(e) {
  e.preventDefault();
  window.addEventListener("keydown", onEscKeyPress);
  document.addEventListener("keydown", turnImg);
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  refs.lightbox.classList.add("is-open");
  setLightBoxAttr(
    e.target.getAttribute("data-source"),
    e.target.getAttribute("alt")
  );
}

function setLightBoxAttr(src, alt) {
  refs.modalImg.src = src;
  refs.modalImg.alt = alt;
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  document.removeEventListener("keydown", turnImg);
  refs.lightbox.classList.remove("is-open");
  setLightBoxAttr("", "");
}

function onOverlayClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    onCloseModal();
  }
}

const arraySrc = galleryImages.map((image) => image.original);

function turnImg(e) {
  let newIdx = arraySrc.indexOf(refs.modalImg.src);
  if (newIdx < 0) {
    return;
  }
  if (e.code === "ArrowLeft") {
    newIdx -= 1;
    if (newIdx === -1) {
      newIdx = arraySrc.length - 1;
    }
  } else if (e.code === "ArrowRight") {
    newIdx += 1;
    if (newIdx === arraySrc.length) {
      newIdx = 0;
    }
  }
  refs.modalImg.src = arraySrc[newIdx];
}
