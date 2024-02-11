// services/api.js
const API_BASE_URL = "https://floating-shore-52389-ec1ab93f1be3.herokuapp.com";

export async function getUserDetails(userId, hashedPassword) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      "store-name": "Nishant",
      hashed_password: hashedPassword,
    },
  });
  return response.json();
}

export async function getUserProducts(userId, hashedPassword) {
  const response = await fetch(`${API_BASE_URL}/product/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      "store-name": "Nishant",
      hashed_password: hashedPassword,
    },
  });
  return response.json();
}

export async function addProduct(userId, newProduct, hashedPassword) {
  const response = await fetch(`${API_BASE_URL}/product/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "store-name": "Nishant",
      hashed_password: hashedPassword,
    },
    body: JSON.stringify(newProduct),
  });
  return response.json();
}
