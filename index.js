import galleryItems from './app.js';


const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
};

let activeIndex = 0;

const galleryMarkup = galleryItems.map((img) => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${img.original}"
  >
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      alt="${img.description}"
    />
  </a>
</li>
  `
});


function keyboardManipulation({ key }) {
  switch (key) {
    case galleryItems.length - 1 > activeIndex && "ArrowRight":
      activeIndex += 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case activeIndex > 0 && "ArrowLeft":
      activeIndex -= 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case activeIndex === galleryItems.length - 1 && "ArrowRight":
      activeIndex = 0;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case activeIndex === 0 && "ArrowLeft":
      activeIndex = galleryItems.length - 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case "Escape":
      closeModal(event); //!
      break;
    default:
      console.error("Модальное окно не открывается");

  }
}


const openModal = (e) => {
  e.preventDefault();
  if (e.target.nodeName != 'IMG') {
    return;
  };
  galleryMarkup.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      activeIndex = ind;
    };
  });
  refs.modal.classList.add('is-open');
  refs.modalImg.src = e.target.dataset.source;
  window.addEventListener('keydown', keyboardManipulation);
};


const closeModal = (e) => {
  if (e.target.nodeName === 'IMG') {
    return;
  }
  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', keyboardManipulation);
  refs.modalImg.src = '';
  refs.modalImg.alt = '';
};


refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup.join(''))
refs.gallery.addEventListener('click', openModal);
refs.closeBtn.addEventListener('click', closeModal);
refs.modal.addEventListener('click', closeModal);






//___________________________________________________
// Не работает - проскакивает 0 и galleryItems.length - 1

//const keyboardManipulation = (e) => {
//  if (e.key === 'Escape') {
//    closeModal(e);
//  };
//  if (e.key === 'ArrowRight' && galleryItems.length - 1 > activeIndex) {
//    activeIndex += 1;
//    refs.modalImg.src = galleryItems[activeIndex].original;
//    if (e.key === "ArrowRight" && activeIndex === galleryItems.length - 1) {
//      activeIndex = 0;
//      refs.modalImg.src = galleryItems[activeIndex].original;
//    }
//  };
//  if (e.key === 'ArrowLeft' && activeIndex > 0) {
//    activeIndex -= 1;
//    refs.modalImg.src = galleryItems[activeIndex].original;
//    if (activeIndex === 0 && e.key === "ArrowLeft") {
//      activeIndex = galleryItems.length - 1;
//      refs.modalImg.src = galleryItems[activeIndex].original;
//    }
//  };
//}