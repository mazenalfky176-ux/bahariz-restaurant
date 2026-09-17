import React, { useState } from 'react';
import { BRANCHES_DATA } from '../data/menuData';
import { Branch } from '../types';
import {
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Bike,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface BranchesSectionProps {
  onSelectBranchForOrder: (branch: Branch) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  onSelectBranchForOrder,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section id="branches" className="py-24 sm:py-32 relative bg-[#0D0D11] border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>05 / فروعنا في خدمتك</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            أرقام فروع بهاريز <span className="text-[#F59E0B]">للدليفري والتوصيل</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            مستنينكم تنورونا في جميع الفروع أو اطلب دليفري يوصلك سخن ومقرمش لحد باب بيتك.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES_DATA.map((branch, index) => {
            const hasPhone = !!branch.phone;
            const isCopied = copiedId === branch.id;

            return (
              <div
                key={branch.id}
                className="bg-[#141418] rounded-2xl border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-300 p-6 flex flex-col justify-between text-right group shadow-lg hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Branch Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-full bg-[#1F1F26] text-[#F59E0B] font-bold text-xs flex items-center justify-center border border-white/5">
                    {index + 1}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    مفتوح الآن
                  </span>
                </div>

                {/* Branch Info */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#F59E0B] transition-colors">
                    {branch.name}
                  </h3>

                  <div className="flex items-start gap-2 text-neutral-300 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400 text-xs">
                    <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>مواعيد العمل: {branch.hours}</span>
                  </div>

                  {/* Phone Display Box */}
                  <div className="pt-2">
                    {hasPhone ? (
                      <div className="bg-[#1A1A20] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 block">رقم الدليفري</span>
                          <span className="text-base font-black text-white font-mono tracking-wider">
                            {branch.phone}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopyPhone(branch.phone!, branch.id)}
                          aria-label="نسخ رقم الهاتف"
                          className="p-2 rounded-lg bg-[#24242C] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="نسخ الرقم"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="bg-[#1A1A20] p-3 rounded-xl border border-white/5 text-center text-xs font-medium text-neutral-400">
                        متاح للزيارة والصالة داخل المجمع
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  {hasPhone ? (
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${branch.phone}`}
                        className="py-2.5 px-3 rounded-xl text-xs font-bold bg-[#1E1E26] hover:bg-[#282834] text-white flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>اتصل الآن</span>
                      </a>

                      <button
                        onClick={() => onSelectBranchForOrder(branch)}
                        className="py-2.5 px-3 rounded-xl text-xs font-bold bg-[#F59E0B] hover:bg-[#FBBF24] text-black flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>اطلب دليفري</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onSelectBranchForOrder(branch)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#F59E0B] hover:bg-[#FBBF24] text-black flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>اطلب تجهيز استلام من الفرع</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
