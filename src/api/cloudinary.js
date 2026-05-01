export const subirImagen = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

  const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  return data
};

// src/utils/cloudinary.js

export const getOptimizedImage = (url, width = 300) => {
  if (!url) return "";

  return url.replace(
    "/upload/",
    `/upload/w_${width},c_limit,f_auto,q_auto/`
  );
};