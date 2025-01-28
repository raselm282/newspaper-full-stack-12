export const updateArticleStatus = async (id, status, reason = null) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${id}`, {
        method: "PATCH", // Update operation
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, reason }), // Sending updated data
      });
      if (!response.ok) throw new Error("Failed to update article status");
      return await response.json(); // Returns the updated article or success message
    } catch (error) {
      console.error("Error updating article status:", error);
      throw error; // Re-throw the error for handling
    }
  };

  // import.meta.env.VITE_API_URL,
  //   withCredentials: true,