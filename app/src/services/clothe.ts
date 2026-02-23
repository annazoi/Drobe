import axios from "axios";
import { API_URL } from "../constants/api";
import { Clothe, NewClothe } from "../interfaces/clothe";
import { getAuthHeaders, getHeaders } from "../utils/headers";
import { formatClothe } from "./formatter/clothe";

export const createClothe = async (payload: NewClothe) => {
  try {
    const response = await axios.post(
      `${API_URL}/clothes`,
      payload,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getClothes = async (
  query: { [key: string]: string } = {}
): Promise<Clothe[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/clothes/?${new URLSearchParams(query).toString()}`,
      getHeaders()
    );
    const formattedData = response.data.map((clothe: any) =>
      formatClothe(clothe)
    );

    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getClothe = async (clotheId: string): Promise<Clothe> => {
  try {
    const response = await axios.get(
      `${API_URL}/clothes/${clotheId}`,
      getHeaders()
    );

    const formattedData = formatClothe(response.data);

    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteClothe = async (clotheId: string, imageId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/closet/${clotheId}/clothes/${imageId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
// export const deleteImages = async (payload: DeleteImages) => {
//   try {
//     const { closetId, images } = payload;
//     const response = await axios.patch(
//       `${API_URL}/closet/${closetId}/images`,
//       { images },
//       getAuthHeaders()
//     );

//     return response.data;
//   } catch (error: any) {
//     throw error.response.data;
//   }
// };
