export const updateArticleStatus = async (id, status, reason = null) => {
    try {
      const response = await fetch(`http://localhost:5000/articles/${id}`, {
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