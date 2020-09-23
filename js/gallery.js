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
function onPressKey(event) {
  if (event.code === 'Escape') onCloseModal();
  else if (event.code === 'ArrowLeft') onLeftSide();
  else if (event.code === 'ArrowRight') onRightSide();
}

function onLeftSide() {
  let sliderIndex = galleryMarkup.findIndex(
    el => el.original === refs.overlayContent.src,
  );
  sliderIndex -= 1;
  const maxValue = galleryMarkup.length - 1;
  if (sliderIndex < 0) {
    refs.overlayContent.src = galleryMarkup[maxValue].original;
  }
  if (refs.overlayContent.src === galleryMarkup[sliderIndex + 1].original) {
    refs.overlayContent.src = galleryMarkup[sliderIndex].original;
  }
}
function onRightSide() {
  let sliderqIndex = galleryMarkup.findIndex(
    el => el.original === refs.overlayContent.src,
  );
  sliderqIndex += 1;
  if (sliderqIndex > galleryMarkup.length - 1) {
    refs.overlayContent.src = galleryMarkup[0].original;
  }
  if (refs.overlayContent.src === galleryMarkup[sliderqIndex - 1].original) {
    refs.overlayContent.src = galleryMarkup[sliderqIndex].original;
  }
}

refs.galleryWrapper.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.overlayContentWrapper.addEventListener('click', clickOnOverlay);
refs.galleryWrapper.addEventListener('keydown', onPressKey);
refs.leftArrow.addEventListener('click', onLeftSide);
refs.rightArrow.addEventListener('click', onRightSide);
