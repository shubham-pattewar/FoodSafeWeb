# FoodSafe 🍎

FoodSafe is a web application that helps Indian consumers determine whether a packaged food product is safe and healthy by scanning barcodes or uploading images of ingredient/nutrition labels.

## Features

- **Barcode Analysis**: Enter a barcode number to fetch product information from Open Food Facts API
- **Image OCR Analysis**: Upload an image of ingredients/nutrition label for analysis
- **Safety Scoring**: Get a safety score (0-10) based on ingredients and nutrition
- **Risk Assessment**: Categorized as Safe, Moderately Safe, or Unsafe
- **Detailed Explanations**: Understand why a product received its score

## Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Tesseract.js (OCR)

### External Services
- Open Food Facts API

## Project Structure

```
FoodSafe/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Results.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── barcodeController.js
│   │   │   └── ocrController.js
│   │   ├── routes/
│   │   │   ├── barcodeRoutes.js
│   │   │   └── ocrRoutes.js
│   │   ├── services/
│   │   │   ├── safetyAnalysis.js
│   │   │   ├── openFoodFacts.js
│   │   │   └── ocrService.js
│   │   ├── models/
│   │   │   └── Product.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/foodsafe
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodsafe
```

4. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### POST /api/barcode/analyze
Analyze a product by barcode number.

**Request Body:**
```json
{
  "barcode": "8901052001234"
}
```

**Response:**
```json
{
  "success": true,
  "product": {
    "name": "Product Name",
    "brand": "Brand Name",
    "ingredients": ["ingredient1", "ingredient2"],
    "nutrition": {
      "sugars": 30,
      "sodium": 650
    },
    "safetyScore": 7.5,
    "riskLevel": "Moderately Safe",
    "explanation": ["High sugar content (30g per 100g): -2 points"],
    "source": "barcode"
  }
}
```

### POST /api/ocr/analyze
Analyze a product from an uploaded image.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with `image` field containing the image file

**Response:**
Same format as barcode analysis endpoint.

## Safety Scoring Logic

The safety score starts at 10 and deducts points based on:

- **High sugar** (>25g per 100g): -2 points
- **High sodium** (>600mg per 100g): -1.5 points
- **Contains MSG (E621)**: -1.5 points
- **Artificial colors** (E100-E199): -1 point
- **Palm oil**: -1 point

**Risk Levels:**
- **8-10**: Safe
- **5-7.9**: Moderately Safe
- **<5**: Unsafe

## Database Model

### Product Schema
```javascript
{
  barcode: String (unique, indexed),
  name: String,
  brand: String,
  ingredients: [String],
  nutrition: Object,
  safetyScore: Number (0-10),
  riskLevel: String (Safe | Moderately Safe | Unsafe),
  explanation: [String],
  source: String (barcode | ocr),
  createdAt: Date
}
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with --watch flag for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## Notes

- The OCR functionality uses Tesseract.js for text extraction. For better accuracy, ensure images are clear and well-lit.
- Open Food Facts API is free and doesn't require an API key.
- The application is designed for Indian consumers but works with products from any region available in Open Food Facts.

## License

ISC

