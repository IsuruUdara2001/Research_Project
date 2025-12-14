import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../firebase';   // adjust path if needed
import { collection, getDocs } from 'firebase/firestore';

export default function TestFirestore() {

    useEffect(() => {
        const checkFirestore = async () => {
            try {
                const snapshot = await getDocs(collection(db, "latest_readings"));
                snapshot.forEach(doc => {
                    console.log(doc.id, doc.data());
                });
            } catch (error) {
                console.log("Firestore read error:", error);
            }
        };

        checkFirestore();
    }, []);

    return (
        <View>
            <Text>Check console for Firestore data</Text>
        </View>
    );
}
