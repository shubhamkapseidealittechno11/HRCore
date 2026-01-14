"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect, useRef } from "react";
import { setUser, setInitialized } from "@/store/slices/authSlice";
import { decryptData } from "@/lib/utils";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initialized.current) return;
    initialized.current = true;

    // Rehydrate auth state from localStorage
    const rehydrateAuth = async () => {
      try {
        const encryptedUserData = localStorage.getItem("userData");
        const token = localStorage.getItem("token");

        if (encryptedUserData && token) {
          // First, validate token is not expired
          const { isTokenValid } = await import("@/lib/utils");
          
          if (!isTokenValid(token)) {
            // Token expired, clear everything
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            console.warn("⚠️ Token expired, session cleared");
            return;
          }

          const decryptedUserData = decryptData(encryptedUserData);
          
          if (decryptedUserData) {
            // Restore user session in Redux
            store.dispatch(setUser(decryptedUserData));
            console.log("✅ Session restored from localStorage");
          } else {
            // If decryption fails, clear invalid data
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            console.warn("⚠️ Failed to decrypt user data, cleared localStorage");
          }
        }
      } catch (error) {
        console.error("❌ Error rehydrating auth state:", error);
        // Clear potentially corrupted data
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
      } finally {
        store.dispatch(setInitialized(true));
      }
    };

    rehydrateAuth();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
