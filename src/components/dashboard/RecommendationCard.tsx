
import React from 'react';

interface RecommendationCardProps { 
  title: string;
  description: string;
  icon: React.ReactNode;
}

const RecommendationCard = ({ 
  title, 
  description, 
  icon 
}: RecommendationCardProps) => {
  return (
    <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 hover:bg-white/5 transition-colors">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
