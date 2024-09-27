#include <SPI.h>
#include <Ethernet.h>
#include <Servo.h>

// Configurações da rede
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 0, 177); // Substitua pelo IP da sua rede
EthernetServer server(80);

// Variáveis de estado
bool modoAutomatico = true;
String estado = "Fechado";
String eventoAtual = "";
unsigned long ultimoSensor = 0;
const unsigned long intervaloSensor = 5000;

// Pinos dos sensores
const int sensorUmidadePin = A0;
const int sensorLuzPin = A1;

// Servo motor
Servo servoJanela;
const int servoPin = 9;

// Funções
void setup() {
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.begin(9600);

  servoJanela.attach(servoPin);
  servoJanela.write(0); // Janela fechada

  pinMode(sensorUmidadePin, INPUT);
  pinMode(sensorLuzPin, INPUT);
}

void loop() {
  EthernetClient client = server.available();
  if (client) {
    processarCliente(client);
  }

  if (millis() - ultimoSensor >= intervaloSensor) {
    ultimoSensor = millis();
    lerSensores();
  }
}

void processarCliente(EthernetClient client) {
  String request = client.readStringUntil('\r');
  client.flush();

  if (request.indexOf("GET /toggleModo") >= 0) {
    modoAutomatico = !modoAutomatico;
    enviarResposta(client, "automatico=" + String(modoAutomatico ? "1" : "0"));
  } else if (request.indexOf("GET /modo") >= 0) {
    enviarResposta(client, "automatico=" + String(modoAutomatico ? "1" : "0"));
  } else if (request.indexOf("GET /estado") >= 0) {
    enviarResposta(client, "estado=" + estado);
  } else if (request.indexOf("GET /evento") >= 0) {
    enviarResposta(client, "evento=" + eventoAtual);
  } else if (request.indexOf("GET /abrir") >= 0) {
    executarAcao("Abrir");
    enviarResposta(client, "success=1");
  } else if (request.indexOf("GET /fechar") >= 0) {
    executarAcao("Fechar");
    enviarResposta(client, "success=1");
  } else {
    enviarResposta(client, "erro=Rota nao encontrada");
  }

  client.stop();
}

void lerSensores() {
  int valorUmidade = analogRead(sensorUmidadePin);
  int valorLuz = analogRead(sensorLuzPin);

  int limiarUmidade = 500;
  int limiarLuz = 300;

  if (valorUmidade < limiarUmidade) {
    tratarEvento("Água detectada pelo sensor de umidade.");
  } else if (valorLuz < limiarLuz) {
    tratarEvento("Baixa luminosidade detectada pelo sensor de luz.");
  } else {
    eventoAtual = "";
  }
}

void tratarEvento(String evento) {
  eventoAtual = evento;

  if (modoAutomatico) {
    if (estado != "Fechado" && estado != "Fechando") {
      executarAcao("Fechar");
    }
  }
  // No modo manual, o evento é enviado ao frontend, aguardando a resposta do usuário.
}

void executarAcao(String acao) {
  estado = acao + "ndo";

  if (acao == "Abrir") {
    servoJanela.write(90); // Posição aberta
  } else if (acao == "Fechar") {
    servoJanela.write(0); // Posição fechada
  }

  delay(3000);
  estado = (acao == "Abrir") ? "Aberto" : "Fechado";
}

void enviarResposta(EthernetClient client, String conteudo) {
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/plain");
  client.println("Connection: close");
  client.println();
  client.println(conteudo);
}
