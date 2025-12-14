// app/index.js
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Index() {
    useEffect(() => {
        const checkFirestore = async () => {
            try {
                // Optional: just log Firestore data for debugging
                const latestSnap = await getDocs(collection(db, "latest_readings"));
                latestSnap.forEach(doc => console.log("latest_readings:", doc.id, doc.data()));

                const historySnap = await getDocs(collection(db, "history"));
                historySnap.forEach(doc => console.log("history:", doc.id, doc.data()));

                const commandsSnap = await getDocs(collection(db, "motor_commands"));
                commandsSnap.forEach(doc => console.log("motor_commands:", doc.id, doc.data()));
            } catch (error) {
                console.error("Firestore read error:", error);
            }
        };

        checkFirestore();
    }, []);

    // Always redirect to Login page first
    return <Redirect href="/Login" />;
}
