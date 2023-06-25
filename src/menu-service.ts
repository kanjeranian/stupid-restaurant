import axios from "axios";

export interface Menu {
  name: string;
  creativeName: string;
  ingredients: string[];
  description: string;
  imageUrl: string;
}

export async function getLatestMenu(): Promise<Menu> {
  const response = await axios.get<Menu>("http://localhost:3010/latest-menu");
  return response.data;
}

export async function createRandomMenu(): Promise<Menu> {
  const response = await axios.post<Menu>("http://localhost:3010/create-menu");
  return response.data;
}
