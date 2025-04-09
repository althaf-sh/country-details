function searchCountry() {
    const country = document.getElementById('countryInput').value.trim();
  
    if (!country) {
      alert("Please enter a country name.");
      return;
    }
  
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then(data => {
        const info = data[0];
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').innerHTML = `
          <img class="flag" src="${info.flags.svg}" alt="Flag of ${info.name.common}">
          <h2>${info.name.common}</h2>
          <p><strong>Capital:</strong> ${info.capital ? info.capital[0] : 'N/A'}</p>
          <p><strong>Population:</strong> ${info.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${info.region}</p>
          <p><strong>Subregion:</strong> ${info.subregion}</p>
          <p><strong>Languages:</strong> ${info.languages ? Object.values(info.languages).join(', ') : 'N/A'}</p>
          <p><strong>Timezones:</strong> ${info.timezones.join(', ')}</p>
        `;
      })
      .catch(error => {
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').innerHTML = `<p style="color: red;">${error.message}</p>`;
      });
  }
  