
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const MetricCard = ({ label, value, icon }: MetricCardProps) => {
  return (
    <div className="p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 transition-transform hover:scale-105">
      <div className="flex items-center mb-2">
        <div className="mr-2">{icon}</div>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className="text-xl font-medium">{value}</p>
    </div>
  );
};

export default MetricCard;
