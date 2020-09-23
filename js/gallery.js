'use strict';
import items from './gallery-items.js';

const refs = {
  galleryWrapper: document.querySelector('.js-gallery'),
  overlayWrapper: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('.lightbox__button'),
  overlayContent: document.querySelector('.lightbox__image'),
  overlayContentWrapper: document.querySelector('.lightbox__content'),
  rightBtn: document.querySelector('.right'),
  leftBtn: document.querySelector('.left'),
};

console.log(refs.rightBtn);
console.log(refs.leftBtn);

const galleryMarkup = items.map(item => {
  refs.galleryWrapper.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item">
      <a
        class="gallery__link"
        href=${item.original}
      >
        <img
          class="gallery__image"
          src=${item.preview}
          data-source=${item.original}
          alt=${item.description}
        />
      </a>
    </li>`,
  );
  return item;
});

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.overlayWrapper.classList.add('is-open');
  refs.overlayContent.src = event.target.dataset.source;
  refs.overlayContent.alt = event.target.alt;
}
function onCloseModal() {
  refs.overlayWrapper.classList.remove('is-open');
}

function clickOnOverlay(event) {
  if (event.currentTarget === event.target) {
    refs.overlayWrapper.classList.remove('is-open');
  }
}
function onCloseModalWithKeyboard(event) {
  if (event.code === 'Escape') {
    refs.overlayWrapper.classList.remove('is-open');
  }
}
function onLeftSide() {
  for (let i = 0; i < galleryMarkup.length; i += 1) {
    // let maxValue = Number(galleryMarkup.length) - 1;
    if (refs.overlayContent.classList.contains('on-active')) {
      refs.overlayContent.classList.remove('on-active');
      refs.overlayContent.src = galleryMarkup[8].original;
      console.log(galleryMarkup);
      console.log(refs.overlayContent.src);
    } else if (refs.overlayContent.src === galleryMarkup[0].original) {
      refs.overlayContent.src = galleryMarkup[0].original;
      refs.overlayContent.classList.add('on-active');
      return;
    } else if (refs.overlayContent.src === galleryMarkup[i].original) {
      refs.overlayContent.src = galleryMarkup[i - 1].original;
    }
  }
}
// function onRightSide() {
//   for (let i = 0; i < galleryMarkup.length; i += 1) {
//     if (refs.overlayContent.src === galleryMarkup[maxValue].original) {
//       refs.overlayContent.src = galleryMarkup[0].original;
//     } else if (refs.overlayContent.src === galleryMarkup[i].original) {
//       refs.overlayContent.src = galleryMarkup[i + 1].original;
//     }
//     console.log(galleryMarkup[i + 1].original);
//   }
// }

refs.galleryWrapper.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.overlayContentWrapper.addEventListener('click', clickOnOverlay);
refs.galleryWrapper.addEventListener('keydown', onCloseModalWithKeyboard);
refs.leftBtn.addEventListener('click', onLeftSide);
// refs.rightBtn.addEventListener('click', onRightSide);
