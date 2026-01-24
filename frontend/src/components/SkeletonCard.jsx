import React from 'react';

const SkeletonCard = ({ type = 'default' }) => {
  if (type === 'service') {
    return (
      <div className="card animate-pulse">
        <div className="bg-gray-300 h-48 rounded-t-lg"></div>
        <div className="p-6 space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    );
  }
  
  if (type === 'team') {
    return (
      <div className="card animate-pulse">
        <div className="bg-gray-300 h-64 rounded-t-lg"></div>
        <div className="p-6 text-center space-y-3">
          <div className="h-5 bg-gray-300 rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (type === 'blog') {
    return (
      <div className="card animate-pulse">
        <div className="bg-gray-300 h-48 rounded-t-lg"></div>
        <div className="p-6 space-y-3">
          <div className="flex gap-2">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-4/5"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    );
  }
  
  // Default skeleton
  return (
    <div className="card animate-pulse">
      <div className="bg-gray-300 h-48"></div>
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
