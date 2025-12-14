from predict_status import predict_belt_status

# Example values
temp = 38.0
vibration = 0.65
rpm = 310

status = predict_belt_status(temp, vibration, rpm)
print("Predicted belt status =", status)
