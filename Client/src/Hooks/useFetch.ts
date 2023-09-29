import { useEffect, useState } from "react";
import { IProdcuts } from "../Interfaces/products";
import { makeRequest } from "../Constants/makeRequest";
import { ICategories } from "../Interfaces/categories";

export const useFetch = (url: string) => {
  const [dataProducts, setDataProducts] = useState<IProdcuts[]>([]);
  const [data, setData] = useState<IProdcuts|null>(null);
  const [dataCategories, setDataCategories] = useState<ICategories[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeRequest.get(url);
        setData(response.data.data);
        setDataProducts(Array.isArray(response.data.data) ?response.data.data:[])
        // setDataProducts(response.data.data);
        setDataCategories(response.data.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, dataProducts, dataCategories, loading, error };
};
