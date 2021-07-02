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
    if ("response" in error) return error.response.data;
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
    if ("response" in error) return error.response.data;
    return {
      status: 500,
      message: "An error occured with the server.",
    };
  });
  console.log(response);
  return response.data;
};

export { loginHTTP, profileHTTP };
