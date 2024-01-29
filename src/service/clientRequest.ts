import axios from "axios";
export function addClientDetails(token: any, payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/addClientDetails`;
  return axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function editClientDetails(token: any, payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/editClientDetails`;
  return axios.put(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getClients(token: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/getClientDetails`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteClient(token: any, param: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/deleteClientDetail/${param}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function importExcelSheet(token: any, payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/importExcelSheet`;
  return axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function dateRangeWisegettingData(token: any, payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/dateRangeWisegettingData`;
  return axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteMultipleClientDelete(token: any, payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/deleteMultipleClient`;
  return axios.post(
    url,
    { payload: payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function filterByDesignation(token: any, payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/filterDesignationClientDetails`;
  return axios.post(
    url,
    { designation: payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function searchClientDetails(token: any, payload: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/searchClientInfo`;
  return axios.post(
    url,
    { searchval: payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getAllClients(token: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/getAllClients`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getClientsMonthWise(token: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/getClientsMonthWise`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getClientDesignationChatDetails(token: any) {
  const url = `${process.env.REACT_APP_BASE_URL}/api/v1/client/getGroupbyDesignationDetails`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
