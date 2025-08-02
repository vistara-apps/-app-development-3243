import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const BrowseContent = () => {
  const { contents, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = useContent();

  const categories = [
    'all',
    'Programming',
    'Art & Design',
    'Finance',
    'Photography',
    'Music',
    'Education'
  ];

  const filteredContent = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Content</h1>
        <p className="text-xl text-gray-600">
          Discover premium digital content from creators worldwide
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter className="h-5 w-5 text-gray-400 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContent.map((content) => (
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
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {content.category}
                  </span>
                  <span className="text-lg font-bold text-gray-900">{content.price}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{content.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{content.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">by {content.creatorName}</span>
                  <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                    {content.type}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're looking for
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseContent;