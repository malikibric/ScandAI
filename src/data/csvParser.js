// Parses the TE-medlemmar CSV into structured company objects
// Used for the full member search/network view

export function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseMemberCSV(csvText) {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  const members = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const f = parseCSVLine(lines[i]);

    const name = f[4] || f[3] || '';
    if (!name) continue;

    const totalEmployees = parseInt(f[8]) || 0;
    const sniCode = f[11] || '';

    members.push({
      id: f[0] || `member_${i}`,
      name: name.replace(/ AB$| HB$| KB$/, '').trim() || name,
      fullName: name,
      legalName: f[3] || '',
      orgNr: f[5] || '',
      membership: f[7] || '',
      employees: totalEmployees,
      sniCode,
      sector: sniCode.replace(/^\d+\s*/, ''),
      postalCode: f[13] || '',
      city: (f[14] || '').charAt(0) + (f[14] || '').slice(1).toLowerCase(),
      email: f[15] || '',
      ceo: f[21] || '',
      ceoEmail: f[22] || '',
      municipality: f[23] || '',
    });
  }

  return members.sort((a, b) => b.employees - a.employees);
}

// Sector category mapping from SNI codes
export function getSectorCategory(sniCode) {
  const code = sniCode?.substring(0, 2);
  const map = {
    '10': 'Food & Beverage', '13': 'Textiles', '16': 'Wood Products',
    '17': 'Paper & Pulp', '20': 'Chemicals', '22': 'Rubber & Plastics',
    '23': 'Construction Materials', '24': 'Metals & Steel',
    '25': 'Metal Products', '26': 'Electronics & Optics',
    '27': 'Electrical Equipment', '28': 'Machinery & Equipment',
    '29': 'Automotive', '30': 'Aerospace & Marine',
    '31': 'Furniture', '32': 'Other Manufacturing',
    '33': 'Repair & Installation', '35': 'Energy & Utilities',
    '38': 'Waste & Recycling', '41': 'Construction',
    '42': 'Civil Engineering', '43': 'Specialized Construction',
    '45': 'Vehicle Trade', '46': 'Wholesale Trade',
    '49': 'Transport', '52': 'Warehousing & Logistics',
    '58': 'Publishing', '61': 'Telecommunications',
    '62': 'Software & IT', '63': 'Information Services',
    '70': 'Management Consulting', '71': 'Engineering & Architecture',
    '72': 'R&D', '74': 'Design & Consulting',
    '77': 'Rental & Leasing', '80': 'Security',
    '81': 'Facility Services', '82': 'Business Support',
  };
  return map[code] || 'Industrial Services';
}
