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
    
    let fontStyle = '';
    if (countries.length === 1) {
        fontStyle = 'style="font-size: 30px; font-weight: 700;"'
    }

    return countries.map(a => {
        const { name: { official } , flags: { svg } } = a;
        return `<li class="country-list__item"><img width="30" src="${svg}" alt="flag of ${official}"></img><p ${fontStyle}>${official}<p></li>`}).join(' ');    
}

export {markupInfoOneCountry, markupCountries}