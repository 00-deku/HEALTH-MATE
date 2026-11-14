import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface HomePageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAuth }) => {
  return (
    <div className="min-h-screen bg-[#f4f7f4] text-[#243329] flex flex-col selection:bg-[#34533c] selection:text-white">
      {/* Navigation Top Bar */}
      <header className="sticky top-0 z-30 bg-[#f4f7f4]/90 backdrop-blur-md border-b border-[#dbe6dc] px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with custom HealthMate medical cross + leaf icon without surrounding card container */}
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

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-xs md:text-sm font-semibold text-[#2c4a34] hover:text-[#18281d] px-3 py-2 transition cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="bg-[#2c4a34] hover:bg-[#203626] text-white px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10 md:py-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#e4ede5] border border-[#cfdfd1] rounded-full text-xs font-semibold text-[#2c4a34]">
              <Sparkles className="w-3.5 h-3.5 text-[#2c4a34]" />
              <span>AI-Powered Medical Intelligence & Patient Vault</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1a2c20] tracking-tight leading-[1.15]">
              Medical terms shouldn’t be a mystery.
            </h1>

            <p className="text-base sm:text-lg text-[#526555] max-w-xl leading-relaxed">
              When you get a blood test or imaging scan, it’s full of numbers and complex words. 
              HEALTHMATE turns confusing medical reports into clear, compassionate English — keeping your health records, reminders, and peace of mind in one secure place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenAuth('signup')}
                className="bg-[#2c4a34] hover:bg-[#203626] text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition cursor-pointer shadow-md flex items-center justify-center gap-2 text-center"
              >
                <span>Create free account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="bg-white hover:bg-[#eef4ef] text-[#2c4a34] border border-[#cbdacd] px-6 py-3.5 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 text-center"
              >
                <span>Log in to your workspace</span>
              </button>
            </div>

            {/* Quick trust checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#dce6dd] text-xs text-[#526456]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#355b3d] shrink-0" />
                <span>Plain English summaries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#355b3d] shrink-0" />
                <span>Questions for doctor visits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#355b3d] shrink-0" />
                <span>Medicine & clinic reminders</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual featuring Doctor & Patient Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden border border-[#d2dfd4] shadow-xl bg-white relative">
                <img
                  src="/assets/doctor-patient.jpg"
                  alt="Doctor reviewing medical scan tablet with patient"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-top"
                />

                {/* Overlaid Gradient & Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b2b1f]/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/40 text-[#1b2b1f] shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#2c4a34] text-white flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold">Annual health checkup</span>
                          <span className="text-[10px] bg-[#dbe6dc] text-[#2c4a34] px-2 py-0.5 rounded font-semibold">
                            AI explained
                          </span>
                        </div>
                        <p className="text-[11px] text-[#4f6453] mt-1 leading-snug">
                          "2 results are in range. Your Vitamin D is below this lab's baseline."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mini Decorative Badge */}
              <div className="absolute -top-4 -left-4 bg-[#e9f0ea] border border-[#cbdbce] rounded-2xl p-3 shadow-md hidden sm:flex items-center gap-2.5 text-xs text-[#2c4a34] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#2c4a34]" />
                <span>Encrypted Patient Vault</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Legal & Medical Notice */}
      <footer className="border-t border-[#dbe6dc] py-5 px-6 text-center text-xs text-[#637667] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#355b3d]" />
        <span>HEALTHMATE helps you understand your health. It does not diagnose conditions or replace professional medical advice.</span>
      </footer>
    </div>
  );
};
