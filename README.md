AMA Room Application
## Descrição
O projeto "AMA Room Application" é uma aplicação que permite criar salas públicas de "Ask Me Anything" (AMA) e gerenciar perguntas e respostas. A aplicação é dividida em duas partes principais:

**Frontend**: Uma aplicação React para criar salas, exibir mensagens e permitir a interação do usuário.

**Backend**: Uma API desenvolvida em Go para gerenciar as salas e mensagens, além de fornecer suporte para WebSocket para notificações em tempo real.

### Frontend
#### Requisitos
- Node.js
- npm ou yarn

#### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/your-username/ama-room-app.git
cd ama-room-app/frontend
```
2. Instale as dependências:
```bash
npm install
# ou
yarn install
```
3. Execute a aplicação:
```bash
npm start
# ou
yarn start
```

#### Estrutura do Frontend
- CreateRoom.tsx: Componente para criar uma nova sala AMA. Permite ao usuário inserir o nome da sala e criar a sala, redirecionando para a página da sala criada.
- Room.tsx: Componente para exibir uma sala específica, listar mensagens e fornecer uma interface para criar novas mensagens e compartilhar o link da sala.

### Backend
#### Requisitos
- Go (1.18 ou superior)
- PostgreSQL

#### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/your-username/ama-room-app.git
cd ama-room-app/backend
```
2. Instale as dependências:
```bash
go mod tidy
```
3. Configure o banco de dados PostgreSQL e crie as tabelas necessárias conforme as especificações no código.
4. Execute a aplicação:
```bash
go run main.go
```

#### Estrutura do Backend
- api/handler.go: Define os manipuladores para as rotas da API, incluindo a criação de salas, gerenciamento de mensagens e suporte a WebSocket para atualizações em tempo real.

#### Endpoints da API
- POST /api/rooms: Cria uma nova sala.
- GET /api/rooms: Lista todas as salas.
- GET /api/rooms/{room_id}: Obtém detalhes de uma sala específica.
- POST /api/rooms/{room_id}/messages: Adiciona uma nova mensagem em uma sala.
- GET /api/rooms/{room_id}/messages: Lista todas as mensagens de uma sala.
- PATCH /api/rooms/{room_id}/messages/{message_id}/react: Adiciona uma reação a uma mensagem.
- DELETE /api/rooms/{room_id}/messages/{message_id}/react: Remove uma reação de uma mensagem.
- PATCH /api/rooms/{room_id}/messages/{message_id}/answer: Marca uma mensagem como respondida.
