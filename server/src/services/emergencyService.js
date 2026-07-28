const EMERGENCY_CONTACTS = [
  { category: 'National Emergency', name: 'Emergency Response', number: '112', icon: '🆘' },
  { category: 'Medical', name: 'Ambulance', number: '108', icon: '🚑' },
  { category: 'Medical', name: 'Health Helpline', number: '104', icon: '🏥' },
  { category: 'Medical', name: 'Blood Bank', number: '1910', icon: '🩸' },
  { category: 'Fire', name: 'Fire Brigade', number: '101', icon: '🚒' },
  { category: 'Police', name: 'Police', number: '100', icon: '👮' },
  { category: 'Police', name: 'Anti-Corruption', number: '1064', icon: '🔍' },
  { category: 'Women & Children', name: 'Women Helpline', number: '1091', icon: '👩‍🦰' },
  { category: 'Women & Children', name: 'Child Helpline', number: '1098', icon: '👶' },
  { category: 'Senior Citizens', name: 'Senior Citizen Helpline', number: '14567', icon: '👴' },
  { category: 'Disaster', name: 'Disaster Management', number: '1070', icon: '🌊' },
  { category: 'Utility', name: 'Electricity (BESCOM)', number: '1912', icon: '⚡' },
  { category: 'Utility', name: 'Water Supply (BWSSB)', number: '1916', icon: '💧' },
  { category: 'Transport', name: 'Railway Enquiry', number: '139', icon: '🚂' },
  { category: 'Transport', name: 'Airport Enquiry', number: '1800-180-1539', icon: '✈️' },
  { category: 'COVID-19', name: 'COVID Helpline', number: '1075', icon: '🦠' },
];

export function getEmergencyContacts() { return EMERGENCY_CONTACTS; }
