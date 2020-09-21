'use strict';
import items from './gallery-items.js';

const refs = {
  galleryWrapper: document.querySelector('.js-gallery'),
};
console.dir(refs.galleryWrapper);

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

// refs.galleryWrapper.addEventListener('click', event => {
//   // if (event.currentTarget.nodeName !== 'IMG') {
//   //   return;
//   // }
//   document.body.classList.add('.lightbox.is-open');
//   console.log(event.target);
//   console.log(event.currentTarget);
// });

const a = document.querySelector('.js-lightbox');

window.addEventListener('click', () => {
  a.classList.add('is-open');
});

const b = document.querySelector('.lightbox__button');

b.addEventListener('click', onOpen);
function onOpen() {
  a.classList.remove('is-open');
  console.log(a);
}
