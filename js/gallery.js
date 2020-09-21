'use strict';
import items from './gallery-items.js';

const refs = {
  galleryWrapper: document.querySelector('.js-gallery'),
  overlayWrapper: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('.lightbox__button'),
  overlayContent: document.querySelector('.lightbox__image'),
  overlayContentWrapper: document.querySelector('.lightbox__content'),
};

const galleryMarkup = items.map(item => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');
  const galleryItemLink = document.createElement('a');
  galleryItemLink.classList.add('gallery__link');
  galleryItemLink.href = item.original;
  const galleryItemImg = document.createElement('img');
  galleryItemImg.classList.add('gallery__image');
  galleryItemImg.src = item.preview;
  galleryItemImg.setAttribute('data-source', item.original);
  galleryItemImg.alt = item.description;
  galleryItemLink.appendChild(galleryItemImg);
  galleryItem.appendChild(galleryItemLink);
  refs.galleryWrapper.appendChild(galleryItem);
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

refs.galleryWrapper.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.overlayContentWrapper.addEventListener('click', clickOnOverlay);
refs.galleryWrapper.addEventListener('keydown', onCloseModalWithKeyboard);
