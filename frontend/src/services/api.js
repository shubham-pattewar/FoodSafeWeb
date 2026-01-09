import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Analyze product by barcode
 */
export async function analyzeBarcode(barcode) {
  try {
    const response = await api.post('/barcode/analyze', { barcode });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Failed to analyze barcode. Please try again.'
    );
  }
}

/**
 * Analyze product from image upload
 */
export async function analyzeImage(imageFile) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post('/ocr/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Failed to analyze image. Please try again.'
    );
  }
}