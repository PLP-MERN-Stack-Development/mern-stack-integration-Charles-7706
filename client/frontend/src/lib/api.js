const API = import.meta.env.VITE_API || "http://localhost:5000";

// Helper function for fetch requests
async function request(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Network response was not ok");
    }

    // Return parsed JSON, or null for DELETE requests
    return res.status === 204 ? null : await res.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

// Endpoints
export const blog = {
  create: async (postData) => {
    return await request(`${API}/api/posts`, {
      method: "POST",
      body: JSON.stringify(postData),
    });
  },

  list: async () => {
    return await request(`${API}/api/posts`);
  },

  update: async (id, postData) => {
    return await request(`${API}/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    });
  },

  delete: async (id) => {
    return await request(`${API}/api/posts/${id}`, {
      method: "DELETE",
    });
  },

  get: async (id) => {
    return await request(`${API}/api/posts/${id}`);
  },
};
