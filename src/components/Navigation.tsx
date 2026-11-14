import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderLock, 
  Bell, 
  ShieldCheck, 
  PlusCircle, 
  ChevronDown, 
  Search, 
  X, 
  Menu,
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: any) => void;
  reportCount: number;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  reportCount,
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'reports', label: 'My reports', icon: FileText, badge: reportCount > 0 ? reportCount : undefined },
    { id: 'records', label: 'Health records', icon: FolderLock },
    { id: 'reminders', label: 'Reminders', icon: Bell },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#f4f7f4] border-r border-[#dbe6dc] flex flex-col justify-between p-4 transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Header: Clean logo without surrounding card container, sized in proportion to HEALTHMATE title */}
          <div className="flex items-center justify-between px-1 py-2 mb-6">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/healthmate-logo-tight.png" 
                alt="HEALTHMATE Logo" 
                className="w-10 h-10 object-contain mix-blend-multiply shrink-0 -ml-1"
              />
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-[#1a2c20] tracking-wide text-lg leading-none">
                  HEALTHMATE
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#697f6e] font-semibold mt-1">
                  Your health, simplified
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#dce9de] text-[#1c2e21] shadow-xs'
                      : 'text-[#485b4d] hover:bg-[#eaf1eb] hover:text-[#1c2e21]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#2c4a34]' : 'text-[#627766]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isActive ? 'text-[#2c4a34] font-bold' : 'text-[#5d7262]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Info & User Session */}
        <div className="space-y-4 pt-4 border-t border-[#dce6dc] px-2 text-xs">
          {/* Privacy Callout */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#293d2e]">
              <ShieldCheck className="w-4 h-4 text-[#35593c]" />
              <span>Your health, your privacy</span>
            </div>
            <p className="text-[11px] text-[#637667] leading-relaxed">
              Your medical information is private and securely stored.
            </p>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert('HealthMate operates with zero-retention AI translation and zero commercial profiling.');
              }}
              className="text-[11px] text-[#2c4a34] font-semibold underline block"
            >
              Learn about privacy
            </a>
          </div>

          {/* User Account / Auth Section */}
          <div className="pt-2 border-t border-[#e2ede3]">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#3b4e40]">{currentUser.name}</p>
                  <p className="text-[10px] text-[#86998b] truncate max-w-[120px]">{currentUser.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex-1 py-2 bg-[#2c4a34] text-white rounded-xl text-xs font-semibold hover:bg-[#203626] transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log in</span>
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="flex-1 py-2 bg-white text-[#2c4a34] border border-[#d6e3d8] rounded-xl text-xs font-semibold hover:bg-[#edf3ee] transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onSearch: (q: string) => void;
  onOpenUpload: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onSearch,
  onOpenUpload,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#f4f7f4]/95 backdrop-blur-md border-b border-[#dbe6dc] px-4 md:px-8 py-3.5 flex items-center justify-between gap-6">
      {/* Left Area: Mobile Toggle & Expanded Large Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden text-[#2c4a34] p-2 hover:bg-[#e5eee7] rounded-xl transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports, records, and more..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#d2dfd5] rounded-xl text-sm text-[#1e2f23] placeholder:text-[#788e7d] focus:outline-none focus:ring-2 focus:ring-[#2c4a34]/30 focus:border-[#2c4a34] shadow-xs transition"
          />
        </div>
      </div>

      {/* User Profile & Actions Right Area */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenUpload}
          className="hidden sm:flex items-center gap-1.5 bg-[#425d49] hover:bg-[#344d3b] text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer shadow-2xs"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Upload</span>
        </button>

        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-2 border-l border-[#dce6dd] cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#3d5e46] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#c6dac9]">
                {currentUser.initials}
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="font-bold text-[#1c2e21] block leading-none">{currentUser.name}</span>
                <span className="text-[10px] text-[#617464]">{currentUser.role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#dce6dd] rounded-2xl shadow-lg p-2 z-50 text-xs space-y-1">
                <div className="px-3 py-2 border-b border-[#edf3ed]">
                  <p className="font-bold text-[#1a2b1f]">{currentUser.name}</p>
                  <p className="text-[10px] text-[#637768] truncate">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    alert(`Account settings: Logged in as ${currentUser.name}. All health data is encrypted.`);
                  }}
                  className="w-full text-left px-3 py-2 text-[#2c4a34] hover:bg-[#f3f7f4] rounded-xl transition cursor-pointer font-medium"
                >
                  Manage account
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 pl-2 border-l border-[#dce6dd]">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-xs font-semibold text-[#2c4a34] hover:underline px-2 py-1 cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="bg-[#2c4a34] hover:bg-[#203626] text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
