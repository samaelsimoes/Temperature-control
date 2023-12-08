import requests
import json

url = 'http://127.0.0.1:5000/dados_iot'
dados_iot = {
    "id": "1",
    "data": "07/12/2023",
    "consumo": "15",
    "potencia": "3000",
    "tempo_ligado": "600000"
}

response = requests.post(url, json=dados_iot)
print(response.json())