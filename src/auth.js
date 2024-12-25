// src/auth.js

// Check if user is authenticated
export const isAuthenticated = () => {
    const user = localStorage.getItem("user"); // Retrieve user info from localStorage
    return !!user; // Return true if user is logged in
  };
  
  // Handle user login (store user data)
  export const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };
  
  // Handle user logout
  export const logout = () => {
    localStorage.removeItem("user");
  };
  