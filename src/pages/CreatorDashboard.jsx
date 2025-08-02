import React, { useState } from 'react';
import { Upload, DollarSign, Eye, Users, Plus } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const CreatorDashboard = () => {
  const { contents, addContent } = useContent();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'video',
    price: '',
    category: 'Programming',
    thumbnail: ''
  });

  const myContent = contents.filter(c => c.creatorName === 'Current User');
  const totalRevenue = myContent.reduce((sum, content) => {
    return sum + parseInt(content.price.replace('$', '')) * 5; // Mock sales
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const thumbnail = formData.thumbnail || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=400`;
    
    addContent({
      ...formData,
      price: `$${formData.price}`,
      thumbnail
    });

    setFormData({
      title: '',
      description: '',
      type: 'video',
      price: '',
      category: 'Programming',
      thumbnail: ''
    });
    setShowUploadForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Creator Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your content and track performance</p>
        </div>
        <button
          onClick={() => setShowUploadForm(true)}
          className="flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Upload Content
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center">
            <Upload className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-semibold text-gray-900">{myContent.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${totalRevenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-semibold text-gray-900">{myContent.length * 127}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-900">{myContent.length * 5}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload New Content</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter content title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe your content"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="video">Video</option>
                    <option value="ebook">E-book</option>
                    <option value="course">Course</option>
                    <option value="workshop">Workshop</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Art & Design">Art & Design</option>
                    <option value="Finance">Finance</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Set your price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL (optional)</label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Upload Content
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content List */}
      <div className="bg-white rounded-xl card-shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Content</h2>
        </div>

        {myContent.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {myContent.map((content) => (
              <div key={content.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                    <p className="text-sm text-gray-500">{content.category} • {content.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{content.price}</p>
                  <p className="text-sm text-gray-500">5 sales</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No content yet</h3>
            <p className="text-gray-600 mb-4">Start by uploading your first piece of content</p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Upload Content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;