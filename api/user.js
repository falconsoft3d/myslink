export async function addUser(formData) {
  console.log("formData:", formData)
    const data = { email: formData.userEmail, password: formData.userPassword  }
    try {
      const url = `http://localhost:3000/api/users/`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function loginApi(formData) {
    try {
      const url = `http://localhost:3000/api/users/login`;
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





  // export async function loginApi(formData) {
  //   console.log(":::formData::====", formData)
  //   try {
  //     const url = `http://localhost:3000/api/users/login`;
  //     const params = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     };

  //     console.log("params", params);



  //     const response = await fetch(url, params);
  //     console.log("response:", response)
  //     const result = await response.json();
  //     console.log("result:", result)
  //     return result;
  //   } catch (error) {
  //       console.log(error);
  //     return null;
  //   }
  // }


  // export async function resetPasswordApi(email) {
  //   try {
  //     const url = `${BASE_PATH}/auth/forgot-password`;
  //     const params = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     };
  //     const response = await fetch(url, params);
  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }