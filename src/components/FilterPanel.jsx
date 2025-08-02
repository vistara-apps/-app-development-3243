import React, { useState } from 'react';
import { Filter, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button, Card } from './ui';
import { cn } from '../utils/cn';

const FilterPanel = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  contentTypes = [],
  selectedTypes,
  onTypesChange,
  sortBy,
  onSortChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-10', label: 'Under $10' },
    { value: '10-25', label: '$10 - $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50+', label: '$50+' }
  ];

  const clearAllFilters = () => {
    onCategoryChange('all');
    onPriceRangeChange('all');
    onTypesChange([]);
    setActiveFilters(0);
  };

  const toggleContentType = (type) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypesChange(newTypes);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          leftIcon={<SlidersHorizontal className="h-4 w-4" />}
          rightIcon={<ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />}
          className="w-full justify-between"
        >
          Filters {activeFilters > 0 && `(${activeFilters})`}
        </Button>
      </div>

      {/* Filter Panel */}
      <Card 
        className={cn(
          'transition-all duration-300',
          'md:block', // Always visible on desktop
          isOpen ? 'block' : 'hidden md:block' // Toggle on mobile
        )}
        variant="outlined"
        padding="lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-secondary-600" />
            <h3 className="text-lg font-semibold text-secondary-900">Filters</h3>
          </div>
          {activeFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              leftIcon={<X className="h-4 w-4" />}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">
              Category
            </label>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
                  />
                  <span className="ml-3 text-sm text-secondary-700 capitalize">
                    {category === 'all' ? 'All Categories' : category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Content Types */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">
              Content Type
            </label>
            <div className="space-y-2">
              {contentTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleContentType(type)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                  />
                  <span className="ml-3 text-sm text-secondary-700 capitalize">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">
              Price Range
            </label>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <label key={range.value} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.value}
                    checked={priceRange === range.value}
                    onChange={(e) => onPriceRangeChange(e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
                  />
                  <span className="ml-3 text-sm text-secondary-700">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="md:hidden mt-6 pt-6 border-t border-secondary-200">
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FilterPanel;

