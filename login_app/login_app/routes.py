from flask import render_template, request, redirect, url_for, session, jsonify
from login_app import app  # Importe o objeto app diretamente, sem criar uma nova instância
from datetime import datetime, timedelta
import secrets
import os
import csv

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