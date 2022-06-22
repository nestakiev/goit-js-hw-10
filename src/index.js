import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('[id=search-box]'),
    list: document.querySelector('.country-list'),
    container: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInputEnter, DEBOUNCE_DELAY))

function onInputEnter (event) {
    const name = event.target.value.trim();
    if (name.length === 0) {
        refs.list.innerHTML = "";
        refs.container.innerHTML = "";
        return
    }
    fetchCountries(name).then(renderMarkupCountries)
}
    
function renderMarkupCountries (countries) {
    if (countries === undefined) {
        return
    }

    if (countries.length === 1) {
        refs.list.innerHTML = markupCountries(countries);
        refs.container.innerHTML = markupInfoOneCountry(countries)
    }

    if (countries.length >= 2 && countries.length <= 10) {
        refs.list.innerHTML = markupCountries(countries);
        refs.container.innerHTML = "";        
    }

    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
    }
}

function markupInfoOneCountry(countries) {
    const { capital, population, languages } = countries[0];
    return `
    <ul>
     <li class="country-info__item"><p class="country-info__info"><span class="country-info__label">Capital:</span>${capital}</p></li>
     <li class="country-info__item"><p class="country-info__info"><span class="country-info__label">Population:</span>${population}</p></li>
     <li class="country-info__item"><p class="country-info__info"><span class="country-info__label">Languages:</span>${Object.values(languages).join(", ")}</p></li>
    </ul>`
}

function markupCountries(countries) {    
    
    if (countries.length === 1) {
        const { name: { official } , flags: { svg } } = countries[0];
        
        return `<li class="country-list__item"><img width="30" src="${svg}" alt="flag of ${official}"></img><p style="font-size: 30px; font-weight: 700;">${official}<p></li>`
    }
    
    
    return countries.map(a => {
        const { name: { official } , flags: { svg } } = a;
        return `<li class="country-list__item"><img width="30" src="${svg}" alt="flag of ${official}"></img><p>${official}<p></li>`})    
}
