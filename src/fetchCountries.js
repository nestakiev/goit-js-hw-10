import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries (name) {    
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    const BASE_FILTER = 'fields=name,capital,population,flags,languages';
    return fetch(`${BASE_URL}/${name}?${BASE_FILTER}`).then(response => {
        if (response.ok) {
           return response.json()
        }
        throw new Error(Notify.failure('Oops, there is no country with that name.'))
     }).catch(error => error)
}

