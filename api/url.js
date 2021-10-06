import { authFetch } from "../utils/fetch";

export async function getUrlFromApi(urls) {
    try {
      const url = `${process.env.URL_SERVER}/api/url/${urls}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error);
      return null;
    }
  }

export async function getMyUrlFromApi(idUser) {
    try {
      const url = `${process.env.URL_SERVER}/api/urls?iduser=${idUser}`;
      console.log(url)
      const response = await authFetch(url);
      const result = await response;
      return result.data;
    } catch (error) {
        console.log(error);
      return null;
    }
  }

  export async function deleteUrl(id) {
    try {
      const url = `${process.env.URL_SERVER}/api/urls/${id}`;
      const response = await authFetch(url,{
        method: 'DELETE',
      });
      const result = await response.json();
      return result.data;
    } catch (error) {
        console.log(error);
      return null;
    }
  }

  export async function addUrl(formData) {
    try {
      const url = `${process.env.URL_SERVER}/api/urls/`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await authFetch(url, params);
      const result = await response;
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

