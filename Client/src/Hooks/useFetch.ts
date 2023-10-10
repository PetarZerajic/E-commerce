import { useEffect, useState } from "react";
import { IProdcuts } from "../Interfaces/products";
import { ICategories } from "../Interfaces/categories";
import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
});

export const useFetch = (url: string) => {
  const [dataProducts, setDataProducts] = useState<IProdcuts[]>([]);
  const [data, setData] = useState<IProdcuts>();
  const [dataCategory, setDataCateory] = useState<ICategories>();
  const [dataCategories, setDataCategories] = useState<ICategories[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeRequest.get(url);
        setData(response.data.data);
        setDataProducts(response.data.data);
        setDataCateory(response.data.data);
        setDataCategories(response.data.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return {
    data,
    dataProducts,
    dataCategory,
    dataCategories,
    loading,
    error,
  };
};
