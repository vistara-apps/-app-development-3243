import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [contents, setContents] = useState([
    {
      id: 1,
      title: "Advanced React Patterns",
      description: "Deep dive into advanced React patterns and best practices for building scalable applications.",
      type: "video",
      price: "$15",
      creatorId: 1,
      creatorName: "Sarah Chen",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      category: "Programming"
    },
    {
      id: 2,
      title: "Digital Art Masterclass",
      description: "Learn professional digital art techniques using industry-standard tools and workflows.",
      type: "course",
      price: "$25",
      creatorId: 2,
      creatorName: "Alex Rivera",
      thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
      category: "Art & Design"
    },
    {
      id: 3,
      title: "Cryptocurrency Trading Guide",
      description: "Comprehensive guide to cryptocurrency trading strategies and risk management.",
      type: "ebook",
      price: "$10",
      creatorId: 3,
      creatorName: "Michael Torres",
      thumbnail: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400",
      category: "Finance"
    },
    {
      id: 4,
      title: "Photography Workshop",
      description: "Professional photography techniques for portraits and landscapes.",
      type: "workshop",
      price: "$20",
      creatorId: 4,
      creatorName: "Emma Davis",
      thumbnail: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      category: "Photography"
    }
  ]);

  const [purchases, setPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addContent = (newContent) => {
    const content = {
      ...newContent,
      id: contents.length + 1,
      creatorId: 1, // Mock creator ID
      creatorName: "Current User"
    };
    setContents([...contents, content]);
  };

  const purchaseContent = (contentId, userId, paymentAmount) => {
    const purchase = {
      id: purchases.length + 1,
      userId,
      contentId,
      timestamp: new Date().toISOString(),
      paymentAmount
    };
    setPurchases([...purchases, purchase]);
  };

  const hasPurchased = (contentId, userId) => {
    return purchases.some(p => p.contentId === contentId && p.userId === userId);
  };

  return (
    <ContentContext.Provider value={{
      contents,
      purchases,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      addContent,
      purchaseContent,
      hasPurchased
    }}>
      {children}
    </ContentContext.Provider>
  );
};