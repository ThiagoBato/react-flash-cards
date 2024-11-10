import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://flashcards-backend-thiagobato.glitch.me',
  timeout: 10000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}
export async function exclude(url) {
  const data = await axiosInstance.delete(url);
  return data;
}
export async function create(url, object) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}
export async function edit(url, object) {
  const { data } = await axiosInstance.put(url, object);
  return data;
}
