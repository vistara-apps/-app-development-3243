import React, { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Input } from './ui';
import { cn } from '../utils/cn';

const SearchBar = ({ 
  value, 
  onChange, 
  onSearch,
  placeholder = "Search content...",
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const allSuggestions = [
    ...suggestions.map(s => ({ type: 'suggestion', text: s })),
    ...recentSearches.map(s => ({ type: 'recent', text: s })),
    ...trendingSearches.map(s => ({ type: 'trending', text: s }))
  ].slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : allSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(allSuggestions[highlightedIndex].text);
        } else if (value.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(newValue.length > 0 || allSuggestions.length > 0);
    setHighlightedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSearch && onSearch(suggestion);
  };

  const handleSearch = () => {
    if (value.trim()) {
      onSearch && onSearch(value);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    onChange('');
    setIsOpen(false);
    searchRef.current?.querySelector('input')?.focus();
  };

  return (
    <div ref={searchRef} className={cn('relative w-full', className)}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(allSuggestions.length > 0 || value.length > 0)}
          leftIcon={<Search className="h-5 w-5" />}
          rightIcon={value && (
            <button
              onClick={clearSearch}
              className="hover:text-secondary-600 transition-colors"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          className="pr-12"
        />
        
        {value && (
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && allSuggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-secondary-200 rounded-lg shadow-large z-50 max-h-80 overflow-y-auto"
        >
          {allSuggestions.map((item, index) => (
            <button
              key={`${item.type}-${item.text}-${index}`}
              onClick={() => handleSuggestionClick(item.text)}
              className={cn(
                'w-full px-4 py-3 text-left hover:bg-secondary-50 transition-colors flex items-center space-x-3',
                index === highlightedIndex && 'bg-primary-50 text-primary-700',
                index === 0 && 'rounded-t-lg',
                index === allSuggestions.length - 1 && 'rounded-b-lg'
              )}
            >
              <div className="flex-shrink-0">
                {item.type === 'trending' ? (
                  <TrendingUp className="h-4 w-4 text-warning-500" />
                ) : item.type === 'recent' ? (
                  <Search className="h-4 w-4 text-secondary-400" />
                ) : (
                  <Search className="h-4 w-4 text-secondary-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">
                  {item.text}
                </p>
                {item.type === 'trending' && (
                  <p className="text-xs text-secondary-500">Trending</p>
                )}
                {item.type === 'recent' && (
                  <p className="text-xs text-secondary-500">Recent search</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

