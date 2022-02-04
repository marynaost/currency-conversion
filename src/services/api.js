const BASE_URL = 'https://api.getgeoapi.com/v2/currency';
const API_KEY = 'a368fc6816b80ed8fe9d9588170b4de62547b896';

async function fetchCurrency(url = '') {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(
        new Error(
          'You reached the limit of your currency requests for the day',
        ),
      );
}

export function fetchCurrencyConvension(from, to, input) {
  return fetchCurrency(`${BASE_URL}/convert?api_key=${API_KEY}&from=${from}&to=${to}
&amount=${input}&format=json`);
}

export function fetchCurrencyList() {
  return fetchCurrency(`${BASE_URL}/list?api_key=${API_KEY}&format=json`);
}

const API = { fetchCurrency };

export default API;
