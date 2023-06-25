import axios from "axios";

export interface Menu {
  name: string;
  creativeName: string;
  ingredients: string[];
  description: string;
  imageUrl: string;
}

const serverBaseUrl = "https://ramsey-aveji-kitchen-3nhnlytkia-as.a.run.app";

export async function getLatestMenu(): Promise<Menu> {
  const response = await axios.get<Menu>(serverBaseUrl + "/latest-menu");
  return response.data;
}

export async function createRandomMenu(): Promise<Menu> {
  const response = await axios.post<Menu>(
    serverBaseUrl + "/create-random-menu"
  );
  return response.data;
}
