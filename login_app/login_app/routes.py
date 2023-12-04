from flask import render_template, request, redirect, url_for, session, jsonify
from login_app import app  # Importe o objeto app diretamente, sem criar uma nova instância

import secrets

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
