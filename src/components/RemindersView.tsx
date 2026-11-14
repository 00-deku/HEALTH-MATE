import React, { useState } from 'react';
import { 
  Pill, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  Plus, 
  ChevronRight,
  User
} from 'lucide-react';
import { Medication, AppointmentReminder } from '../types';
import confetti from 'canvas-confetti';

interface RemindersViewProps {
  medications: Medication[];
  appointments: AppointmentReminder[];
  onToggleMedication: (id: string) => void;
  onAddMedication: (med: Medication) => void;
  onAddAppointment: (apt: AppointmentReminder) => void;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  medications,
  appointments,
  onToggleMedication,
  onAddMedication,
  onAddAppointment
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'meds' | 'appointments'>('all');
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);
  const [isAptModalOpen, setIsAptModalOpen] = useState(false);

  // New med state
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medTime, setMedTime] = useState('9:00 AM');
  const [medInstructions, setMedInstructions] = useState('As prescribed • After breakfast');

  // New apt state
  const [aptDoctor, setAptDoctor] = useState('');
  const [aptSpecialty, setAptSpecialty] = useState('');
  const [aptDate, setAptDate] = useState('16 Nov');
  const [aptTime, setAptTime] = useState('10:30 AM');
  const [aptFacility, setAptFacility] = useState('City Medical Center');

  const handleMedToggle = (id: string, currentlyTaken: boolean) => {
    onToggleMedication(id);
    if (!currentlyTaken) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#2c4a34', '#60866b', '#a3cca8']
      });
    }
  };

  const handleCreateMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName) return;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: medName,
      dosage: medDosage || 'As prescribed',
      instructions: medInstructions,
      frequency: 'Once daily',
      timeOfDay: [medTime],
      takenToday: false,
      streakDays: 0,
      totalDays: 30,
      purpose: 'Prescribed medication'
    };

    onAddMedication(newMed);
    setIsMedModalOpen(false);
    setMedName('');
    setMedDosage('');
  };

  const handleCreateApt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aptDoctor) return;

    const newApt: AppointmentReminder = {
      id: `apt-${Date.now()}`,
      title: `${aptSpecialty || 'Consultation'} with ${aptDoctor}`,
      doctor: aptDoctor,
      specialty: aptSpecialty || 'Primary Care',
      facility: aptFacility,
      date: aptDate,
      time: aptTime,
      isUpcoming: true,
      locationAddress: aptFacility
    };

    onAddAppointment(newApt);
    setIsAptModalOpen(false);
    setAptDoctor('');
    setAptSpecialty('');
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1a2c20]">Reminders</h1>
          <p className="text-sm text-[#5d6f61] mt-0.5">
            Stay on top of your routine and upcoming visits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMedModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#2c4a34] hover:bg-[#203626] text-white px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition cursor-pointer shadow-sm"
          >
            <Pill className="w-4 h-4" />
            <span>Add Medicine</span>
          </button>
          <button
            onClick={() => setIsAptModalOpen(true)}
            className="flex items-center gap-1.5 bg-white hover:bg-[#f1f6f1] text-[#2c4a34] border border-[#d5e2d7] px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition cursor-pointer shadow-sm"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Add Appointment</span>
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-[#e1ece2] mb-6 text-xs font-semibold text-[#576b5b]">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-3 border-b-2 transition ${
            activeTab === 'all' ? 'border-[#2c4a34] text-[#2c4a34]' : 'border-transparent hover:text-[#2c4a34]'
          }`}
        >
          All ({medications.length + appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('meds')}
          className={`pb-3 px-3 border-b-2 transition ${
            activeTab === 'meds' ? 'border-[#2c4a34] text-[#2c4a34]' : 'border-transparent hover:text-[#2c4a34]'
          }`}
        >
          Active medicines ({medications.length})
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 px-3 border-b-2 transition ${
            activeTab === 'appointments' ? 'border-[#2c4a34] text-[#2c4a34]' : 'border-transparent hover:text-[#2c4a34]'
          }`}
        >
          Appointments ({appointments.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medication Schedule Column */}
        {(activeTab === 'all' || activeTab === 'meds') && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1f3123] flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#35593c]" />
              Active Medicines
            </h3>

            <div className="space-y-3">
              {medications.map((med) => (
                <div
                  key={med.id}
                  className={`p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${
                    med.takenToday
                      ? 'bg-[#f4f8f4] border-[#d5e2d7] opacity-85'
                      : 'bg-white border-[#dce6dd] shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleMedToggle(med.id, med.takenToday)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center border transition mt-0.5 cursor-pointer ${
                        med.takenToday
                          ? 'bg-[#2c4a34] border-[#2c4a34] text-white'
                          : 'border-[#b8cbbd] hover:border-[#2c4a34] text-transparent hover:text-gray-300'
                      }`}
                      title={med.takenToday ? 'Mark as not taken' : 'Mark as taken'}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-semibold ${med.takenToday ? 'text-[#35483a] line-through' : 'text-[#1c2e21]'}`}>
                          {med.name}
                        </h4>
                      </div>
                      <p className="text-xs text-[#5a6d5e] mt-1">
                        {med.instructions}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-[11px] text-[#6d8071]">
                        <Clock className="w-3 h-3 text-[#3d5e46]" />
                        <span>{med.timeOfDay.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Column */}
        {(activeTab === 'all' || activeTab === 'appointments') && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1f3123] flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#35593c]" />
              Upcoming Appointments
            </h3>

            <div className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 bg-white rounded-2xl border border-[#dce6dd] shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="text-base font-semibold text-[#1a2c20]">
                        {apt.title}
                      </h4>
                      <p className="text-xs text-[#526456] mt-1">
                        {apt.doctor} • {apt.facility}
                      </p>
                    </div>

                    <div className="bg-[#f0f5f1] border border-[#d6e2d8] rounded-xl px-3 py-1.5 text-center shrink-0">
                      <span className="text-xs font-bold text-[#2c4a34] block">{apt.date}</span>
                      <span className="text-[11px] text-[#556958]">{apt.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Medication Modal */}
      {isMedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#dce6dd]">
            <h2 className="text-lg font-bold text-[#1a2c20] mb-1">Add Medicine Reminder</h2>
            <form onSubmit={handleCreateMed} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-[#293c2e] mb-1">Medicine Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daily medicine"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#293c2e] mb-1">Instructions</label>
                <input
                  type="text"
                  placeholder="As prescribed • After breakfast"
                  value={medInstructions}
                  onChange={(e) => setMedInstructions(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#293c2e] mb-1">Time</label>
                <input
                  type="text"
                  value={medTime}
                  onChange={(e) => setMedTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#edf3ed]">
                <button
                  type="button"
                  onClick={() => setIsMedModalOpen(false)}
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

      {/* Add Appointment Modal */}
      {isAptModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#dce6dd]">
            <h2 className="text-lg font-bold text-[#1a2c20] mb-1">Add Appointment</h2>
            <form onSubmit={handleCreateApt} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-[#293c2e] mb-1">Doctor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Sarah Chen"
                  value={aptDoctor}
                  onChange={(e) => setAptDoctor(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#293c2e] mb-1">Date & Time</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    placeholder="16 Nov"
                    className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                  />
                  <input
                    type="text"
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    placeholder="10:30 AM"
                    className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#293c2e] mb-1">Facility</label>
                <input
                  type="text"
                  value={aptFacility}
                  onChange={(e) => setAptFacility(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#dce6dd] rounded-xl focus:outline-none focus:border-[#2c4a34]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#edf3ed]">
                <button
                  type="button"
                  onClick={() => setIsAptModalOpen(false)}
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
