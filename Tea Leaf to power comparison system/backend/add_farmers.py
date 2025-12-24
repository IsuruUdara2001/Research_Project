from firebase_config import db

villages = [
    "Thotalagalla",
    "Haputale",
    "Diyathalawa",
    "Bandarawela",
    "Kahagolla",
    "Haldummulla",
    "Koslanda",
    "Idalgashinna"
]

farmer_names = [
    "K.A. Rathnayake",
    "W.M. Sunil",
    "P.G. Nimal",
    "H.M. Bandara",
    "D.M. Karunathilaka",
    "R.M. Upali",
    "A.P. Wijesinghe",
    "S.K. Jayasundara",
    "M.G. Somarathne",
    "T.B. Ekanayake",
    "L.M. Priyantha",
    "N.K. Silva",
    "U.G. Gunasekara",
    "C.R. Perera",
    "S.M. Herath",
    "J.P. Fernando",
    "B.A. Kumara",
    "I.M. Dissanayake",
    "V.P. Alwis",
    "K.M. Senanayake"
]

def add_20_farmers():
    start_id = 3

    for i in range(20):
        farmer_number = start_id + i

        farmer_data = {
            "farmer_id": f"TG-F-{farmer_number:04}",
            "farmer_name": farmer_names[i],
            "phone": int(f"7{farmer_number:08}"),
            "village_location": villages[i % len(villages)]
        }

        db.collection("farmers") \
          .document(farmer_data["farmer_id"]) \
          .set(farmer_data)

    print("✅ Farmers saved with farmer_id as document ID")


add_20_farmers()
