import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../functions/searchProducts";
import { Product } from "../../types/products/product";
import Spinner from "./Spinner";
import { observer } from "mobx-react";
import { productStore } from "../stores/productStore";

const Loader = ({
  loading,
  description,
}: {
  loading: boolean;
  description: string;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: "1rem",

      marginBottom: "1rem",
    }}
  >
    <>
      <div>{loading ? "Loading..." : description}</div>
      <span style={{ visibility: loading ? "visible" : "hidden" }}>
        <Spinner />
      </span>
    </>
  </div>
);

const ProductsTable = observer(
  ({ loading, products }: { loading: boolean; products: Product[] }) => {
    console.log(products);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid white",
          maxHeight: "50vh",
          minWidth: "59f0px",
          overflow: "auto",
        }}
      >
        <ul
          style={{
            padding: "0.5rem 1rem",
            listStyle: "none",
            listStylePosition: "outside",
            minWidth: "fit-content",
            margin: "0",
          }}
        >
          {!loading &&
            products?.map((product) => (
              <li
                style={{ padding: "0.5rem", minWidth: "fit-content" }}
                key={product.id}
              >
                {product.title}
              </li>
            ))}
        </ul>
      </div>
    );
  }
);

const Products = observer(() => {
  const { isPending, error, data } = useQuery({
    // this acts as a dependency array for the query
    queryKey: ["productSearch", productStore.searchTerm],
    queryFn: () => searchProducts({ searchQuery: productStore.searchTerm }),
    retry: false,
    //waits to refetch data if the query is stale
    staleTime: 800, // Wait .8 seconds before considering data stale
  });

  const products = data?.products;

  const pointerEvent = isPending ? "none" : "auto";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    productStore.setSearchTerm(e.target.value);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
        }}
      >
        <h1 style={{ margin: "0.5rem 0" }}>Products</h1>
        <Loader
          loading={isPending}
          description="Please start typing to being your search."
        />
        <div
          style={{
            width: "100%",
            minWidth: "580px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <label htmlFor="productSearch">Search</label>
          <input
            style={{
              width: "100%",
              pointerEvents: pointerEvent,
              minWidth: "10rem",
            }}
            type="text"
            id="productSearch"
            value={productStore.searchTerm}
            onChange={handleInputChange}
          />
        </div>
        {error && <div>Error: {error.message}</div>}
        <ProductsTable loading={isPending} products={products ?? []} />
      </div>
    </div>
  );
});

export default Products;
