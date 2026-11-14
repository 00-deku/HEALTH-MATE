import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Printer, 
  ChevronRight, 
  Calendar, 
  Building2, 
  UserCheck
} from 'lucide-react';
import { MedicalReport } from '../types';

interface ReportsViewProps {
  reports: MedicalReport[];
  selectedReportId?: string | null;
  onSelectReport?: (id: string) => void;
  onOpenUploadModal: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  reports,
  selectedReportId,
  onSelectReport,
  onOpenUploadModal,
}) => {
  const [activeId, setActiveId] = useState<string>(selectedReportId || reports[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'explained' | 'questions'>('explained');
  const [copied, setCopied] = useState(false);

  const report = reports.find(r => r.id === activeId) || reports[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!report) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No reports found.</p>
        <button
          onClick={onOpenUploadModal}
          className="mt-4 px-4 py-2 bg-[#2c4a34] text-white rounded-lg text-sm"
        >
          Upload a report
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1d2d22]">My reports</h1>
          <p className="text-sm text-[#5d6f61] mt-0.5">
            Your medical reports, simplified.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-2 bg-[#425d49] hover:bg-[#344d3b] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Upload a report</span>
          </button>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Report List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-[#677a6b] uppercase tracking-wider px-1">
            Reports ({reports.length})
          </div>

          <div className="space-y-2.5">
            {reports.map((item) => {
              const isSelected = item.id === (report?.id);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveId(item.id);
                    if (onSelectReport) onSelectReport(item.id);
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#e5eee6] border-[#3b5e44] shadow-sm ring-1 ring-[#3b5e44]'
                      : 'bg-white hover:bg-[#f8faf8] border-[#e0eae1]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#2c4a34] text-white' : 'bg-[#eef3ef] text-[#2c4a34]'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1e2f23] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#607264] mt-0.5">
                        {item.facility}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] text-[#718274] bg-[#f0f4f0] px-2 py-0.5 rounded-md">
                          {item.date}
                        </span>
                        <span className="text-[11px] text-[#2c4a34] font-medium bg-[#e4ede5] px-2 py-0.5 rounded-md">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 mt-1 transition ${isSelected ? 'text-[#2c4a34] translate-x-0.5' : 'text-gray-300'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed AI-Simplified Breakdown (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#dce6dd] shadow-sm overflow-hidden flex flex-col">
          {/* Header Info */}
          <div className="p-5 md:p-6 border-b border-[#e8efe9] bg-[#fbfdfb]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="inline-block text-[11px] font-semibold text-[#2c4a34] bg-[#e3ece4] px-2.5 py-0.5 rounded-full mb-1.5">
                  {report.type}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-[#1a2b1f]">{report.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-[#4d6352] hover:text-[#2c4a34] bg-[#f0f5f1] hover:bg-[#e4ede5] px-3 py-1.5 rounded-lg border border-[#d6e2d8] transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 text-xs text-[#4d6352] hover:text-[#2c4a34] bg-[#f0f5f1] hover:bg-[#e4ede5] px-3 py-1.5 rounded-lg border border-[#d6e2d8] transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#edf3ed] text-xs text-[#526456]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#3b5e44]" />
                <span>Date: <strong className="text-[#203124]">{report.date}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#3b5e44]" />
                <span className="truncate">Facility: <strong className="text-[#203124]">{report.facility}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#3b5e44]" />
                <span className="truncate">Doctor: <strong className="text-[#203124]">{report.doctor || 'Dr. Sarah Chen'}</strong></span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#e8efe9] px-6 bg-[#f7faf8] text-xs font-medium">
            <button
              onClick={() => setActiveTab('explained')}
              className={`py-3 px-4 border-b-2 transition ${
                activeTab === 'explained'
                  ? 'border-[#2c4a34] text-[#2c4a34] font-semibold'
                  : 'border-transparent text-[#617464] hover:text-[#2c4a34]'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-3 px-4 border-b-2 transition ${
                activeTab === 'questions'
                  ? 'border-[#2c4a34] text-[#2c4a34] font-semibold'
                  : 'border-transparent text-[#617464] hover:text-[#2c4a34]'
              }`}
            >
              Questions for doctor ({report.questionsForDoctor.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            {activeTab === 'explained' && (
              <>
                {/* Result Highlight Banner */}
                <div className="bg-[#e9f2ea] border border-[#cfdfd1] rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#2c4a34] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#1e3123]">A quick look at your results</h4>
                      <p className="text-sm text-[#3b5140] mt-1 leading-relaxed">
                        {report.plainEnglishVerdict}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Test items table */}
                {report.testItems && report.testItems.length > 0 && (
                  <div>
                    <div className="border border-[#e1eae2] rounded-xl overflow-hidden">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-[#f3f7f3] border-b border-[#e1eae2] text-[#4f6454] font-medium">
                            <th className="py-2.5 px-4">TEST</th>
                            <th className="py-2.5 px-4">YOUR RESULT</th>
                            <th className="py-2.5 px-4 hidden sm:table-cell">LAB REFERENCE</th>
                            <th className="py-2.5 px-4">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#edf3ed]">
                          {report.testItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-[#fafcfa] transition">
                              <td className="py-3 px-4 font-medium text-[#1e2f23]">
                                <div>{item.name}</div>
                              </td>
                              <td className="py-3 px-4 font-semibold text-[#18261b]">
                                {item.result} <span className="text-xs font-normal text-[#667869]">{item.unit}</span>
                              </td>
                              <td className="py-3 px-4 text-[#5e7162] hidden sm:table-cell">
                                {item.reference}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${
                                    item.status === 'In range'
                                      ? 'bg-[#d8e6d9] text-[#2c4a34]'
                                      : 'bg-[#dbe6dc] text-[#556958]'
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
                )}

                {/* Key Findings */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#203124] uppercase tracking-wider">
                    Key findings
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {report.keyFindings.map((finding, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-[#f6f9f6] rounded-xl border border-[#e5eee6]">
                        <CheckCircle2 className="w-4 h-4 text-[#355b3d] shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm text-[#2e4033] leading-relaxed">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-2.5">
                {report.questionsForDoctor.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-xl border border-[#dce6dd] flex items-center justify-between gap-3"
                  >
                    <p className="text-sm font-medium text-[#1e2f23]">{q}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(q);
                        alert('Copied to clipboard');
                      }}
                      className="text-xs text-[#3b5e44] hover:underline shrink-0 font-medium cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
