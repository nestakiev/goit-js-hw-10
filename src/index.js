import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupInfoOneCountry, markupCountries } from "./makeMarkup";


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
    fetchCountries(name).then(renderMarkupCountries);
}
    
function renderMarkupCountries (countries) {
    if (countries === undefined) {
        return
    }

    if (countries.length === 1) {
        refs.list.innerHTML = markupCountries(countries);
        refs.container.innerHTML = markupInfoOneCountry(countries);
    }

    if (countries.length >= 2 && countries.length <= 10) {
        refs.list.innerHTML = markupCountries(countries);
        refs.container.innerHTML = "";        
    }

    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
    }
}


