# Smart-Window-System

Um sistema inteligente de controle de janelas que abre e fecha automaticamente com base em sensores de umidade e luminosidade, com funcionalidade manual integrada. O sistema inclui um frontend desenvolvido em React com TypeScript, um backend simulado em Node.js (ou Arduino Uno), e utiliza CSS para estilização, aprimorando a interface do usuário.

## Tecnologias Utilizadas

- **Frontend**: React com TypeScript
- **Backend**: Node.js com TypeScript (simulando o Arduino Uno)
- **Arduino**: Arduino Uno com Ethernet Shield
- **Comunicação**: Requisições HTTP
- **Estilização**: CSS

---

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Arduino](#arduino)
- [Instruções de Uso](#instruções-de-uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autores](#autores)

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 12 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **Arduino IDE** (para futura implementação no Arduino)

---

## Instalação e Configuração

### Frontend

1. **Clone o repositório**

   ```bash
   git clone https://github.com/GustavoMCF/Smart-Window-System.git
   ```

2. **Navegue até o diretório do frontend**

   ```bash
   cd Smart-Window-System/web
   ```

3. **Instale as dependências**

   Execute o comando abaixo para instalar todas as dependências necessárias:

   ```bash
   npm install
   ```

4. **Inicie o frontend**

   Após a instalação das dependências, inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

   O aplicativo será aberto automaticamente em seu navegador padrão no endereço `http://localhost:3000`. Caso não abra, você pode acessá-lo manualmente.

5. **Ajuste a URL da API**

   No arquivo `src/services/api.ts`, certifique-se de que o `baseURL` está apontando para o backend:

   ```typescript
   const api = axios.create({
     baseURL: 'http://localhost:3001',
   });
   ```

---

### Backend

1. **Navegue até o diretório do backend**

   Abra um novo terminal e navegue até o diretório do backend:

   ```bash
   cd Smart-Window-System/server
   ```

3. **Instale as dependências**

   Instale as dependências necessárias:

   ```bash
   npm install express cors body-parser
   npm install typescript ts-node @types/node @types/express @types/cors @types/body-parser --save-dev
   ```

3. **Iniciar o backend**

   No terminal, dentro da pasta `backend`, execute:

   ```bash
   npx ts-node src/index.ts
   ```

   O backend estará rodando em `http://localhost:3001`.

---

### Arduino

Quando o Arduino Uno estiver disponível, você poderá implementar o backend no próprio Arduino.

1. **Hardware necessário**

   - **Arduino Uno**
   - **Ethernet Shield** (W5100 ou W5500)
   - **Sensor de Umidade (Chuva)**
   - **Sensor de Luz (LDR)**
   - **Servo Motor** (para abrir/fechar a janela)
   - **Jumpers e Protoboard**

2. **Configurar o ambiente**

   - Instale a **Arduino IDE** em seu computador.
   - Adicione as bibliotecas necessárias:
     - **Ethernet.h**
     - **SPI.h**
     - **Servo.h**

3. **Ajustar o código do Arduino**

   Utilize o código fornecido na pasta `arduino/` deste repositório. Certifique-se de ajustar o endereço IP e as configurações de rede conforme a sua configuração.

4. **Upload do código para o Arduino**

   - Conecte o Arduino ao computador via USB.
   - Abra o código na Arduino IDE.
   - Selecione a porta correta e o tipo de placa (Arduino Uno).
   - Faça o upload do código para o Arduino.

5. **Ajustar o frontend**

   No arquivo `src/services/api.ts` do frontend, altere o `baseURL` para o endereço IP do Arduino:

   ```typescript
   const api = axios.create({
     baseURL: 'http://<endereço-ip-do-arduino>',
   });
   ```

---

## Instruções de Uso

### Modo Automático

- No modo automático, a janela fechará automaticamente quando os sensores detectarem baixa luminosidade ou presença de água (chuva).
- O sistema exibirá o estado atual e os eventos detectados na interface.

### Modo Manual

- No modo manual, você receberá notificações de eventos (como chuva ou baixa luminosidade).
- Você poderá escolher abrir ou fechar a janela manualmente através dos botões na interface.

### Alternar entre modos

- Utilize o botão no canto superior direito da interface para alternar entre modo automático e manual.

---

## Estrutura do Projeto

```
Smart-Window-System/
├── frontend/                 # Frontend desenvolvido em React
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/                  # Backend simulador em Node.js
│   ├── node_modules/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
└── arduino/                  # Código para o Arduino Uno
    ├── Smart-Window-System.ino
    └── ...
```

---

## Autores

[![Alexsandro Pasinato](https://github.com/Alekk123.png?size=50)](https://github.com/Alekk123) 
[![Gustavo Ferreira](https://github.com/GustavoMCF.png?size=50)](https://github.com/GustavoMCF)
[![Pedro Melo](https://github.com/PedroHenriqueMM.png?size=50)](https://github.com/PedroHenriqueMM)

• [**Alexsandro Pasinato**](https://github.com/Alekk123) • [**Gustavo Ferreira**](https://github.com/GustavoMCF) • [**Pedro Melo**](https://github.com/PedroHenriqueMM)

---
