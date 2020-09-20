'use strict';
import items from './gallery-items.js';

const refs = {
  galleryWrapper: document.querySelector('.js-gallery'),
};
console.log(refs.galleryWrapper);

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
  console.log(galleryItem);
  console.dir(galleryItemLink);
  console.dir(galleryItemImg);
});
