import React, { useState } from 'react';
import { generateNames } from '../../generate';

const HomePage = () => {
  const [formData, setFormData] = useState({
    industry: '',
    keywords: ''
  });
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerateNames = async () => {
    setLoading(true);
    setError('');
    try {
      const generatedNames = await generateNames(formData);
      // Remove any dashes from the start of names and limit to 9 names
      const cleanedNames = generatedNames
        .map(name => name.replace(/^[-\s]+/, '').trim())
        .slice(0, 9);
      setNames(cleanedNames);
    } catch (error) {
      setError('Failed to generate names. Please try again.');
    }
    setLoading(false);
  };

  const copyToClipboard = (name, index) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1000); // Reset after 1 second
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Startup Name Generator 🚀
          </h1>
          <p className="text-gray-600">
            Generate unique and creative names for your startup
          </p>
        </div>

        <div className="max-w-4xl mx-auto"> {/* Increased max-width for 3 columns */}
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g., Technology, Healthcare, Finance"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="e.g., innovative, sustainable, future"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleGenerateNames}
                disabled={loading || !formData.industry || !formData.keywords}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Generating...' : 'Generate Names'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Results */}
          {names.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Generated Names
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {names.map((name, index) => (
                  <div
                    key={index}
                    onClick={() => copyToClipboard(name, index)}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 text-center">{name}</h3>
                    {copiedIndex === index && (
                      <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-green-500 text-white text-sm rounded">
                        Copied!
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full shadow-md mt-auto">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-600">
            Made by{' '}
            <a
              href="https://github.com/aamirali65"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Aamir Almani
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;