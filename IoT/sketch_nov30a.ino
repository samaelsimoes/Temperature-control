#include <MFRC522.h> //biblioteca responsável pela comunicação com o módulo RFID-RC522
#include <SPI.h> //biblioteca para comunicação do barramento SPI
#include <WiFi.h>  // ou #include <WiFiClientSecure.h> para conexões HTTPS
#include <HTTPClient.h>
#include <Time.h>


#define SS_PIN 21
#define RST_PIN 22
#define SIZE_BUFFER 18 //tamanho do buffer (16 bits do bloco + 2 bits CRC)
#define MAX_SIZE_BLOCK 16 //tamanho dos dados do bloco
#define pinVerde 12
#define pinVermelho 32
 
//esse objeto 'chave' é utilizado para autenticação
MFRC522::MIFARE_Key key;
//código de status de retorno da autenticação
MFRC522::StatusCode status;
// Definicoes pino modulo RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

// Variável para armazenar os tempos
unsigned long tempoInicial;
unsigned long tempoAtual;
// Ligado 1 | Desligado 0
unsigned int estadoChuveiro = 0;
// Dados Principais
//https://sklsupply.com.br/produtos/ducha-lorenzetti-eletr-advanced-turbo-127v-5500w/#:~:text=Com%20vaz%C3%A3o%20de%203%2C4,garantindo%20m%C3%A1xima%20higieniza%C3%A7%C3%A3o%20e%20economia.
  // id
  const int id = 1; // id do chuveiro
  // data
  const char* ntpServer = "pool.ntp.org";
  const long  gmtOffset_sec = -10800;    // Fuso horário (fornecido em segundos)
  const int   daylightOffset_sec = 3600; // Horário de verão (fornecido em segundos)
  // consumo
  float consumo_total_litros;
  // potencia
  unsigned long potencia = 5500;
  // tempo_ligado
  unsigned long tempoFinal_em_milissegundos;
  unsigned long tempoFinal_em_minutos;
  unsigned long tempoFinal_em_horas;

// HTTP
const char* ssid = "nome_da_rede";                    // SSID da sua rede WiFi
const char* password = "senha_rede";                      // Senha da sua rede WiFi
const char* url = "url_api";  // Endereço do servidor Alternativo (iot -> laptop)
 
void setup() {
  // Inicia a serial
  Serial.begin(9600);
  SPI.begin(); // Init SPI bus
  pinMode(pinVerde, OUTPUT);
  pinMode(pinVermelho, OUTPUT);
  // Inicia MFRC522
  mfrc522.PCD_Init();
  if (!mfrc522.PCD_PerformSelfTest()) {
      Serial.println("Falha no auto teste do MFRC522");
      // Realize alguma ação para lidar com a falha no auto teste, se necessário
  }

  // Conecta-se à rede WiFi
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("WiFi status: ");
    Serial.println(WiFi.status());
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }
  
  Serial.println("Conectado ao WiFi.");

  // Configura o cliente NTP
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  // Aguarda a sincronização do tempo
  while (!time(nullptr)) {
    delay(1000);
    Serial.println("Aguardando sincronização do tempo...");
  }

  digitalWrite(pinVermelho, HIGH);

  // Mensagens iniciais no serial monitor
  Serial.println("Aproxime o seu cartao do leitor...");
  Serial.println();
}
 
