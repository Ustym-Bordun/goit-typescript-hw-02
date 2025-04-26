import axios from 'axios';
import { Article } from '../types/article';

interface UnsplashResponse {
  results: Article[];
  total: number;
  total_pages: number;
}

const fetchPhotos = async (
  query: string,
  currentPage: number
): Promise<UnsplashResponse> => {
  const responce = await axios.get<UnsplashResponse>('/search/photos', {
    baseURL: 'https://api.unsplash.com/',
    params: {
      query: query,
      page: currentPage,
      per_page: '12',
      client_id: 'VlEOoqHux4msB1K3BSCBdDN30mYrRhlLAmkTeHKIeSs',
    },
  });

  // console.log(responce);
  // console.log(responce.data);
  return responce.data;
};

export default fetchPhotos;

/* 
https://api.unsplash.com/
/search/photos

?client_id=WlhDx3QJGuL7onPljCL9sGWrZc0RmZS4gyH8bwfSx9A
?client_id=VlEOoqHux4msB1K3BSCBdDN30mYrRhlLAmkTeHKIeSs
*/
