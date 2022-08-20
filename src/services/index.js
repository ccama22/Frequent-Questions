import { dataMock } from "../mock";

export const getPages = async () =>
  fetch("https://api.npms.io/v2/invalid-url")
    // endpoint de prueba que llama a mock
    .then(async (response) => {
      const data = await response.json();
      if (data.code === "NOT_FOUND") {
        return dataMock.pages;
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
      return dataMock.pages;
    });
