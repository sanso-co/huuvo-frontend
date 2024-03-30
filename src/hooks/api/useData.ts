import { useEffect, useState } from "react";
import { client } from "@/services/client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface UseGetResponse<T> {
  data: T | null;
  loading: boolean;
  error: string;
}

const useGet = <T>(
  endpoint: string,
  responseType: (data: any) => T,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
): UseGetResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    () => {
      const controller = new AbortController();
      setLoading(true);
      client
        .get(endpoint, { signal: controller.signal, ...requestConfig })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, loading, error };
};

export default useGet;
