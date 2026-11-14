import React from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  Pill, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { MedicalReport, HealthRecord, Medication, AppointmentReminder, UserProfile } from '../types';

interface DashboardOverviewProps {
  latestReport: MedicalReport;
  recordsCount: number;
  medications: Medication[];
  nextAppointment: AppointmentReminder | null;
  recentRecords: HealthRecord[];
  currentUser: UserProfile | null;
  onNavigate: (view: 'overview' | 'reports' | 'records' | 'reminders') => void;
  onOpenUpload: () => void;
  onOpenReportDetail: (reportId: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  latestReport,
  recordsCount,
  medications,
  nextAppointment,
  recentRecords,
  currentUser,
  onNavigate,
  onOpenUpload,
  onOpenReportDetail,
  onOpenAuth
}) => {
  const activeMedsCount = medications.length;
  const firstName = currentUser?.name.split(' ')[0] || 'Alex';

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1b2b1f] tracking-tight">
              Good morning, {firstName}
            </h1>
            {!currentUser && (
              <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                Guest preview
              </span>
            )}
          </div>
          <p className="text-sm text-[#5a6c5e] mt-0.5">
            A little clarity. A healthier you. Here's your health at a glance.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {!currentUser && (
            <button
              onClick={() => onOpenAuth('signup')}
              className="text-xs bg-[#2c4a34] text-white px-3 py-1.5 rounded-xl font-semibold hover:bg-[#203626] transition cursor-pointer"
            >
              Sign up to save records
            </button>
          )}
          <div className="flex items-center gap-1.5 text-xs text-[#526456] bg-white border border-[#dce6dd] px-3 py-1.5 rounded-xl shadow-xs">
            <CalendarIcon className="w-3.5 h-3.5 text-[#3b5e44]" />
            <span>Friday, 13 Nov 2026</span>
          </div>
        </div>
      </div>

      {/* Hero Upload Callout Banner */}
      <div className="bg-[#e4ede5] border border-[#d2dfd4] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white border border-[#cadacb] flex items-center justify-center text-[#2c4a34] shrink-0 shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#192b1e]">
              Medical terms shouldn't be a mystery.
            </h2>
            <p className="text-xs md:text-sm text-[#4c5f51] mt-0.5 max-w-xl">
              Upload your report and get a clear, easy-to-understand explanation.
            </p>
            <span className="text-[11px] text-[#6d7e71] block mt-1">
              PDF, JPG or PNG • Up to 20 MB
            </span>
          </div>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center justify-center gap-2 bg-[#425d49] hover:bg-[#344d3b] text-white px-5 py-3 rounded-xl text-sm font-semibold transition cursor-pointer shadow-xs shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload a report</span>
        </button>
      </div>

      {/* Quick Summary Pill Widgets (3 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigate('reports')}
          className="bg-[#e9f0ea] border border-[#d6e2d8] rounded-2xl p-4.5 cursor-pointer hover:bg-[#e2ece4] transition flex items-start gap-3.5"
        >
          <div className="w-9 h-9 rounded-lg bg-white/80 border border-[#cbdbcd] flex items-center justify-center text-[#2c4a34] shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#4e6252] block">Medical reports</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-[#192b1e]">08</span>
              <span className="text-xs text-[#637667]">All reports in one place</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigate('reminders')}
          className="bg-[#e9f0ea] border border-[#d6e2d8] rounded-2xl p-4.5 cursor-pointer hover:bg-[#e2ece4] transition flex items-start gap-3.5"
        >
          <div className="w-9 h-9 rounded-lg bg-white/80 border border-[#cbdbcd] flex items-center justify-center text-[#2c4a34] shrink-0">
            <Pill className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#4e6252] block">Active medicines</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-[#192b1e]">0{activeMedsCount}</span>
              <span className="text-xs text-[#637667]">Stay on top of your routine</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigate('reminders')}
          className="bg-[#e9f0ea] border border-[#d6e2d8] rounded-2xl p-4.5 cursor-pointer hover:bg-[#e2ece4] transition flex items-start gap-3.5"
        >
          <div className="w-9 h-9 rounded-lg bg-white/80 border border-[#cbdbcd] flex items-center justify-center text-[#2c4a34] shrink-0">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#4e6252] block">Next appointment</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-[#192b1e]">16 Nov</span>
              <span className="text-xs text-[#637667]">Monday • 10:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Latest Report & Recent Records */}
        <div className="lg:col-span-8 space-y-6">
          {/* Your latest report, made simple card */}
          <div className="bg-[#eaf1eb] border border-[#d4e1d6] rounded-2xl p-5 md:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#d8e4da] mb-4">
              <div>
                <h3 className="text-base md:text-lg font-bold text-[#1a2c20]">
                  Your latest report, made simple
                </h3>
                <p className="text-xs text-[#5f7163] mt-0.5">
                  {latestReport.title} • {latestReport.date} • Sample report
                </p>
              </div>
              <button
                onClick={() => onOpenReportDetail(latestReport.id)}
                className="text-xs font-semibold text-[#2c4a34] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Result Highlight Sub-box */}
            <div className="bg-white/80 border border-[#d5e2d7] rounded-xl p-4 mb-4">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#2c4a34] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#1d2f22]">A quick look at your results</h4>
                  <p className="text-xs text-[#4b5f50] mt-0.5 leading-relaxed">
                    {latestReport.plainEnglishVerdict}
                  </p>
                </div>
              </div>
            </div>

            {/* Micro Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#647768] font-semibold uppercase tracking-wider text-[11px] pb-2 border-b border-[#d8e4da]">
                    <th className="pb-2">TEST</th>
                    <th className="pb-2">YOUR RESULT</th>
                    <th className="pb-2 hidden sm:table-cell">LAB REFERENCE</th>
                    <th className="pb-2 text-right sm:text-left">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dce7de]">
                  {latestReport.testItems?.slice(0, 3).map((item, idx) => (
                    <tr key={idx} className="py-2.5">
                      <td className="py-3 font-semibold text-[#1e2f23]">{item.name}</td>
                      <td className="py-3 font-bold text-[#1a2c20]">
                        {item.result} <span className="text-[11px] font-normal text-[#647768]">{item.unit}</span>
                      </td>
                      <td className="py-3 text-[#586c5c] hidden sm:table-cell">{item.reference}</td>
                      <td className="py-3 text-right sm:text-left">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-[11px] font-semibold ${
                            item.status === 'In range'
                              ? 'bg-[#c5d8c7] text-[#243e2b]'
                              : 'bg-[#ccd8cd] text-[#4f6453]'
                          }`}
                        >
                          {item.status.toLowerCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Medical Records */}
          <div className="bg-[#eaf1eb] border border-[#d4e1d6] rounded-2xl p-5 md:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#1a2c20]">Recent medical records</h3>
              <button
                onClick={() => onNavigate('records')}
                className="text-xs font-semibold text-[#2c4a34] hover:underline cursor-pointer"
              >
                View all records
              </button>
            </div>

            <div className="space-y-2.5">
              {recentRecords.slice(0, 2).map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onNavigate('records')}
                  className="p-3.5 bg-white rounded-xl border border-[#d6e3d8] hover:border-[#385c41] transition flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#edf3ee] flex items-center justify-center text-[#2c4a34] shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-[#1c2e21]">{rec.title}</h4>
                      <p className="text-[11px] text-[#637768]">
                        {rec.category} • {rec.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-[#3b5542] bg-[#e4ede5] px-2.5 py-1 rounded-md">
                      {rec.tag}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Reminders & Wellness Tracker */}
        <div className="lg:col-span-4 space-y-4">
          {/* Your Next Reminders Box */}
          <div className="bg-[#eaf1eb] border border-[#d4e1d6] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1b2b1f]">Your next reminders</h3>
              <button
                onClick={() => onNavigate('reminders')}
                className="w-6 h-6 rounded-md bg-white border border-[#cbdbce] text-[#2c4a34] flex items-center justify-center text-xs font-bold hover:bg-[#edf3ee] transition cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="space-y-3">
              {/* Daily Medicine Item */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#cad9cc] text-[#2c4a34] flex items-center justify-center shrink-0 mt-0.5">
                  <Pill className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1c2e21]">Daily medicine</h4>
                  <p className="text-[11px] text-[#5c6f60]">As prescribed • After breakfast</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-[#2c4a34] bg-[#d2e2d4] px-2 py-0.5 rounded">
                    Today, 9:00 AM
                  </span>
                </div>
              </div>

              <div className="h-px bg-[#d9e4db]" />

              {/* General Health Checkup Item */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#cad9cc] text-[#2c4a34] flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1c2e21]">General health checkup</h4>
                  <p className="text-[11px] text-[#5c6f60]">Dr. Sarah Chen • City Medical Center</p>
                  <span className="text-[11px] text-[#5a6d5f] font-medium block mt-0.5">
                    16 Nov • 10:30 AM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Routine & Health Streak Box */}
          <div className="bg-[#eaf1eb] border border-[#d4e1d6] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1b2b1f]">Health Routine Status</span>
              <span className="text-[11px] font-semibold text-[#2c4a34] bg-white border border-[#cad9cc] px-2 py-0.5 rounded-md">
                14-Day Streak
              </span>
            </div>

            <p className="text-xs text-[#526456] leading-relaxed">
              Consistently taking morning supplements keeps your nutrient reserves steady and boosts immune resilience.
            </p>

            <div className="pt-2 border-t border-[#d8e4da] flex items-center justify-between text-xs font-semibold text-[#2c4a34]">
              <button
                onClick={() => onNavigate('reminders')}
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View daily schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Medical Disclaimer */}
      <div className="pt-4 pb-2 border-t border-[#dce6dd] text-center text-xs text-[#637667] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#355b3d]" />
        <span>HEALTHMATE helps you understand your health. It doesn't diagnose conditions or replace professional medical advice.</span>
      </div>
    </div>
  );
};
