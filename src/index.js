import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showError() {
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function showCatInfo(cat) {
    catInfo.innerHTML = `
        <img src="${cat.url}" alt="Cat image">
        <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `;
    catInfo.classList.remove('hidden');
}

function hideCatInfo() {
    catInfo.classList.add('hidden');
}

breedSelect.addEventListener('change', () => {
    const breedId = breedSelect.value;
    if (!breedId) return;

    showLoader();
    hideError();
    hideCatInfo();

    fetchCatByBreed(breedId)
        .then(cat => {
            showCatInfo(cat);
            hideLoader();
        })
        .catch(() => {
            showError();
            hideLoader();
        });
});

document.addEventListener('DOMContentLoaded', () => {
    showLoader();
    hideError();
    hideCatInfo();

    fetchBreeds()
        .then(breeds => {
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.id;
                option.textContent = breed.name;
                breedSelect.appendChild(option);
            });
            hideLoader();
        })
        .catch(() => {
            showError();
            hideLoader();
        });
});
