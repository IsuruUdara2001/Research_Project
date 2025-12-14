import pandas as pd

df = pd.read_csv("Ml/synthetic_output/belt_synthetic_3500.csv")
print("Rows in CSV:", len(df))
print(df.head())
