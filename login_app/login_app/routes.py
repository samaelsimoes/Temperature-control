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
from collections import defaultdict

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
    #modelo_analise_preditiva = joblib.load(r"C:\Users\david\Documents\login_page\Temperature-control\login_app\modelo_analise_preditiva.joblib")
    
    # Obtém o diretório atual do script
    script_dir = os.path.dirname(__file__)

    # Obtém o caminho completo para o arquivo
    modelo_analise_preditiva_path = 'modelo_analise_preditiva.joblib'

    # Verifica se o arquivo existe antes de carregá-lo
    if os.path.exists(modelo_analise_preditiva_path):
        modelo_analise_preditiva = joblib.load(modelo_analise_preditiva_path)
    else:
        # Se o arquivo não existir, você pode tomar uma ação apropriada
        print("Arquivo 'modelo_analise_preditiva.joblib' não encontrado.")
        # Alternativamente, você pode retornar uma resposta de erro ao cliente.
        return jsonify({'status': 'error', 'message': 'Arquivo modelo não encontrado'})
    
    
    
    
    
    data_inicio_str = request.args.get('data_inicio', '2023-01-01')
    data_fim_str = request.args.get('data_fim', '2023-12-31')
    # Ler dados do arquivo CSV
    with open('dados_chuveiros.csv', mode='r') as file:
        reader = csv.DictReader(file)
        dados_consumo = [
            {
                'data': row.get('data', ''),
                'potencia': row.get('potencia', ''),
                'consumo': row.get('consumo', ''),
                'tempo_ligado': row.get('tempo_ligado', ''),
            }
            for row in reader
        ]

    # Calcular totais diários
    total_potencia_diario = defaultdict(float)
    total_consumo_diario = defaultdict(float)
    total_tempo_ligado_diario = defaultdict(int)

    for dado in dados_consumo:
        data = dado['data']
        
        # Potência
        try:
            total_potencia_diario[data] += float(dado['potencia'].replace(',', ''))
        except ValueError:
            print(f"Erro ao converter valor para float: {dado['potencia']}")

        # Consumo
        try:
            total_consumo_diario[data] += float(dado['consumo'].replace(',', ''))
        except ValueError:
            print(f"Erro ao converter valor para float: {dado['consumo']}")

        # Tempo ligado
        tempo_ligado_parts = dado['tempo_ligado'].split(' ')
        horas = int(tempo_ligado_parts[0]) if len(tempo_ligado_parts) > 1 else 0
        minutos = int(tempo_ligado_parts[-2]) if len(tempo_ligado_parts) > 3 else 0
        total_tempo_ligado_diario[data] += horas * 60 + minutos

    # Converte os dados em uma lista
    lista_dados_diarios = []
    for data, potencia in total_potencia_diario.items():
        consumo = total_consumo_diario.get(data, 0)
        tempo_ligado = total_tempo_ligado_diario.get(data, 0)
        lista_dados_diarios.append({
            'data': data,
            'totalPotencia': str(potencia),
            'totalConsumo': str(consumo),
            'totalTempoLigado': str(tempo_ligado),
        })

    # Crie um JSON de resposta
    response_data = {
        'status': 'success',
        'message': 'Totais diários:',
        'analisePreditiva': lista_dados_diarios
    }

    return jsonify(response_data)

from flask import request

@app.route('/dados_iot', methods=['POST', 'GET'])
def dados_iot():
    # Certifique-se de que o cabeçalho Content-Type é application/json
    if request.method == 'POST' and request.headers['Content-Type'] == 'application/json':
        # Obtenha os dados do corpo da solicitação como um dicionário JSON
        dados_iot = request.json

        # Obtenha parâmetros da query string
        parametro_query = request.args.get('parametro_query')

        # Certifique-se de que os campos obrigatórios estão presentes nos dados_iot
        campos_obrigatorios = ['id', 'data', 'consumo', 'potencia', 'tempo_ligado']
        for campo in campos_obrigatorios:
            if campo not in dados_iot:
                return jsonify({'status': 'error', 'message': f'O campo obrigatório {campo} está ausente'}), 400

        # Realize o processamento necessário com os dados_iot
        # Neste ponto, você pode armazenar os dados no banco de dados, realizar análises, etc.

        # Adicione os dados ao arquivo CSV
        with open('dados_iot.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([dados_iot.get(campo, '') for campo in campos_obrigatorios])

        # Retorne uma resposta JSON
        return jsonify({'status': 'success', 'message': 'Dados IoT recebidos e registrados com sucesso', 'parametro_query': parametro_query})

    elif request.method == 'GET':
        parametro_query = request.args.get('parametro_query')
        
        return jsonify({'status': 'success', 'message': 'Requisição GET bem-sucedida', 'parametro_query': parametro_query})

    else:
        return jsonify({'status': 'error', 'message': 'O Content-Type deve ser application/json'}), 415