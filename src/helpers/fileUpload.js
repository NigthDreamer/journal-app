export const fileUpload = async (file) => {
  // if (!file) throw new Error('No tenemos ningun archivo a subir');

  if (!file) return null;

  const cloudUrl = 'https://api.cloudinary.com/v1_1/duqniwia3/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const res = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('No se pudo subir la imagen');

    const cloudRes = await res.json();

    return cloudRes.secure_url;
  } catch (error) {
    // console.error(error);
    // throw new Error(error.message);
    return null;
  }
};
