from flask import render_template, request, redirect, url_for, session, jsonify
from login_app import app  # Importe o objeto app diretamente, sem criar uma nova instância
from datetime import datetime, timedelta
import secrets
import os
import csv
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import joblib

users = {
    'admin': 'admin',
    'david': 'david'
}

tokens = {} 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Lógica de autenticação para método POST
        username = request.form['username']
        password = request.form['password']

        if username in users and users[username] == password:
            # Gerar token de autenticação
            token = secrets.token_urlsafe(16)
            tokens[username] = token

            return jsonify({'status': 'success', 'message': 'Autenticação bem-sucedida', 'token': token})
        else:
            return jsonify({'status': 'error', 'message': 'Credenciais inválidas'})

    elif request.method == 'GET':   
        # Lógica de autenticação para método GET
        username = request.args.get('username')
        password = request.args.get('password')

        if username in users and users[username] == password:
            # Gerar token de autenticação
            token = secrets.token_urlsafe(16)
            tokens[username] = token

            return jsonify({'status': 'success', 'message': 'Autenticação bem-sucedida', 'token': token})
        else:
            return jsonify({'status': 'error', 'message': 'Credenciais inválidas'})

    return render_template('login.html')

@app.route('/dashboard')
def dashboard_page():
    if 'username' in session:
        return f"Bem-vindo à página do dashboard, {session['username']}!"
    else:
        return redirect(url_for('login'))

# Função para criar e treinar a rede neural
def treinar_rede_neural(dados_consumo):
    # Extrair features e labels
    features = [float(dado['potencia']) for dado in dados_consumo]
    labels = [float(dado['totalGasto']) if 'totalGasto' in dado and dado['totalGasto'].replace('.', '', 1).isdigit() else 0 for dado in dados_consumo]

    # Normalizar os dados
    scaler = MinMaxScaler()
    features = np.array(features).reshape(-1, 1)
    labels = np.array(labels).reshape(-1, 1)
    features = scaler.fit_transform(features)
    labels = scaler.fit_transform(labels)

    # Construir o modelo da rede neural
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(32, activation='relu', input_shape=(1,)),
        tf.keras.layers.Dense(1)
    ])

    model.compile(optimizer='adam', loss='mean_squared_error')

    # Treinar o modelo
    model.fit(features, labels, epochs=50)

    return model, scaler

@app.route('/consumo_chuveiro', methods=['GET'])
def consumo_chuveiro():
    # Parâmetros da requisição
    data_inicio_str = request.args.get('data_inicio', '2023-01-01')
    data_fim_str = request.args.get('data_fim', '2023-12-31')

    # Converter strings de data para objetos datetime
    data_inicio = datetime.strptime(data_inicio_str, '%Y-%m-%d')
    data_fim = datetime.strptime(data_fim_str, '%Y-%m-%d')

    # Verificar se o arquivo CSV existe
    nome_arquivo = 'dados_chuveiros.csv'
    if not os.path.exists(nome_arquivo):
        return jsonify({'status': 'error', 'message': 'Arquivo de dados não encontrado'})

    # Ler dados do arquivo CSV dentro do intervalo de datas fornecido
    with open(nome_arquivo, mode='r') as file:
        reader = csv.DictReader(file)
        dados_consumo = [
            row for row in reader
            if data_inicio <= datetime.strptime(row['data'], '%Y-%m-%d') <= data_fim
        ]

    # Criar um JSON de resposta
    response_data = {
        'status': 'success',
        'message': f'Dados de consumo para todos os chuveiros no intervalo de {data_inicio_str} a {data_fim_str}:',
        'consumo_chuveiro': dados_consumo
    }

    return jsonify(response_data)

@app.route('/analise_preditiva', methods=['GET'])
def analise_preditiva():
    # Parâmetros da requisição
    modelo_analise_preditiva = joblib.load(r"C:\Users\david\Documents\login_page\Temperature-control\modelo_analise_preditiva.joblib")
    data_inicio_str = request.args.get('data_inicio', '2023-01-01')
    data_fim_str = request.args.get('data_fim', '2023-12-31')

    # Ler dados do arquivo CSV
    with open('dados_chuveiros.csv', mode='r') as file:
        reader = csv.DictReader(file)
        dados_consumo = [float(row['consumo']) for row in reader]

    # Prever o consumo para o próximo mês
    predicoes = []
    for i in range(1):  # Próximo mês
        # Gerar a data para o próximo mês
        data_prevista = datetime.strptime(data_fim_str, '%Y-%m-%d') + timedelta(days=1)

        # Use a potência do último registro (supondo que a potência é constante)
        potencia = float(dados_consumo[-1])

        # Use o modelo treinado para prever o consumo
        consumo_previsto = modelo_analise_preditiva.predict([[len(dados_consumo) + i]])

        # Adicione as predições à lista
        predicoes.append({
            'data': data_prevista.strftime('%Y-%m-%d'),  # Data formatada como string
            'potencia': str(potencia),  # Potência em string
            'totalGasto': str(consumo_previsto[0]),  # Valor previsto em string
            'valor': str(consumo_previsto[0])  # Valor previsto em string
        })

    # Crie um JSON de resposta
    response_data = {
        'status': 'success',
        'message': 'Dados de consumo previsto para o próximo mês:',
        'analisePreditiva': predicoes
    }

    return jsonify(response_data)