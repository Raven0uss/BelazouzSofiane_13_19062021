import axios from "axios";

const backend_server = "http://127.0.0.1:3001/api/v1";

// POST
const loginHTTP = async ({ email, password }) => {
  const route = `${backend_server}/user/login`;
  const body = {
    email,
    password,
  };

  const response = await axios.post(route, body).catch((error) => {
    if ("response" in error) return error.response;
    return {
      status: 500,
      message: "An error occured with the server.",
    };
  });
  return response.data;
};

// POST
const profileHTTP = async ({ token }) => {
  const route = `${backend_server}/user/profile`;
  const body = {};
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(route, body, headers).catch((error) => {
    if ("response" in error) return error.response;
    return {
      status: 500,
      message: "An error occured with the server.",
    };
  });
  return response.data;
};

// PUT

const profileUpdateHTTP = async ({ token, firstName, lastName }) => {
  const route = `${backend_server}/user/profile`;
  const body = {
    firstName,
    lastName,
  };
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(route, body, headers).catch((error) => {
    if ("response" in error) return error.response;
    return {
      status: 500,
      message: "An error occured with the server.",
    };
  });
  return response.data;
};

export { loginHTTP, profileHTTP, profileUpdateHTTP };
