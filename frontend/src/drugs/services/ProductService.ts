import axios from "axios";
import type { IProductReview } from "../interfaces/IProductReview";

export class ProductService {
  async getProductReviewById(id: number): Promise<IProductReview[]> {
    try {
      const response = await axios.get(
        `https://api.nourivitamin.com/api/products/review/${id}`
      );
      if (response.status === 200) {
        return response.data as IProductReview[];
      }
      return [];
    } catch (error) {
      console.log("ERR: ", error);
    }
    return [];
  }

  private checkImage(url: string): Promise<boolean> {
    return new Promise((resolve, _) => {
      const img = new Image();

      img.onload = () => {
        resolve(true);
      };

      img.onerror = () => {
        resolve(false);
      };

      img.src = url;
    });
  }

  async getProductImages(productId: number): Promise<string[]> {
    if (!productId) {
      return [];
    }
    let imageFound = true;
    let imageIndex = 1;
    let imageUrls: string[] = [];

    while (imageFound) {
      const imageUrl = `/assets/product-${productId}/${imageIndex}.png`;
      const isImageAvailable = await this.checkImage(imageUrl);

      if (isImageAvailable) {
        imageUrls.push(imageUrl);
        imageIndex++;
      } else {
        imageFound = false;
      }
    }

    return imageUrls;
  }
}
