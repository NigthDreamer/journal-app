import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'duqniwia3',
  api_key: '872351179367132',
  api_secret: 'zqG2-CIVOD7PcYVCf_ywOirjgJg',
  secure: true
});

// eslint-disable-next-line no-undef
jest.setTimeout(10000);

/* eslint-disable no-undef */
describe('Pruebas en fileUpload', () => {
  test('Debe de subir el archivo correctamente a cloudinary ', async () => {
    const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';

    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length-1].replace('.jpg', '');

    await cloudinary.api.delete_resources([`journal/${imageId}`], {
      resource_type: 'image'
    });
  });

  test('Debe de devolver null', async () => {
    const file = new File([], 'foto.jpg');
    const url = await fileUpload(file);
    
    expect(url).toBeNull();
  });
});
