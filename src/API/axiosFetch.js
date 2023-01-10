import axios from "axios";

const axiosFetch = (method, url, data = {}) => {
  const base_url = "https://api.sjpberkhidmat.id/";
  const headers = {
    authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
  };

  const res = axios({
    method,
    url: base_url + url,
    headers,
    data,
  });

  return res;
};

export default axiosFetch;
