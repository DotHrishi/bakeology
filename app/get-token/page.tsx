"use client";

import { useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "@/lib/firebase";

export default function GetTokenPage() {
  useEffect(() => {
    async function generateToken() {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("Permission denied");
          return;
        }

        const messaging = getMessaging(app);

        const token = await getToken(messaging, {
          vapidKey: "BNgWvTB7S5lICLxW1maAUM7HFP2k2-m6jUzrtQmqEJVX8hX4wkyGumMy247EXnZb2t9tXDKtF3H14Y1reBFa6rc",
        });

        console.log("YOUR FCM TOKEN:", token);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    }

    generateToken();
  }, []);

  return <div>Check console for FCM token</div>;
}
