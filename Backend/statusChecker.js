export function evaluateStatus(data) {
    let { temp, vibration, rpm } = data;

    // Convert if values are strings
    temp = Number(temp);
    vibration = Number(vibration);
    rpm = Number(rpm);

    let score = 0;

    // === Temperature Check ===
    if (temp > 90) score += 2;
    else if (temp > 70) score += 1;

    // === Vibration Check ===
    if (vibration > 20) score += 2;
    else if (vibration > 10) score += 1;

    // === RPM Check ===
    if (rpm < 500 || rpm > 2000) score += 2;
    else if (rpm < 800 || rpm > 1500) score += 1;

    // Final Decision
    if (score >= 4) return "CRITICAL";
    if (score >= 2) return "WARNING";
    return "NORMAL";
}
export function evaluateStatus(data) {
    let { temp, vibration, rpm } = data;

    // Convert if values are strings
    temp = Number(temp);
    vibration = Number(vibration);
    rpm = Number(rpm);

    let score = 0;

    // === Temperature Check ===
    if (temp > 90) score += 2;
    else if (temp > 70) score += 1;

    // === Vibration Check ===
    if (vibration > 20) score += 2;
    else if (vibration > 10) score += 1;

    // === RPM Check ===
    if (rpm < 500 || rpm > 2000) score += 2;
    else if (rpm < 800 || rpm > 1500) score += 1;

    // Final Decision
    if (score >= 4) return "CRITICAL";
    if (score >= 2) return "WARNING";
    return "NORMAL";
}
