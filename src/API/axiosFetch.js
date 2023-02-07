import axios from "axios";

const axiosFetch = (method, url, data = {}) => {
  const base_url = "https://api.sjpberkhidmat.id/";
  const headers = {
    authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImlzcyI6IjU5UUk5NVpQZk5vUXVzekhyemRXYlUxeGNKc3lhWVI5In0.eyJpZCI6ImEyOTM4NjBlLThhYmUtNGExMy1hMmI2LWVhNDAxNWVkYjEyNCIsImVtYWlsIjoiYWRtaW5TSlBAc2pwYmVya2hpZG1hdC5pZCIsImlhdCI6MTY3NTc4OTE4NX0.F91lLHDCkDC-QaOoEUNu0tTbsYhsE_c1Gy2kEqL4qNc",
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
