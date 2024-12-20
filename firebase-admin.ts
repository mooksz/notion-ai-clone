import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceKey = require("@/service_key.json");

const app =
  getApps().length === 0
    ? initializeApp({ credential: cert(serviceKey) })
    : getApp();

const adminDb = getFirestore(app);

export { adminDb, app as adminApp };
