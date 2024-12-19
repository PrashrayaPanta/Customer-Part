import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { ProductSection } from "../../components";
import http from "../../http";
import { LoadingComponent } from "../../components";

export const Categories = () => {
  const [category, setCategory] = useState({});

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    http
      .get(`/categories/${id}`)
      .then(({ data }) => {
        setCategory(data);
        return http.get(`/categories/${id}/products`);
      })
      .then(({ data }) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {products.length > 0 ? (
            <ProductSection
              title={`Category of ${category.name}`}
              products={products}
            />
          ) : (
            <h1 className="text-center">Data Not available</h1>
          )}
        </>
      )}
    </>
  );
};
