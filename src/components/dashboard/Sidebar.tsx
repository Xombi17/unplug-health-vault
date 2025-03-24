
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, User, Calendar, FileText, Activity, List, Settings, LogOut } from 'lucide-react';
import SidebarItem from './SidebarItem';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: {
    name: string;
  };
}

const Sidebar = ({ activeTab, setActiveTab, userData }: SidebarProps) => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-black/20 backdrop-blur-md border-r border-white/5">
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-8 mt-4">
          <div className="h-10 w-10 rounded-lg bg-health-600 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-medium">HealthVault</span>
        </div>
        
        <nav className="flex-1">
          <div className="space-y-1">
            <SidebarItem 
              icon={<User />} 
              text="Overview" 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
            />
            <SidebarItem 
              icon={<Calendar />} 
              text="Schedule" 
              active={activeTab === 'schedule'} 
              onClick={() => setActiveTab('schedule')} 
            />
            <SidebarItem 
              icon={<FileText />} 
              text="Records" 
              active={activeTab === 'records'} 
              onClick={() => setActiveTab('records')} 
            />
            <SidebarItem 
              icon={<Activity />} 
              text="Health Stats" 
              active={activeTab === 'health-stats'} 
              onClick={() => setActiveTab('health-stats')} 
            />
            <SidebarItem 
              icon={<List />} 
              text="Vaccines" 
              active={activeTab === 'vaccines'} 
              onClick={() => setActiveTab('vaccines')} 
            />
          </div>
          
          <div className="pt-6 mt-6 border-t border-white/5 space-y-1">
            <SidebarItem 
              icon={<Settings />} 
              text="Settings" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
            <Link to="/" className="no-underline">
              <SidebarItem 
                icon={<LogOut />} 
                text="Logout" 
                active={false} 
              />
            </Link>
          </div>
        </nav>
        
        <div className="pt-6 mt-auto">
          <GlassMorphismCard className="p-4" intensity="light">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-health-400 to-health-600 flex items-center justify-center text-white font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-medium">{userData.name}</div>
                <div className="text-xs text-health-400">Premium Account</div>
              </div>
            </div>
          </GlassMorphismCard>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
