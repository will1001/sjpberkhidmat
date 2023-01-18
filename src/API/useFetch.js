import { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";

const useFetch = (method, url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const base_url = "https://api.sjpberkhidmat.id/";
  const token = useSelector((state) => state.user.token);

  const headers = {
    authorization: "Bearer " + token,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(base_url + url, { headers });
        setData(res.data.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
