import { authFetch } from "../utils/fetch";

export async function getUrlFromApi(urls) {
    try {
      const url = `http://localhost:3000/api/url/${urls}`;
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
      const url = `http://localhost:3000/api/urls?iduser=${idUser}`;
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
      const url = `http://localhost:3000/api/urls/${id}`;
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
      const url = `http://localhost:3000/api/urls/`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await authFetch(url, params);
      console.log("response: url.js ", response)
      
      const result = await response;
      
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

