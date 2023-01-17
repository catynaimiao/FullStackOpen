import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Field Hook
 * @param {string} type
 */
export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearValue = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    clearValue,
  };
};

/**
 * Resource Hook
 * @param {string} baseUrl
 */
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  const [token, setToken] = useState(null);

  const config = {
    headers: { Authorization: token },
  };

  // init resource
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [baseUrl]);

  // get to baseUrl
  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  };

  // post to baseUrl with object
  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject, config);
    setResources(response.data);
  };

  // put to baserUrl/:id with object
  const update = async (newObject, id) => {
    const response = await axios.put(baseUrl + `/${id}`, newObject, config);
    setResources(response.data);
  };

  // delete to baseUrl/:id
  const remove = async (id) => {
    const response = await axios.delete(baseUrl + `/${id}`, config);
    setResources(response.data);
  };

  const service = { getAll, create, update, remove, setToken };

  return [resources, service];
};
