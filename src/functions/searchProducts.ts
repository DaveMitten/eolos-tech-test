import { Product } from "../../types/products/product";
import { SearchProductsProps } from "../../types/products/searchProduct";

// Create a searchProducts fetch function and the typescript Type according to the documentation. It should be able to:

// 1. Return filtered results based on a search string

// 2. If the string is empty, all Products should be returned.

// QUESTION: It says to have filtered results, i am not sure if this extends to the above params or not.

// You can pass sortBy and order params to sort the results, sortBy should be field name and order should be "asc" or "desc"

// TODO: Add sortBy, limit, skip, order params for future use

/**
 * @param searchQuery - The search query to search for
 * @returns The products that match the search query
 * @description search dummyjson api for products based on a
 * param or return all products. This function is currently not
 * using the sortBy, limit, skip, order params for future use
 */

interface DummyJsonResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export const searchProducts = async ({
  searchQuery,
}: SearchProductsProps): Promise<DummyJsonResponse> => {
  console.log({ thing: searchQuery });
  try {
    let response;

    if (searchQuery.length === 0) {
      response = await fetch("https://dummyjson.com/products");
    } else {
      response = await fetch(
        `https://dummyjson.com/products/search?q=${searchQuery}`
      );
    }

    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log({ searchprods: data });
    return data;
  } catch (error) {
    // TODO: Add error handling like sentry or similar, console.error is not enough but is fine for now

    console.error(error);

    return {
      limit: 0,
      products: [],
      skip: 0,
      total: 0,
    };
  }
};
