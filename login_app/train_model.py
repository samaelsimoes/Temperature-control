import csv
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPRegressor
import joblib

# Ler dados do arquivo CSV
with open('login_app\dados_chuveiros.csv', mode='r') as file:
    reader = csv.DictReader(file)

    # Extrair dados de consumo
    dados_consumo = [float(row['consumo']) for row in reader]

# Treinar modelo de análise preditiva
X = [[i] for i in range(len(dados_consumo))]
y = dados_consumo

# Dividir dados em conjuntos de treinamento e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Padronizar os dados
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Treinar o modelo de análise preditiva
model = MLPRegressor(random_state=42)
model.fit(X_train, y_train)

# Salvar o modelo treinado
joblib.dump(model, r"C:\Users\david\Documents\login_page\Temperature-control\login_app\modelo_analise_preditiva.joblib")
