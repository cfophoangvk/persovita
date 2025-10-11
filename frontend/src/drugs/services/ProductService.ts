import axios from "axios";
import type { IProductReview } from "../interfaces/IProductReview";

export class ProductService {
  async getProductReviewById(id: number): Promise<IProductReview[]> {
    try {
      const response = await axios.get(`http://localhost:6789/api/products/review/${id}`);
      if (response.status === 200) {
        return response.data as IProductReview[];
      }
      return [];
    } catch (error) {
      console.log("ERR: ", error);
    }
    return []
  }
}