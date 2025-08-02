import { useState, useEffect, useMemo } from 'react';

export const useSearch = (contents, initialFilters = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || 'all');
  const [selectedTypes, setSelectedTypes] = useState(initialFilters.types || []);
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange || 'all');
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'newest');
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('contentVault_recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem('contentVault_recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Add to recent searches
  const addToRecentSearches = (term) => {
    if (!term.trim()) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== term);
      return [term, ...filtered].slice(0, 5); // Keep only 5 recent searches
    });
  };

  // Parse price from string (e.g., "$15" -> 15)
  const parsePrice = (priceString) => {
    return parseInt(priceString.replace('$', '')) || 0;
  };

  // Filter and sort contents
  const filteredAndSortedContents = useMemo(() => {
    let filtered = contents.filter(content => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;

      // Content type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(content.type);

      // Price range filter
      const price = parsePrice(content.price);
      const matchesPrice = (() => {
        switch (priceRange) {
          case 'all': return true;
          case '0-10': return price <= 10;
          case '10-25': return price > 10 && price <= 25;
          case '25-50': return price > 25 && price <= 50;
          case '50+': return price > 50;
          default: return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesType && matchesPrice;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id - a.id; // Assuming higher ID = newer
        case 'oldest':
          return a.id - b.id;
        case 'price-low':
          return parsePrice(a.price) - parsePrice(b.price);
        case 'price-high':
          return parsePrice(b.price) - parsePrice(a.price);
        case 'popular':
          // Mock popularity based on views (would be real data in production)
          return (b.views || 0) - (a.views || 0);
        case 'rating':
          // Mock rating (would be real data in production)
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [contents, searchTerm, selectedCategory, selectedTypes, priceRange, sortBy]);

  // Get unique categories from contents
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(contents.map(content => content.category))];
    return ['all', ...uniqueCategories];
  }, [contents]);

  // Get unique content types from contents
  const contentTypes = useMemo(() => {
    return [...new Set(contents.map(content => content.type))];
  }, [contents]);

  // Generate search suggestions based on content
  const searchSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    
    const suggestions = new Set();
    
    contents.forEach(content => {
      // Add matching titles
      if (content.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(content.title);
      }
      
      // Add matching categories
      if (content.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(content.category);
      }
      
      // Add matching creator names
      if (content.creatorName.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(content.creatorName);
      }
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [contents, searchTerm]);

  // Trending searches (mock data - would come from analytics in production)
  const trendingSearches = [
    'React Patterns',
    'Digital Art',
    'Cryptocurrency',
    'Photography',
    'Web Development'
  ];

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    addToRecentSearches(term);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTypes([]);
    setPriceRange('all');
    setSortBy('newest');
  };

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedTypes.length > 0) count++;
    if (priceRange !== 'all') count++;
    if (searchTerm) count++;
    return count;
  }, [selectedCategory, selectedTypes, priceRange, searchTerm]);

  return {
    // State
    searchTerm,
    selectedCategory,
    selectedTypes,
    priceRange,
    sortBy,
    recentSearches,
    
    // Derived data
    filteredAndSortedContents,
    categories,
    contentTypes,
    searchSuggestions,
    trendingSearches,
    activeFilterCount,
    
    // Actions
    setSearchTerm,
    setSelectedCategory,
    setSelectedTypes,
    setPriceRange,
    setSortBy,
    handleSearch,
    clearFilters,
    addToRecentSearches
  };
};

