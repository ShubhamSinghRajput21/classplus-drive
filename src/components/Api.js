import axios from 'axios';

const baseUrl = "https://www.flickr.com/services/rest";
const apiKey ="cdd1c68b16d468624248437566821818";
const format = "json";
const getPhotos = "flickr.photos.getRecent";
const searchPhotos = "flickr.photos.search";

//Using this function we can get recent photos by page
async function GetRecentPhotos(page){
  const response = await axios.get(`${baseUrl}/?method=${getPhotos}&api_key=${apiKey}&page=${page}&format=${format}&nojsoncallback=1`);
  return response.data.photos;
}

//Using this function we can get photos by query and by page
async function SearchQuery(query,page){
  const response = await axios.get(`${baseUrl}/?method=${searchPhotos}&api_key=${apiKey}&page=${page}&tags=${query}&text=${query}&format=json&nojsoncallback=1`);
  return response.data.photos;
}

export {GetRecentPhotos,SearchQuery};