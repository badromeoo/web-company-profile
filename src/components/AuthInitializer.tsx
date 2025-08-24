"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import Backendless from "@/lib/backendless.client";

export default function AuthInitializer() {
  const { setCurrentUser } = useUserStore();

  useEffect(() => {
    async function checkCurrentUser() {
      try {
        const isValidLogin = await Backendless.UserService.isValidLogin();

        if (isValidLogin) {
          const user = await Backendless.UserService.getCurrentUser();
          console.log("Sesi valid, pengguna ditemukan:", user);
          setCurrentUser(user);
        } else {
          console.log("Tidak ada sesi login yang valid.");
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Gagal memeriksa status login:", error);
        setCurrentUser(null);
      }
    }

    checkCurrentUser();
  }, [setCurrentUser]);

  return null;
}
