import React, { useState } from 'react';
import { Sidebar, Header } from './components/Navigation';
import { DashboardOverview } from './components/DashboardOverview';
import { ReportsView } from './components/ReportsView';
import { HealthRecordsView } from './components/HealthRecordsView';
import { RemindersView } from './components/RemindersView';
import { UploadModal } from './components/UploadModal';
import { AuthModal } from './components/AuthModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { HomePage } from './components/HomePage';
import { Sparkles, Bot } from 'lucide-react';

import { 
  INITIAL_REPORTS, 
  INITIAL_RECORDS, 
  INITIAL_MEDICATIONS, 
  INITIAL_APPOINTMENTS
} from './mockData';
import { MedicalReport, HealthRecord, Medication, AppointmentReminder, UserProfile } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<'overview' | 'reports' | 'records' | 'reminders'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // AI Assistant Pop-out Modal State (Only via hovering/floating button)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Authentication State - Null by default: Guest mode removed, user sees Hero Home Page until sign in/up
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [reports, setReports] = useState<MedicalReport[]>(INITIAL_REPORTS);
  const [records, setRecords] = useState<HealthRecord[]>(INITIAL_RECORDS);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [appointments, setAppointments] = useState<AppointmentReminder[]>(INITIAL_APPOINTMENTS);
  const [selectedReportId, setSelectedReportId] = useState<string>(reports[0]?.id || '');

  // Auth actions
  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    setCurrentTab('overview');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Report uploaded from modal
  const handleReportProcessed = (newReport: MedicalReport) => {
    setReports(prev => [newReport, ...prev]);
    const newRecord: HealthRecord = {
      id: `rec-${Date.now()}`,
      title: newReport.title,
      category: newReport.type === 'Imaging / X-Ray' ? 'Imaging' : 'Lab report',
      date: newReport.date,
      doctor: newReport.doctor || 'Dr. Sarah Chen',
      tag: 'AI explained',
      highlights: newReport.plainEnglishVerdict,
      fileDetails: `${newReport.type} • ${newReport.date}`
    };
    setRecords(prev => [newRecord, ...prev]);
    setSelectedReportId(newReport.id);
    setCurrentTab('reports');
  };

  const handleToggleMedication = (id: string) => {
    setMedications(prev => prev.map(m => {
      if (m.id === id) {
        const nextState = !m.takenToday;
        return {
          ...m,
          takenToday: nextState,
          streakDays: nextState ? m.streakDays + 1 : Math.max(0, m.streakDays - 1)
        };
      }
      return m;
    }));
  };

  const handleAddMedication = (med: Medication) => {
    setMedications(prev => [med, ...prev]);
  };

  const handleAddAppointment = (apt: AppointmentReminder) => {
    setAppointments(prev => [apt, ...prev]);
  };

  const handleAddRecord = (rec: HealthRecord) => {
    setRecords(prev => [rec, ...prev]);
  };

  const handleOpenReportDetail = (reportId: string) => {
    setSelectedReportId(reportId);
    setCurrentTab('reports');
  };

  // If user is not logged in, display the Hero Home Page
  if (!currentUser) {
    return (
      <>
        <HomePage onOpenAuth={handleOpenAuth} />

        {/* Auth Modal (Login & Signup) */}
        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // Once logged in, display the full HealthMate Platform
  return (
    <div className="min-h-screen bg-[#f4f7f4] text-[#243329] flex relative">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        reportCount={reports.length}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onSearch={(query) => {
            // Global search
          }}
          onOpenUpload={() => setIsUploadModalOpen(true)}
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
        />

        <main className="flex-1 pb-16">
          {currentTab === 'overview' && (
            <DashboardOverview
              latestReport={reports[0]}
              recordsCount={records.length}
              medications={medications}
              nextAppointment={appointments[0] || null}
              recentRecords={records}
              currentUser={currentUser}
              onNavigate={(view) => setCurrentTab(view)}
              onOpenUpload={() => setIsUploadModalOpen(true)}
              onOpenReportDetail={handleOpenReportDetail}
              onOpenAuth={handleOpenAuth}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              reports={reports}
              selectedReportId={selectedReportId}
              onSelectReport={(id) => setSelectedReportId(id)}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
            />
          )}

          {currentTab === 'records' && (
            <HealthRecordsView
              records={records}
              onAddRecord={handleAddRecord}
              onOpenReportById={handleOpenReportDetail}
            />
          )}

          {currentTab === 'reminders' && (
            <RemindersView
              medications={medications}
              appointments={appointments}
              onToggleMedication={handleToggleMedication}
              onAddMedication={handleAddMedication}
              onAddAppointment={handleAddAppointment}
            />
          )}
        </main>
      </div>

      {/* SOLE AI HEALTH ASSISTANT: HOVERING / FLOATING CIRCULAR BOT BUTTON */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Subtle helper tooltip pill */}
        <div className="hidden md:flex items-center gap-2 bg-[#eaf1eb] text-[#2c4a34] px-3.5 py-1.5 rounded-full border border-[#cad9cc] text-xs font-semibold shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask HealthMate AI</span>
        </div>

        {/* Circular Floating Action Button matching sage palette with Bot icon */}
        <button
          onClick={() => setIsAIChatOpen(true)}
          className="w-14 h-14 rounded-full bg-[#2c4a34] hover:bg-[#203626] text-white shadow-xl hover:shadow-2xl border-2 border-[#b9d4bd] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
          title="Open AI Health Assistant Chat"
          aria-label="Open AI Health Assistant Chat"
        >
          <Bot className="w-7 h-7 text-[#eaf3eb] group-hover:scale-110 transition-transform" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full ring-2 ring-white" />
        </button>
      </div>

      {/* Pop-out Chat Screen Modal */}
      <AIAssistantModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      {/* Report Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onReportProcessed={handleReportProcessed}
      />

      {/* Auth Modal (Login & Signup) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;
