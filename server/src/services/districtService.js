const KARNATAKA_DISTRICTS = [
  { name: 'Bagalkot', headquarters: 'Bagalkot', region: 'North Karnataka', area: 6575, population: 1889752 },
  { name: 'Ballari', headquarters: 'Ballari', region: 'North Karnataka', area: 8461, population: 2452595 },
  { name: 'Belagavi', headquarters: 'Belagavi', region: 'North Karnataka', area: 13415, population: 4779661 },
  { name: 'Bengaluru Rural', headquarters: 'Bengaluru', region: 'South Karnataka', area: 2298, population: 990923 },
  { name: 'Bengaluru Urban', headquarters: 'Bengaluru', region: 'South Karnataka', area: 2196, population: 9621551 },
  { name: 'Bidar', headquarters: 'Bidar', region: 'North Karnataka', area: 5448, population: 1703300 },
  { name: 'Chamarajanagar', headquarters: 'Chamarajanagar', region: 'South Karnataka', area: 5101, population: 1020791 },
  { name: 'Chikkaballapur', headquarters: 'Chikkaballapur', region: 'South Karnataka', area: 4244, population: 1255104 },
  { name: 'Chikkamagaluru', headquarters: 'Chikkamagaluru', region: 'South Karnataka', area: 7201, population: 1137961 },
  { name: 'Chitradurga', headquarters: 'Chitradurga', region: 'South Karnataka', area: 8440, population: 1659456 },
  { name: 'Dakshina Kannada', headquarters: 'Mangaluru', region: 'Coastal Karnataka', area: 4861, population: 2089649 },
  { name: 'Davanagere', headquarters: 'Davanagere', region: 'South Karnataka', area: 5924, population: 1945497 },
  { name: 'Dharwad', headquarters: 'Dharwad', region: 'North Karnataka', area: 4265, population: 1847023 },
  { name: 'Gadag', headquarters: 'Gadag', region: 'North Karnataka', area: 4656, population: 1064570 },
  { name: 'Hassan', headquarters: 'Hassan', region: 'South Karnataka', area: 6814, population: 1776421 },
  { name: 'Haveri', headquarters: 'Haveri', region: 'North Karnataka', area: 4823, population: 1597668 },
  { name: 'Kalaburagi', headquarters: 'Kalaburagi', region: 'North Karnataka', area: 10951, population: 2566326 },
  { name: 'Kodagu', headquarters: 'Madikeri', region: 'South Karnataka', area: 4102, population: 554519 },
  { name: 'Kolar', headquarters: 'Kolar', region: 'South Karnataka', area: 3969, population: 1536401 },
  { name: 'Koppal', headquarters: 'Koppal', region: 'North Karnataka', area: 7189, population: 1389920 },
  { name: 'Mandya', headquarters: 'Mandya', region: 'South Karnataka', area: 4961, population: 1805769 },
  { name: 'Mysuru', headquarters: 'Mysuru', region: 'South Karnataka', area: 6854, population: 3001127 },
  { name: 'Raichur', headquarters: 'Raichur', region: 'North Karnataka', area: 6827, population: 1928812 },
  { name: 'Ramanagara', headquarters: 'Ramanagara', region: 'South Karnataka', area: 3556, population: 1082636 },
  { name: 'Shivamogga', headquarters: 'Shivamogga', region: 'South Karnataka', area: 8478, population: 1752753 },
  { name: 'Tumakuru', headquarters: 'Tumakuru', region: 'South Karnataka', area: 10597, population: 2678980 },
  { name: 'Udupi', headquarters: 'Udupi', region: 'Coastal Karnataka', area: 3882, population: 1177361 },
  { name: 'Uttara Kannada', headquarters: 'Karwar', region: 'Coastal Karnataka', area: 10291, population: 1437169 },
  { name: 'Vijayanagara', headquarters: 'Hospete', region: 'North Karnataka', area: 5644, population: 1329670 },
  { name: 'Vijayapura', headquarters: 'Vijayapura', region: 'North Karnataka', area: 10494, population: 2177331 },
  { name: 'Yadgir', headquarters: 'Yadgir', region: 'North Karnataka', area: 5270, population: 1174271 },
];

export function getDistrictList() {
  return KARNATAKA_DISTRICTS.map(({ name, headquarters, region }) => ({ name, headquarters, region }));
}

export async function getDistrictInfo(districtName) {
  const district = KARNATAKA_DISTRICTS.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
  if (!district) { const err = new Error(`District "${districtName}" not found`); err.statusCode = 404; throw err; }
  return { ...district, source: 'Census of India 2011', note: 'Population and area data from the 2011 Census.' };
}
