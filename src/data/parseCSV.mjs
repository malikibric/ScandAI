// Script to parse TE-medlemmar.csv and generate mockData.js with real company data
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csv = readFileSync(join(__dirname, 'TE-medlemmar.csv'), 'utf-8');
const lines = csv.split('\n');

// Parse header
const header = lines[0];
// Because CSV can have commas inside quotes, let's do a proper parse
function parseCSVLine(line) {
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

const headers = parseCSVLine(header);
console.log('Headers:', headers.map((h, i) => `${i}: ${h}`).join('\n'));

const companies = [];
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  const fields = parseCSVLine(lines[i]);
  
  const name = fields[4] || fields[3] || ''; // Marknadsnamn or Juridiskt namn
  const legalName = fields[3] || '';
  const orgNr = fields[5] || '';
  const membership = fields[7] || '';
  const totalEmployees = parseInt(fields[8]) || 0;
  const sniCode = fields[11] || '';
  const postalCode = fields[13] || '';
  const city = fields[14] || '';
  const email = fields[15] || '';
  const searchName = fields[16] || '';
  const ceo = fields[21] || '';
  const ceoEmail = fields[22] || '';
  const municipality = fields[23] || '';

  if (!name) continue;

  companies.push({
    name: name.replace(/ AB$| HB$| KB$/, '').trim() || name,
    fullName: name,
    legalName,
    orgNr,
    membership,
    totalEmployees,
    sniCode,
    postalCode,
    city,
    email,
    searchName: searchName || name,
    ceo,
    ceoEmail,
    municipality,
  });
}

console.log(`\nTotal companies parsed: ${companies.length}`);

// Sort by employees
companies.sort((a, b) => b.totalEmployees - a.totalEmployees);

// Print top 30
console.log('\nTop 30 by employees:');
companies.slice(0, 30).forEach((c, i) => {
  console.log(`${i + 1}. ${c.fullName} — ${c.totalEmployees} employees — ${c.city} — SNI: ${c.sniCode.substring(0, 60)}`);
});

// Extract unique sectors from SNI codes
const sectorMap = {};
companies.forEach(c => {
  if (c.sniCode) {
    const desc = c.sniCode.replace(/^\d+\s*/, '');
    if (!sectorMap[desc]) sectorMap[desc] = 0;
    sectorMap[desc]++;
  }
});

console.log('\nTop sectors:');
Object.entries(sectorMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([sector, count]) => {
    console.log(`  ${count}x ${sector}`);
  });

// Unique cities
const cityCount = {};
companies.forEach(c => {
  if (c.city) {
    if (!cityCount[c.city]) cityCount[c.city] = 0;
    cityCount[c.city]++;
  }
});

console.log('\nTop cities:');
Object.entries(cityCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([city, count]) => {
    console.log(`  ${count}x ${city}`);
  });
