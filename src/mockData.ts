import { MedicalReport, HealthRecord, Medication, AppointmentReminder } from './types';

// The report displayed in the design image
export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-1',
    title: 'Annual health checkup',
    type: 'Lab report',
    date: '10 Nov 2026',
    facility: 'City Medical Center',
    doctor: 'Dr. Sarah Chen',
    summary: 'Annual health checkup lab panel.',
    plainEnglishVerdict: '2 results are in range. Your vitamin D is below this lab’s reference range.',
    isRecent: true,
    fileSize: 'Sample report',
    keyFindings: [
      'Hemoglobin (13.8 g/dL) is within normal reference limits.',
      'Fasting glucose (92 mg/dL) is within healthy range.',
      'Vitamin D (24 ng/mL) is below the recommended 30–100 ng/mL lab baseline.'
    ],
    actionPoints: [
      'Discuss Vitamin D supplementation with Dr. Sarah Chen at your next checkup.',
      'Get 15 minutes of safe morning sunlight exposure.'
    ],
    questionsForDoctor: [
      'What dosage of Vitamin D should I take daily?',
      'When should we re-test this level?'
    ],
    testItems: [
      {
        name: 'Hemoglobin',
        result: 13.8,
        unit: 'g/dL',
        reference: '12.0–17.5 g/dL',
        status: 'In range',
        explanation: 'Oxygen-carrying protein in red blood cells.'
      },
      {
        name: 'Fasting glucose',
        result: 92,
        unit: 'mg/dL',
        reference: '70–99 mg/dL',
        status: 'In range',
        explanation: 'Blood sugar level after fasting.'
      },
      {
        name: 'Vitamin D',
        result: 24,
        unit: 'ng/mL',
        reference: '30–100 ng/mL',
        status: 'Below range',
        explanation: 'Essential nutrient for bone strength and immunity.'
      }
    ]
  }
];

// The exact records displayed on the design:
// 1. Annual health checkup (Lab report • 10 Nov 2026) -> AI explained
// 2. Consultation summary (Dr. Sarah Chen • 02 Nov 2026) -> Visit note
export const INITIAL_RECORDS: HealthRecord[] = [
  {
    id: 'rec-1',
    title: 'Annual health checkup',
    category: 'Lab report',
    date: '10 Nov 2026',
    doctor: 'Dr. Sarah Chen',
    tag: 'AI explained',
    highlights: 'Hemoglobin 13.8 g/dL, Fasting glucose 92 mg/dL, Vitamin D 24 ng/mL.',
    fileDetails: 'Lab report • 10 Nov 2026'
  },
  {
    id: 'rec-2',
    title: 'Consultation summary',
    category: 'Consultation',
    date: '02 Nov 2026',
    doctor: 'Dr. Sarah Chen',
    tag: 'Visit note',
    highlights: 'Consultation notes and routine wellness review.',
    fileDetails: 'Dr. Sarah Chen • 02 Nov 2026'
  }
];

// The exact active medicines displayed in the design:
// 02 Active medicines
// "Daily medicine" - As prescribed • After breakfast (Today, 9:00 AM)
export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Daily medicine',
    dosage: 'As prescribed',
    instructions: 'As prescribed • After breakfast',
    frequency: 'Once daily',
    timeOfDay: ['9:00 AM'],
    takenToday: true,
    streakDays: 1,
    totalDays: 30,
    purpose: 'Morning prescription'
  },
  {
    id: 'med-2',
    name: 'Evening prescription',
    dosage: 'As prescribed',
    instructions: 'As prescribed • After dinner with water',
    frequency: 'Once daily',
    timeOfDay: ['8:30 PM'],
    takenToday: false,
    streakDays: 1,
    totalDays: 30,
    purpose: 'Evening prescription'
  }
];

// The exact appointment displayed in the design:
// "Next appointment: 16 Nov Monday · 10:30 AM"
// "General health checkup: Dr. Sarah Chen · City Medical Center"
export const INITIAL_APPOINTMENTS: AppointmentReminder[] = [
  {
    id: 'apt-1',
    title: 'General health checkup',
    doctor: 'Dr. Sarah Chen',
    specialty: 'Primary Care',
    facility: 'City Medical Center',
    date: '16 Nov',
    time: 'Monday · 10:30 AM',
    notes: 'Follow-up on annual checkup and Vitamin D review.',
    isUpcoming: true,
    locationAddress: 'City Medical Center'
  }
];
