import axios from "axios";

export function getUserInformation(token: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/users/userinformation`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
