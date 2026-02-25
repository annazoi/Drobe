import { Outfit } from "../interfaces/outfit";
import axios from "axios";
import { API_URL } from "../constants/api";
import { getHeaders, getAuthHeaders } from "../utils/headers";
import { NewOutfit } from "../interfaces/outfit";
import { formatOutfit } from "./formatter/outfit";

export const createOutfit = async (payload: NewOutfit) => {
  try {
    const formData = new FormData();
    payload.clothes.forEach((clotheId) => {
      formData.append("clothes[]", clotheId); // Append arrays properly if needed by backend, though Nest might prefer multiple identical keys
    });
    
    // NestJS ParseArrayPipe sometimes prefers `clothes` as multiple entries or a single array string.
    // Given the previous JSON was just `clothes: ["1", "2"]`, we can send it as multiple `clothes` keys.
    formData.delete("clothes[]");
    payload.clothes.forEach((clotheId) => {
      formData.append("clothes", clotheId);
    });

    if (payload.colorScheme) formData.append("colorScheme", payload.colorScheme);
    if (payload.rating) formData.append("rating", payload.rating.toString());
    if (payload.notes) formData.append("notes", payload.notes);
    formData.append("type", payload.type);
    
    if (payload.image) {
      formData.append("imageFile", payload.image);
    }

    const response = await axios.post(
      `${API_URL}/outfits`,
      formData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getOutfits = async (
  query: { [key: string]: string } = {}
): Promise<Outfit[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/outfits/?${new URLSearchParams(query).toString()}`,
      getHeaders()
    );

    const formattedData = response.data.map((outfit: any) =>
      formatOutfit(outfit)
    );
    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getOutfit = async (id: string): Promise<Outfit> => {
  try {
    const response = await axios.get(`${API_URL}/outfits/${id}`);
    const formattedData = formatOutfit(response.data);
    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteOutfit = async (id: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/outfits/${id}`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
