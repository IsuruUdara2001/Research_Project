import admin from "firebase-admin";
import serviceAccount from "./firebaseKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 databaseURL: "https://teayieldsystem.firebaseio.com"

});

const db = admin.firestore();
export { db };