void loop()
{
  // Obtém o tempo atual
  tempoAtual = millis();

  // Aguarda a aproximacao do cartao
  if ( ! mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  // Seleciona um dos cartoes
  if ( ! mfrc522.PICC_ReadCardSerial())
  {
    return;
  }
  
  leituraDados();

  // instrui o PICC quando no estado ACTIVE a ir para um estado de "parada"
  mfrc522.PICC_HaltA();
  // "stop" a encriptação do PCD, deve ser chamado após a comunicação com
  //autenticação, caso contrário novas comunicações não poderão ser iniciadas
  mfrc522.PCD_StopCrypto1();
}
 
//faz a leitura dos dados do cartão/tag
void leituraDados() {
  //Prepara a chave - todas as chaves estão configuradas para FFFFFFFFFFFFh (Padrão de fábrica).
  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;
  byte buffer[SIZE_BUFFER] = {0}; //buffer para colocar os dados lidos
  byte bloco = 1; //bloco que faremos a operação
  byte tamanho = SIZE_BUFFER;
  //faz a autenticação do bloco que vamos operar
  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloco, &key, &(mfrc522.uid));
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("Authentication failed: ")); //erro de autenticação
    Serial.println(mfrc522.GetStatusCodeName(status));
    digitalWrite(pinVermelho, LOW);
    digitalWrite(pinVerde, LOW);
    return;
  }
  status = mfrc522.MIFARE_Read(bloco, buffer, &tamanho); //faz a leitura dos dados do bloco
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("Reading failed: ")); //erro de leitura
    Serial.println(mfrc522.GetStatusCodeName(status));
    digitalWrite(pinVermelho, LOW);
    digitalWrite(pinVerde, LOW);
    return;
  }
  else {
    if (estadoChuveiro == 0) {
      digitalWrite(pinVerde, HIGH);
      digitalWrite(pinVermelho, LOW);
      estadoChuveiro = 1;
      // Inicia o temporizador
      tempoInicial = millis();
      tempoFinal_em_milissegundos = 0;
    } else {
      digitalWrite(pinVerde, LOW);
      digitalWrite(pinVermelho, HIGH);
      estadoChuveiro = 0;
      tempoFinal_em_milissegundos = tempoAtual - tempoInicial;
      Serial.println("tempoFinal_em_milissegundos:");
      Serial.println(tempoFinal_em_milissegundos);

      // Converter milissegundos para minutos
      tempoFinal_em_minutos = tempoFinal_em_milissegundos / 60000;
      //Serial.println("tempoFinal_em_minutos:");
      //Serial.println(tempoFinal_em_minutos);
      // Converter minutos para horas
      tempoFinal_em_horas = tempoFinal_em_minutos / 60;
      //Serial.println("tempoFinal_em_horas:");
      //Serial.println(tempoFinal_em_horas);

      // Multiplicar por 3,4 litros por minuto, especificação do chuveiro
      consumo_total_litros = (((((float)tempoFinal_em_milissegundos) / 60000) / 60) * 3.4);
      //Serial.println("consumo_total_litros:");
      //Serial.println(consumo_total_litros);

      // Função que envia os dados
      enviarDados();

      tempoInicial = 0;
    }
  }
  //Serial.print(F("\nDados do bloco [")); Serial.print(bloco); Serial.print(F("]: "));
  //imprime os dados lidos
  for (uint8_t i = 0; i < MAX_SIZE_BLOCK; i++)
  {
    Serial.write(buffer[i]);
  }
  Serial.println(" ");
  if (estadoChuveiro == 1) {
    Serial.println("Chuveiro ligado!");
  } else {
    Serial.println("Chuveiro desligado!");
  }
}

// Envia uma solicitação POST
void enviarDados() {
  Serial.println("Iniciar chamada ao servidor");

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    http.begin(url); // Inicia a conexão HTTP com a URL
    
    http.addHeader("Content-Type", "application/json"); // Define o tipo de conteúdo como JSON (se necessário)
    
    // Obtém o tempo UNIX atual em segundos
    String dataAtual = obterDataAtual();

    //String tempo_ligado = String(tempoFinal_em_horas) + " horas " + String(tempoFinal_em_minutos) + " minutos";

    // Dados a serem enviados no corpo da requisição POST
    String body = "{\"id\":\""+ String(id) +"\",\"data\":\""+ String(dataAtual) +"\",\"consumo\":\""+ String(consumo_total_litros) +"\",\"potencia\":\""+ String(potencia) +"\",\"tempo_ligado\":\""+ String(tempoFinal_em_milissegundos) +"\"}";
    
    Serial.println("Dados implementados:");
    Serial.println(body);
    
    Serial.println("Enviando dados para o servidor");

    int httpResponseCode = http.sendRequest("POST", body); // Envia a requisição POST com o corpo especificado
    
    Serial.println("Retorno do servidor");

    Serial.print("WiFi status: ");
    Serial.println(WiFi.status());

    if (httpResponseCode > 0) {
      String resposta = http.getString(); // Obtém a resposta do servidor
    
      Serial.print("Resposta da API: ");
      Serial.println(resposta);
    } else {
      Serial.print("Erro na requisição. Código de resposta: ");
      Serial.println(httpResponseCode);
    }
    
    http.end(); // Encerra a conexão HTTP
    Serial.println("Encerrando a conexão");
  }
}

String obterDataAtual() {
  // Obtém o tempo UNIX atual em segundos
  time_t tempoAtual = time(nullptr);

  // Converte o tempo UNIX para uma estrutura de tempo local
  struct tm *local = localtime(&tempoAtual);

  // Formata a data no formato dd/mm/aaaa
  char dataString[11]; // Array para armazenar a data formatada (dd/mm/aaaa)
  sprintf(dataString, "%02d/%02d/%04d", local->tm_mday, local->tm_mon + 1, local->tm_year + 1900);

  return String(dataString);
}