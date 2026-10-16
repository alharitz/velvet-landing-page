import { siteConfig } from './site-config';
import { formatIDR, type Product } from './products';

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

/**
 * Build a product order message in Indonesian for WhatsApp.
 * Includes product name, selected size (if any), price, and product page URL.
 * Example: "Halo VELVET, saya tertarik dengan "Essential Crew Neck", ukuran M. Harga: Rp 590.000. Link: https://velvet.example/collection/essential-crew-neck. Apakah masih tersedia?"
 */
export function buildProductOrderMessage(product: Product, size: string | undefined, productUrl: string): string {
  let msg = `Halo VELVET, saya tertarik dengan "${product.name}"`;
  if (size) {
    msg += `, ukuran ${size}`;
  } else {
    msg += ", mohon info ketersediaan ukuran";
  }
  msg += `. Harga: ${formatIDR(product.price)}. Link: ${productUrl}`;
  msg += ". Apakah masih tersedia?";
  return msg;
}

/**
 * Build a WhatsApp link for a product order.
 */
export function buildProductOrderLink(product: Product, size: string | undefined, productUrl: string): string {
  return buildWaLink(buildProductOrderMessage(product, size, productUrl));
}