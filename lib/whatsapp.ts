import { siteConfig } from './site-config';

/**
 * Build a wa.me URL from a message string using the configured WhatsApp number.
 * The message is properly URL-encoded.
 */
export function buildWaLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodedMessage}`;
}

/**
 * Build a product inquiry message in Indonesian.
 * Example: "Halo VELVET, saya tertarik dengan Essential Crew Neck. Apakah masih tersedia?"
 */
export function buildProductInquiryMessage(productName: string): string {
  return `Halo VELVET, saya tertarik dengan ${productName}. Apakah masih tersedia?`;
}

/**
 * Build a WhatsApp link for a product inquiry.
 */
export function buildProductInquiryLink(productName: string): string {
  return buildWaLink(buildProductInquiryMessage(productName));
}