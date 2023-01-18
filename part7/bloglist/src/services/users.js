import axios from "axios";
const baseUrl = "http://127.0.0.1:3003/api/users";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
