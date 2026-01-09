import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeBarcode, analyzeImage } from '../services/api';

function Home() {
    const [barcode, setBarcode] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleBarcodeSubmit = async (e) => {
        e.preventDefault();
        if (!barcode.trim()) {
            setError('Please enter a barcode');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await analyzeBarcode(barcode.trim());
            navigate('/results', { state: { product: result.product } });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('Please select an image file');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await analyzeImage(selectedFile);
            navigate('/results', { state: { product: result.product } });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }
            setSelectedFile(file);
            setError('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        🍎 FoodSafe
                    </h1>
                    <p className="text-xl text-gray-600">
                        Analyze food products for safety and health
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        For Indian consumers
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Barcode Scanner Section */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <svg
                                        className="w-8 h-8 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Scan Barcode
                                </h2>
                            </div>

                            <form onSubmit={handleBarcodeSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="barcode"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Enter Barcode Number
                                    </label>
                                    <input
                                        type="text"
                                        id="barcode"
                                        value={barcode}
                                        onChange={(e) => setBarcode(e.target.value)}
                                        placeholder="e.g., 8901052001234"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={loading}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Analyzing...' : 'Analyze Product'}
                                </button>
                            </form>
                        </div>

                        {/* Image Upload Section */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <svg
                                        className="w-8 h-8 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Upload Ingredients Image
                                </h2>
                            </div>

                            <form onSubmit={handleImageSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="image"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Select Image File
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                        disabled={loading}
                                    />
                                    {selectedFile && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Selected: {selectedFile.name}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || !selectedFile}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Analyze Image'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="mt-6 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Analyzing product...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;