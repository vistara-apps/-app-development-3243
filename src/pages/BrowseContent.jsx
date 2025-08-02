import React from 'react';
import { Search } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useSearch } from '../hooks/useSearch';
import { Container, Section, Grid } from '../components/ui';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ContentCard from '../components/ContentCard';

const BrowseContent = () => {
  const { contents } = useContent();
  
  const {
    searchTerm,
    selectedCategory,
    selectedTypes,
    priceRange,
    sortBy,
    recentSearches,
    filteredAndSortedContents,
    categories,
    contentTypes,
    searchSuggestions,
    trendingSearches,
    activeFilterCount,
    setSearchTerm,
    setSelectedCategory,
    setSelectedTypes,
    setPriceRange,
    setSortBy,
    handleSearch,
    clearFilters
  } = useSearch(contents);

  return (
    <div className="min-h-screen bg-secondary-50">
      <Section padding="lg">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">Browse Content</h1>
            <p className="text-xl text-secondary-600">
              Discover premium digital content from creators worldwide
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              recentSearches={recentSearches}
              trendingSearches={trendingSearches}
              placeholder="Search for content, creators, or categories..."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                contentTypes={contentTypes}
                selectedTypes={selectedTypes}
                onTypesChange={setSelectedTypes}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Content Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-secondary-900">
                    {filteredAndSortedContents.length} Results
                    {searchTerm && ` for "${searchTerm}"`}
                  </h2>
                  {activeFilterCount > 0 && (
                    <p className="text-sm text-secondary-600 mt-1">
                      {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied
                    </p>
                  )}
                </div>
                
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Content Grid */}
              {filteredAndSortedContents.length > 0 ? (
                <Grid cols={3} responsive className="mb-8">
                  {filteredAndSortedContents.map((content) => (
                    <ContentCard
                      key={content.id}
                      content={content}
                      showStats={true}
                    />
                  ))}
                </Grid>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">
                    No content found
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default BrowseContent;

