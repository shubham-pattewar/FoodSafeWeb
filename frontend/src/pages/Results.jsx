import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No product data found.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Safe':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Moderately Safe':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Unsafe':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 7.5) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Analysis Results</h1>
        </div>

        {/* Product Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h2>
          {product.brand && (
            <p className="text-gray-600 mb-6">Brand: {product.brand}</p>
          )}

          {/* Safety Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Safety Score
              </h3>
              <span
                className={`text-4xl font-bold ${getScoreColor(
                  product.safetyScore
                )}`}
              >
                {product.safetyScore.toFixed(1)} / 10
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  product.safetyScore >= 7.5
                    ? 'bg-green-500'
                    : product.safetyScore >= 5
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${(product.safetyScore / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Risk Level
            </h3>
            <span
              className={`inline-block px-4 py-2 rounded-lg border-2 font-semibold ${getRiskColor(
                product.riskLevel
              )}`}
            >
              {product.riskLevel}
            </span>
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Analysis Explanation
            </h3>
            <ul className="space-y-2">
              {product.explanation && product.explanation.length > 0 ? (
                product.explanation.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-700"
                  >
                    <span className="mr-2 text-blue-600">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No analysis details available.</li>
              )}
            </ul>
          </div>

          {/* Why It's Not Healthy Section */}
          {product.safetyScore < 10 && product.healthConcerns && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-3">
                Why This Product May Not Be Healthy
              </h3>
              <div className="text-red-700 whitespace-pre-line">
                {product.healthConcerns.split('\n\n').map((concern, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    {concern}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Warnings for Specific Conditions */}
          {product.healthWarnings && product.healthWarnings.length > 0 && (
            <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">
                ⚠️ Who Should Be Cautious
              </h3>
              <p className="text-orange-700 mb-3">
                This product may be harmful or should be avoided by people with the following conditions:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.healthWarnings.map((warning, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {warning.charAt(0).toUpperCase() + warning.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Ingredients
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  {Array.isArray(product.ingredients)
                    ? product.ingredients.join(', ')
                    : product.ingredients}
                </p>
              </div>
            </div>
          )}

          {/* Nutrition Info */}
          {product.nutrition &&
            Object.keys(product.nutrition).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Nutrition Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {product.nutrition.sugars !== null &&
                      product.nutrition.sugars !== undefined && (
                        <div>
                          <span className="font-medium text-gray-700">
                            Sugar:
                          </span>{' '}
                          <span className="text-gray-600">
                            {product.nutrition.sugars}g per 100g
                          </span>
                        </div>
                      )}
                    {product.nutrition.sodium !== null &&
                      product.nutrition.sodium !== undefined && (
                        <div>
                          <span className="font-medium text-gray-700">
                            Sodium:
                          </span>{' '}
                          <span className="text-gray-600">
                            {product.nutrition.sodium.toFixed(0)}mg per 100g
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* General Health Warning for Non-Safe Products */}
        {product.riskLevel !== 'Safe' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-6">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-yellow-600 mr-3 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  General Health Warning
                </h3>
                <p className="text-yellow-700">
                  This product has been flagged with some health concerns.
                  Please review the detailed analysis above and consider
                  consuming in moderation or seeking healthier alternatives.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Analyze Another Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;