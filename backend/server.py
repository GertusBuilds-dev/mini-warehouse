from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import os

app = FastAPI()

FILE = "warehouse_scans.xlsx"


class Scan(BaseModel):
    product: str
    location: str
    quantity: int
    time: str


@app.post("/scan")
def save_scan(scan: Scan):

    row = {
        "Product": scan.product,
        "Location": scan.location,
        "Quantity": scan.quantity,
        "Time": scan.time
    }

    if os.path.exists(FILE):
        df = pd.read_excel(FILE)
        df = pd.concat([df, pd.DataFrame([row])])
    else:
        df = pd.DataFrame([row])

    df.to_excel(FILE, index=False)

    return {"status": "saved"}
