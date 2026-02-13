const FALLBACK_SITE_URL = 'https://reiki-practice.ch'

function stripTrailingSlash(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim()
  if (/^https?:\/\//.test(trimmed)) {
    return stripTrailingSlash(trimmed)
  }

  return stripTrailingSlash(`https://${trimmed}`)
}

function parseSocialUrls(value: string | undefined): string[] {
  if (!value) {
    return []
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function toTelHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return `tel:${cleaned}`
}

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL)
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+41 00 000 00 00'

export const practiceProfile = {
  siteUrl,
  businessName: process.env.NEXT_PUBLIC_PRACTICE_NAME || 'Reiki Practice',
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || 'The Atelier',
  practitionerName: process.env.NEXT_PUBLIC_PRACTITIONER_NAME || 'Oleg',
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@reiki-practice.ch',
    phoneDisplay: contactPhone,
    phoneHref: toTelHref(contactPhone),
    street: process.env.NEXT_PUBLIC_CONTACT_STREET || 'Sample Street 12',
    postalCode: process.env.NEXT_PUBLIC_CONTACT_POSTAL_CODE || '8000',
    city: process.env.NEXT_PUBLIC_CONTACT_CITY || 'Zürich',
    country: process.env.NEXT_PUBLIC_CONTACT_COUNTRY || 'Switzerland',
    countryCode: process.env.NEXT_PUBLIC_CONTACT_COUNTRY_CODE || 'CH',
    latitude: parseNumber(process.env.NEXT_PUBLIC_CONTACT_LATITUDE, 47.3769),
    longitude: parseNumber(process.env.NEXT_PUBLIC_CONTACT_LONGITUDE, 8.5417),
  },
  openingHours: {
    weekdays: process.env.NEXT_PUBLIC_HOURS_WEEKDAYS || '09:00 - 19:00',
    saturday: process.env.NEXT_PUBLIC_HOURS_SATURDAY || '10:00 - 16:00',
    sunday: process.env.NEXT_PUBLIC_HOURS_SUNDAY || 'closed',
    schema: [
      process.env.NEXT_PUBLIC_HOURS_SCHEMA_WEEKDAYS || 'Mo-Fr 09:00-19:00',
      process.env.NEXT_PUBLIC_HOURS_SCHEMA_SATURDAY || 'Sa 10:00-16:00',
    ],
  },
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || '',
  socialUrls: parseSocialUrls(process.env.NEXT_PUBLIC_SOCIAL_URLS),
}

export const practiceAddressLine = `${practiceProfile.contact.street}, ${practiceProfile.contact.postalCode} ${practiceProfile.contact.city}, ${practiceProfile.contact.country}`
