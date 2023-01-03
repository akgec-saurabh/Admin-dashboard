import { useCallback, useRef, useState, useEffect } from "react";

export const useHttpClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequests = useRef([]);

  const sendReq = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      setLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        if (!response.ok) {
          throw new Error("Unable To Fetch Data");
        }
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        // //Mapping data when everything is Good
        // const transformData = responseData.map((data) => {
        //   return {
        //     id: data.cca3 + data.ccn3,
        //     name: data.name.common,
        //     capital: data.capital,
        //     population: data.population,
        //     region: data.region,
        //     subRegion: data.subregion,
        //     tld: data.tld,
        //     language: data.languages,
        //     flag: data.flags.svg,
        //     currency: data.currencies,
        //     borders: data.borders,
        //     cca3: data.cca3,
        //   };
        // });

        setLoading(false);

        return responseData;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.log(err);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { loading, error, sendReq, clearError };
};
