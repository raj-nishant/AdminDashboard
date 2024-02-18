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

export async function submitProduct(userId, hashedPassword, formData) {
  const response = await fetch(`${API_BASE_URL}/product/${userId}`, {
    method: "PUT",
    headers: {
      "store-name": "Nishant",
      hashed_password: hashedPassword,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to submit product");
  }
}

export async function deleteUserProduct(userId, productId, hashedPassword) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/product/${userId}/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "store-name": "Nishant",
          hashed_password: hashedPassword,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    throw new Error("Error deleting product:", error);
  }
}

export async function deleteUserAccount(userId, hashedPassword) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "store-name": "Nishant",
        hashed_password: hashedPassword,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete account");
    }
  } catch (error) {
    throw new Error("Error deleting account:", error);
  }
}

export async function editUserProduct(userId, hashedPassword) {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "store-name": "Nishant",
        hashed_password: hashedPassword,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to Edit product");
    }
  } catch (error) {
    throw new Error("Error Editing product:", error);
  }
}
