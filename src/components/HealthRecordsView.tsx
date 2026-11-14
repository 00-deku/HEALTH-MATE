import React, { useState } from 'react';
import { 
  FolderLock, 
  Search, 
  Plus, 
  FileText, 
  Calendar, 
  User, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { HealthRecord } from '../types';

interface HealthRecordsViewProps {
  records: HealthRecord[];
  onAddRecord: (record: HealthRecord) => void;
  onOpenReportById: (id: string) => void;
}

export const HealthRecordsView: React.FC<HealthRecordsViewProps> = ({
  records,
  onAddRecord,
  onOpenReportById
}) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New record form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Lab report' | 'Consultation' | 'Imaging' | 'Vaccination'>('Lab report');
  const [doctor, setDoctor] = useState('Dr. Sarah Chen');
  const [date, setDate] = useState('10 Nov 2026');
  const [highlights, setHighlights] = useState('');

  const filtered = records.filter(rec => {
    return rec.title.toLowerCase().includes(search.toLowerCase()) ||
      rec.highlights.toLowerCase().includes(search.toLowerCase()) ||
      (rec.doctor && rec.doctor.toLowerCase().includes(search.toLowerCase()));
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newRec: HealthRecord = {
      id: `rec-${Date.now()}`,
      title,
      category,
      date,
      doctor: doctor || 'Dr. Sarah Chen',
      tag: 'AI explained',
      highlights: highlights || 'Uploaded to health records.',
      fileDetails: `${category} • ${date}`
    };

    onAddRecord(newRec);
    setIsModalOpen(false);
    setTitle('');
    setHighlights('');
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1c2c21]">Health records</h1>
          <p className="text-sm text-[#5d6f61] mt-0.5">
            Your medical records, all in one place.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#2c4a34] hover:bg-[#203626] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add record</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#dce6dd] rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2c4a34]/30 focus:border-[#2c4a34]"
          />
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((rec) => (
          <div
            key={rec.id}
            className="bg-white p-5 rounded-2xl border border-[#dce6dd] hover:shadow-sm transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <span className="text-[11px] font-semibold text-[#2c4a34] bg-[#e4ede5] px-2.5 py-0.5 rounded-full">
                  {rec.category}
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#d8e6d9] text-[#2c4a34]">
                  {rec.tag}
                </span>
              </div>

              <h3 className="text-base font-semibold text-[#1a2c20]">{rec.title}</h3>
              <p className="text-xs text-[#526456] mt-2 line-clamp-2 leading-relaxed">
                {rec.highlights}
              </p>

              <div className="mt-4 pt-3 border-t border-[#edf3ed] grid grid-cols-2 gap-2 text-xs text-[#637667]">
                <div className="flex items-center gap-1.5 truncate">
                  <Calendar className="w-3.5 h-3.5 text-[#3b5e44]" />
                  <span>{rec.date}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <User className="w-3.5 h-3.5 text-[#3b5e44]" />
                  <span className="truncate">{rec.doctor || 'Dr. Sarah Chen'}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs border-t border-[#f0f4f0]">
              <span className="text-[11px] text-[#788a7c]">{rec.fileDetails}</span>
              <button
                onClick={() => onOpenReportById('rep-1')}
                className="text-[#2c4a34] font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View report</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#dce6dd]">
            <h2 className="text-lg font-bold text-[#1a2c20] mb-1">Add Medical Record</h2>
            <form onSubmit={handleCreate} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-[#293c2e] mb-1">Record Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual health checkup"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#293c2e] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34] bg-white"
                  >
                    <option value="Lab report">Lab report</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Imaging">Imaging</option>
                    <option value="Vaccination">Vaccination</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#293c2e] mb-1">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#293c2e] mb-1">Doctor / Clinic</label>
                <input
                  type="text"
                  placeholder="Dr. Sarah Chen"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#edf3ed]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#2c4a34] text-white rounded-xl hover:bg-[#203626]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
