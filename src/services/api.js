import axios from 'axios';

const KEY = '38869588-ca8b4f66ee76a0fa96b1985d9';

const BASE_URL = 'https://pixabay.com/api/';

export default async function getImagesBySearch(SearchQuery, page) {
  const URL = `${BASE_URL}?q=${SearchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(URL);

  return response.data;
}
