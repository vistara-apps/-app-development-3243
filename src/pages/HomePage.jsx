import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const HomePage = () => {
  const { contents } = useContent();
  const featuredContent = contents.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The secure, flexible content marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              For creators and consumers - Upload, monetize, and access premium digital content
              with blockchain-powered security
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                Browse Content
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/creator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ContentVault?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for the modern creator economy with security, flexibility, and ease of use at its core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Shield className="h-16 w-16 text-primary-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Blockchain-powered security ensures your content and payments are protected with military-grade encryption
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Zap className="h-16 w-16 text-primary-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Flexible Monetization</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from pay-per-view, subscriptions, or bundles. Set your own prices and keep more of your earnings
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Globe className="h-16 w-16 text-primary-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with audiences worldwide through our platform's advanced discovery and search capabilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Content
            </h2>
            <p className="text-xl text-gray-600">
              Discover premium content from our top creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredContent.map((content) => (
              <Link
                key={content.id}
                to={`/content/${content.id}`}
                className="content-card bg-white rounded-xl overflow-hidden card-shadow hover:shadow-xl transition-all"
              >
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {content.category}
                    </span>
                    <span className="text-lg font-bold text-gray-900">{content.price}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{content.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{content.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">by {content.creatorName}</span>
                    <span className="text-sm text-gray-500 capitalize">{content.type}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/browse"
              className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              View All Content
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;