const DISTRICTS = [
  'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
  'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga',
  'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan',
  'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal',
  'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga',
  'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara', 'Vijayapura', 'Yadgir',
];

export default function DistrictsPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">🗺 Karnataka Districts</h1>
      <p className="text-gray-600 -mt-4">All 31 districts of Karnataka — detailed information coming soon.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DISTRICTS.map((district) => (
          <div key={district} className="card p-4 text-center hover:border-[var(--color-primary)] border-2 border-transparent transition-all cursor-pointer">
            <span className="text-2xl block mb-1">📍</span>
            <h3 className="font-semibold">{district}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
