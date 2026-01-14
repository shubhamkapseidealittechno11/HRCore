import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "default_secret_key";

export const encryptData = (data: any) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return ciphertext;
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

export const decryptData = (ciphertext: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

/**
 * Validates if a JWT token is still valid (not expired)
 * @param token - JWT token string
 * @returns boolean - true if token is valid, false if expired or invalid
 */
export const isTokenValid = (token: string): boolean => {
  try {
    // Decode JWT without verification (just to check expiration)
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token has expiration and if it's still valid
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    }
    
    // If no expiration, consider it valid (though not recommended)
    return true;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};

