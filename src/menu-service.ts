import axios from "axios";

export interface Menu {
  menuName: string;
  creativeName: string;
  ingredients: string[];
  description: string;
  imageUrl?: string;
}

export async function createRandomMenu(): Promise<Menu> {
  const response = await axios.post<Menu>("http://localhost:3010/create-menu");
  return response.data;
}
