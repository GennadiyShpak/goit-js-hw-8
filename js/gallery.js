'use strict';
import items from './gallery-items.js';

const refs = {
  galleryWrapper: document.querySelector('.js-gallery'),
  overlayWrapper: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('.lightbox__button'),
  overlayContent: document.querySelector('.lightbox__image'),
  overlayContentWrapper: document.querySelector('.lightbox__content'),
  rightArrow: document.querySelector('.right'),
  leftArrow: document.querySelector('.left'),
};
let sliderIndex;

items.forEach(item => {
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
function onPressKey(event) {
  console.log(event);
  if (event.code === 'Escape') onCloseModal();
  else if (event.code === 'ArrowLeft') onLeftSide();
  else if (event.code === 'ArrowRight') onRightSide();
}

function sliderGalleryIndex() {
  if (!refs.overlayWrapper.classList.contains('is-open')) {
    return null;
  }
  return items.findIndex(el => el.original === refs.overlayContent.src);
}

function onLeftSide() {
  sliderIndex = sliderGalleryIndex() - 1;
  const maxValue = items.length - 1;
  if (sliderIndex < 0) {
    refs.overlayContent.src = items[maxValue].original;
  }
  if (refs.overlayContent.src === items[sliderIndex + 1].original) {
    refs.overlayContent.src = items[sliderIndex].original;
  }
}
function onRightSide() {
  sliderIndex = sliderGalleryIndex() + 1;
  if (sliderIndex > items.length - 1) {
    refs.overlayContent.src = items[0].original;
  }
  if (refs.overlayContent.src === items[sliderIndex - 1].original) {
    refs.overlayContent.src = items[sliderIndex].original;
  }
}

refs.galleryWrapper.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.overlayContentWrapper.addEventListener('click', clickOnOverlay);
refs.galleryWrapper.addEventListener('keydown', onPressKey);
refs.leftArrow.addEventListener('click', onLeftSide);
refs.rightArrow.addEventListener('click', onRightSide);
