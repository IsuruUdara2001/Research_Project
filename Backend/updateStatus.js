import { db } from "../app/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { evaluateStatus } from "./statusChecker";

export async function updateSystemStatus() {
    const docRef = doc(db, "latest_readings", "current");
    const snap = await getDoc(docRef);

    if (!snap.exists()) return;

    const data = snap.data();
    const status = evaluateStatus(data);

    await updateDoc(docRef, { overall_status: status });
}
