
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
          <p className="text-muted-foreground mt-1">Here's an overview of your health records</p>
        </div>
        <div>
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <Bell className="h-5 w-5 mr-2" />
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-health-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-health-500"></span>
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
