import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
    'live_YW7JKbP96Z91mPIhqCr9VErVGErOzWlgP4sH5Me1drNO47sgKYZH8VtI7KiJctR0';

export function fetchBreeds() {
    return axios
        .get('https://api.thecatapi.com/v1/breeds')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching breeds:', error);
            throw error;
        });
}

export function fetchCatByBreed(breedId) {
    return axios
        .get('https://api.thecatapi.com/v1/images/search', {
            params: { breed_ids: breedId },
        })
        .then(response => response.data[0])
        .catch(error => {
            console.error('Error fetching cat by breed:', error);
            throw error;
        });
}
