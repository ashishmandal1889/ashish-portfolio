const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://ashish-portfolio-api-i7gx.onrender.com";

export const apiUrl = (path = "") => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export default API_BASE_URL;
