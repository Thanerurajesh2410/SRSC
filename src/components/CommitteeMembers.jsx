import React, { useState } from 'react';
import { Users, Crown, UserCheck, FileText, UserPlus, Coins, User, Shield, Award, Maximize2, X, ExternalLink } from 'lucide-react';

const roleIconMap = {
  Crown: Crown,
  UserCheck: UserCheck,
  FileText: FileText,
  UserPlus: UserPlus,
  Coins: Coins,
  User: User
};

export default function CommitteeMembers({ t, showCertModal, setShowCertModal }) {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <section id="committee" className="py-16 md:py-24 relative bg-[#0B0B14]/80">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-tag">
            <Users className="w-4 h-4" />
            {t.committee.tag}
          </span>
          <h2 className="section-title text-white heading-telugu">
            <span className="heading-gold">{t.committee.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.committee.subtitle}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'members'
                ? 'bg-gradient-to-r from-[var(--primary-saffron)] to-[var(--primary-saffron-dark)] text-white shadow-lg'
                : 'bg-white/5 border border-[var(--border-gold)] text-gray-300 hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            {t.committee.membersTab}
          </button>
          
          <button
            onClick={() => setActiveTab('cert')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'cert'
                ? 'bg-gradient-to-r from-[var(--primary-gold)] to-[#B8860B] text-gray-900 shadow-lg'
                : 'bg-white/5 border border-[var(--border-gold)] text-gray-300 hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4" />
            {t.committee.certTab}
          </button>
        </div>

        {/* Tab 1: Members Grid */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.committee.members.map((member, idx) => {
              const RoleIcon = roleIconMap[member.icon] || User;
              const isPresident = member.role.includes('PRESIDENT') && !member.role.includes('VICE');

              return (
                <div
                  key={idx}
                  className={`gold-card flex flex-col justify-between group ${
                    isPresident ? 'border-2 border-[var(--primary-gold)] bg-gradient-to-b from-[var(--sacred-maroon)]/40 to-transparent' : ''
                  }`}
                >
                  <div>
                    {/* Header Role Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--sacred-maroon)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--primary-gold)] shadow">
                          <RoleIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--primary-gold-light)] bg-[var(--sacred-maroon)]/80 px-3 py-1 rounded-full border border-[var(--border-gold)]">
                          {member.role}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-gray-400">#0{idx + 1}</span>
                    </div>

                    {/* Member Name */}
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--primary-gold-light)] transition-colors">
                      {member.name}
                    </h3>
                    
                    <p className="text-xs text-[var(--primary-saffron)] font-medium mb-3">
                      {member.father}
                    </p>

                    {/* Details Box */}
                    <div className="space-y-2 mt-4 text-xs text-gray-300 bg-black/30 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Occupation:</span>
                        <span className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded">
                          {member.occ}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">Residential Address:</span>
                        <span className="text-gray-300 leading-snug block font-mono text-[11px]">
                          {member.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      Govt AP Regd Member
                    </span>
                    <span className="text-gray-400 font-mono">27/05/2026</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Certificate Document View */}
        {activeTab === 'cert' && (
          <div className="max-w-4xl mx-auto gold-card text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-[var(--primary-gold)]">
              <Award className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white heading-telugu">
                Government of Andhra Pradesh Registration Certificate
              </h3>
            </div>
            <p className="text-sm text-gray-300 mb-6">
              Registration No: <strong className="text-[var(--primary-saffron)]">125 of 2026</strong> • Application No: <span className="font-mono">SCR012600124698</span> • Society Registrar: Chittoor
            </p>

            <div
              className="relative rounded-2xl overflow-hidden border-2 border-[var(--border-gold)] bg-black/60 group cursor-pointer"
              onClick={() => setShowCertModal(true)}
            >
              <img
                src="/assets/registration_cert.jpg"
                alt="Government Certificate of Registration"
                className="w-full h-auto max-h-[700px] object-contain mx-auto transition-transform group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="btn-gold">
                  <Maximize2 className="w-5 h-5" />
                  Click to View Certificate In Full Resolution
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="modal-overlay" onClick={() => setShowCertModal(false)}>
          <div className="modal-content !max-w-4xl" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCertModal(false)}>
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-[var(--primary-gold-light)] mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--primary-saffron)]" />
              Official Certificate of Registration (No: 125 of 2026)
            </h3>
            <div className="rounded-xl overflow-hidden border border-[var(--border-gold)] bg-black">
              <img
                src="/assets/registration_cert.jpg"
                alt="Govt Registration Certificate Full View"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
