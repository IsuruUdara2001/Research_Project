def evaluate_status(temp, vibration, rpm):
    score = 0

    # Temperature Check
    if temp > 90:
        score += 2
        temp_status = "CRITICAL"
    elif temp > 70:
        score += 1
        temp_status = "WARNING"
    else:
        temp_status = "NORMAL"

    # Vibration Check
    if vibration > 20:
        score += 2
        vibration_status = "CRITICAL"
    elif vibration > 10:
        score += 1
        vibration_status = "WARNING"
    else:
        vibration_status = "NORMAL"

    # RPM Check
    if rpm < 500 or rpm > 2000:
        score += 2
        rpm_status = "CRITICAL"
    elif rpm < 800 or rpm > 1500:
        score += 1
        rpm_status = "WARNING"
    else:
        rpm_status = "NORMAL"

    # Overall status
    if score >= 4:
        overall_status = "CRITICAL"
    elif score >= 2:
        overall_status = "WARNING"
    else:
        overall_status = "NORMAL"

    return {
        "temp_status": temp_status,
        "vibration_status": vibration_status,
        "rpm_status": rpm_status,
        "overall_status": overall_status
    }
