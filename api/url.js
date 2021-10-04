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

export async function getMyUrlFromApi() {
    try {
      const url = `http://localhost:3000/api/urls`;
      const response = await fetch(url);
      const result = await response.json();
      return result.data;
    } catch (error) {
        console.log(error);
      return null;
    }
  }

  export async function deleteUrl(id) {
    try {
      const url = `http://localhost:3000/api/urls/${id}`;
      const response = await fetch(url,{
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
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

