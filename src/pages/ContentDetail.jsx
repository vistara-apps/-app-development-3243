import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, Unlock, Play, Download, User } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePaymentContext } from '../hooks/usePaymentContext';

const ContentDetail = () => {
  const { id } = useParams();
  const { contents, hasPurchased, purchaseContent } = useContent();
  const { createSession } = usePaymentContext();
  const [paid, setPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const content = contents.find(c => c.id === parseInt(id));
  const isPurchased = hasPurchased(parseInt(id), 'user1') || paid; // Mock user ID

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Content not found</h1>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await createSession(content.price);
      setPaid(true);
      purchaseContent(content.id, 'user1', content.price);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Preview */}
        <div className="lg:col-span-2">
          <div className="relative">
            <img
              src={content.thumbnail}
              alt={content.title}
              className="w-full h-96 object-cover rounded-xl"
            />
            {!isPurchased && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                <div className="text-center text-white">
                  <Lock className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-semibold">Premium Content</p>
                  <p className="text-sm opacity-80">Purchase to unlock</p>
                </div>
              </div>
            )}
          </div>

          {isPurchased && (
            <div className="mt-6">
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <Unlock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-2">Content Unlocked!</h3>
                <p className="text-green-700 mb-4">You now have full access to this content</p>
                <div className="flex justify-center space-x-4">
                  <button className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Play className="h-4 w-4 mr-2" />
                    View Content
                  </button>
                  <button className="flex items-center border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="bg-white rounded-xl card-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              {content.category}
            </span>
            <span className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
              {content.type}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{content.description}</p>

          <div className="flex items-center mb-6">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-700">Created by <strong>{content.creatorName}</strong></span>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600">Price</span>
              <span className="text-3xl font-bold text-gray-900">{content.price}</span>
            </div>

            {!isPurchased ? (
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full bg-primary-600 text-white text-lg font-semibold py-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Purchase Content'}
              </button>
            ) : (
              <div className="text-center">
                <div className="text-green-600 mb-2">
                  <Unlock className="h-6 w-6 mx-auto" />
                </div>
                <p className="text-green-700 font-medium">You own this content</p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              Powered by blockchain technology for secure transactions and content protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;