import axios from "axios";

export function signupUser(payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/signupuser`;
  return axios.post<any>(url, payload);
}

export function loginUser(payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/loginuser`;
  return axios.post<any>(url, payload);
}
