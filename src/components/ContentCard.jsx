import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, Star, Clock } from 'lucide-react';
import { Card, CardContent } from './ui';
import { cn } from '../utils/cn';

const ContentCard = ({ 
  content, 
  className,
  showStats = true,
  variant = 'default'
}) => {
  const {
    id,
    title,
    description,
    type,
    price,
    creatorName,
    thumbnail,
    category,
    views = Math.floor(Math.random() * 1000) + 100,
    likes = Math.floor(Math.random() * 50) + 10,
    rating = (Math.random() * 2 + 3).toFixed(1),
    duration = type === 'video' ? `${Math.floor(Math.random() * 30) + 5}min` : null
  } = content;

  const typeColors = {
    video: 'bg-primary-100 text-primary-700',
    course: 'bg-success-100 text-success-700',
    ebook: 'bg-warning-100 text-warning-700',
    workshop: 'bg-purple-100 text-purple-700',
    audio: 'bg-pink-100 text-pink-700'
  };

  return (
    <Card 
      className={cn(
        'group overflow-hidden transition-all duration-300 hover:shadow-large hover:-translate-y-2',
        variant === 'compact' && 'max-w-sm',
        className
      )}
      variant="elevated"
      padding="none"
    >
      <Link to={`/content/${id}`} className="block">
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay with type and duration */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              typeColors[type] || 'bg-secondary-100 text-secondary-700'
            )}>
              {type}
            </span>
            {duration && (
              <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {duration}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-secondary-900 px-3 py-1 rounded-full text-sm font-bold">
              {price}
            </span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          {/* Category */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
              {category}
            </span>
            {showStats && (
              <div className="flex items-center space-x-3 text-xs text-secondary-500">
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {views}
                </div>
                <div className="flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current text-warning-400" />
                  {rating}
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Creator and Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {creatorName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">
                  {creatorName}
                </p>
              </div>
            </div>
            
            {showStats && (
              <div className="flex items-center space-x-2 text-secondary-400">
                <button className="hover:text-error-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <span className="text-xs">{likes}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ContentCard;

