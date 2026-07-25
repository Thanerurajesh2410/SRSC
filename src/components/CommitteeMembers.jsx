import React from 'react';
import { Crown, UserCheck, FileText, UserPlus, Coins, User, ShieldCheck, Sparkles } from 'lucide-react';

export default function CommitteeMembers({ t }) {
  const iconMap = {
    Crown: Crown,
    UserCheck: UserCheck,
    FileText: FileText,
    UserPlus: UserPlus,
    Coins: Coins,
    User: User
  };

  return (
    <section id="committee" className="py-16 md:py-24 relative bg-[#090914]">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-tag">
            <ShieldCheck className="w-4 h-4 text-[var(--primary-saffron)]" />
            {t.committee.tag}
          </span>
          <h2 className="section-title text-white heading-telugu">
            <span className="heading-gold">{t.committee.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.committee.subtitle}
          </p>
        </div>

        {/* Committee Members Cards Grid with Dynamic Animations & Highlighting */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.committee.members.map((member, idx) => {
            const IconComponent = iconMap[member.icon] || User;
            const isPresident = member.role.includes("PRESIDENT") && !member.role.includes("VICE");
            const isSecretary = member.role.includes("SECRETARY");

            return (
              <div
                key={idx}
                className={`gold-card relative flex flex-col justify-between group transform transition-all duration-500 hover:-translate-y-3 ${
                  isPresident
                    ? 'border-2 border-[#FFD700] shadow-[0_0_35px_rgba(255,215,0,0.45)] bg-gradient-to-b from-[#5C121E] via-[#3A0A11] to-[#200407]'
                    : isSecretary
                    ? 'border-2 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.3)] bg-gradient-to-b from-[#4D0F18] to-[#1D0407]'
                    : 'hover:border-[#FFD700]/90 hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]'
                }`}
              >
                {/* Glowing Corner Badge for President */}
                {isPresident && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase shadow-xl flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3 h-3 fill-black" />
                    <span>అధ్యక్షులు • Chief Leader</span>
                  </div>
                )}

                <div>
                  {/* Top Role Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl border ${
                      isPresident
                        ? 'bg-amber-400/20 text-[#FFD700] border-[#FFD700] animate-bounce'
                        : 'bg-white/10 text-amber-300 border-amber-400/30'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        isPresident
                          ? 'bg-[#FFD700] text-black font-extrabold shadow-md'
                          : 'bg-[#5C121E] text-[#FFD700] border border-[#FFD700]/40'
                      }`}>
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Member Name */}
                  <h3 className="text-xl font-black text-white heading-telugu mb-1 group-hover:text-[var(--primary-gold-light)] transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs text-amber-300 font-bold mb-3">
                    {member.father}
                  </p>

                  {/* Occupation & Address */}
                  <div className="space-y-1.5 text-xs text-gray-300 bg-black/40 p-3.5 rounded-xl border border-white/10">
                    <p><span className="text-gray-400">వృత్తి (Occupation):</span> <strong className="text-white">{member.occ}</strong></p>
                    <p><span className="text-gray-400">చిరునామా:</span> <span className="text-gray-200">{member.address}</span></p>
                  </div>
                </div>

                {/* Bottom Verified Seal */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-200/80 font-bold">
                  <span>పామినివాండ్లవూరు పాలక వర్గం</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
