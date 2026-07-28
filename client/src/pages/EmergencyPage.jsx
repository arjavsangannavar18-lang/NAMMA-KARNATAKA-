const EMERGENCY_CONTACTS = [
  { name: 'Police', number: '112', icon: '👮' },
  { name: 'Ambulance', number: '108', icon: '🚑' },
  { name: 'Fire', number: '101', icon: '🚒' },
  { name: 'Women Helpline', number: '1091', icon: '👩‍🦰' },
  { name: 'Child Helpline', number: '1098', icon: '👶' },
  { name: 'Disaster Management', number: '1070', icon: '🆘' },
  { name: 'COVID Helpline', number: '104', icon: '🏥' },
  { name: 'Railway Enquiry', number: '139', icon: '🚂' },
  { name: 'Electricity (BESCOM)', number: '1912', icon: '⚡' },
  { name: 'Blood Bank', number: '1910', icon: '🩸' },
  { name: 'Senior Citizen', number: '14567', icon: '👴' },
  { name: 'Anti-Corruption', number: '1064', icon: '🔍' },
];

export default function EmergencyPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">🚨 Emergency Contacts</h1>
      <p className="text-gray-600 -mt-4">Official Karnataka emergency helplines — tap any number to call.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {EMERGENCY_CONTACTS.map((contact) => (
          <a key={contact.number} href={`tel:${contact.number}`}
            className="card p-5 text-center hover:no-underline hover:border-[var(--color-primary)] border-2 border-transparent transition-all">
            <span className="text-3xl block mb-2">{contact.icon}</span>
            <h3 className="font-bold text-lg">{contact.name}</h3>
            <p className="text-2xl font-bold text-[var(--color-primary)] mt-1">{contact.number}</p>
          </a>
        ))}
      </div>
      <div className="card bg-red-50 border border-red-200">
        <h2 className="font-bold text-red-800 mb-2">⚠️ Important Note</h2>
        <p className="text-red-700 text-sm">
          These numbers are sourced from official Karnataka government directories. In case of life-threatening emergency, dial <strong>112</strong>.
        </p>
      </div>
    </div>
  );
}
