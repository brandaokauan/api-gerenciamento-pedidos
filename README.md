
# API de Gerenciamento de Pedidos

## 1. Descrição do projeto

Projeto prático avaliativo da disciplina Tópicos Avançados em Sistemas de Informação II.

A aplicação é uma API REST desenvolvida com Node.js e Express para gerenciar pedidos de uma pequena loja.

Permite cadastrar pedidos, listar pedidos existentes, consultar pedidos por ID e atualizar seus status.

## 2. Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- Postman
- Git e GitHub

Os dados são armazenados em memória, sem utilização de banco de dados.

## 3. Estrutura do projeto

```text
api-gerenciamento-pedidos/
├── controllers/
│   └── pedidosController.js
├── evidencias/
│   ├── 01-criacao.png
│   ├── 02-validacao.png
│   ├── 03-listagem.png
│   ├── 04-consulta-id.png
│   ├── 05-pedido-nao-encontrado.png
│   ├── 06-atualizacao-status.png
│   └── 07-status-invalido.png
├── routes/
│   └── pedidosRoutes.js
├── services/
│   └── pedidosService.js
├── .gitignore
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## 4. Instalação e execução

É necessário ter o Node.js instalado.

Clone o repositório:

```bash
git clone https://github.com/ronaldo-revyy/api-gerenciamento-pedidos.git
```

Entre na pasta:

```bash
cd api-gerenciamento-pedidos
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

A API ficará disponível em:

http://localhost:3000

## 5. Endpoints

### POST /pedidos

Cadastra um novo pedido.

Exemplo de requisição:

```json
{
  "cliente": "Maria Oliveira",
  "tipo": "retirada",
  "valor": 150,
  "prioridade": "alta"
}
```

Resposta esperada: HTTP 201.

O pedido recebe automaticamente um ID e o status "recebido".

### GET /pedidos

Retorna a lista de pedidos cadastrados.

Resposta esperada: HTTP 200.

### GET /pedidos/:id

Consulta um pedido pelo identificador.

Exemplo:

GET http://localhost:3000/pedidos/1

Respostas:
- HTTP 200: pedido encontrado.
- HTTP 404: pedido não encontrado.

### PATCH /pedidos/:id/status

Atualiza o status de um pedido.

Exemplo:

PATCH http://localhost:3000/pedidos/1/status

Corpo JSON:

```json
{
  "status": "em preparo"
}
```

Respostas:
- HTTP 200: atualização realizada.
- HTTP 400: status inválido.
- HTTP 404: pedido inexistente.

### Regras de transição de status

A API permite apenas as seguintes transições:

- recebido → em preparo ou cancelado
- em preparo → pronto ou cancelado
- pronto → entregue ou cancelado
- entregue → nenhuma transição permitida
- cancelado → nenhuma transição permitida

Quando uma transição não é permitida, a API retorna HTTP 400
com a mensagem "Transição de status inválida."

Pedidos entregues ou cancelados não podem ter seu status alterado.
  
## 6. Validações

A API implementa as seguintes validações:

- O nome do cliente é obrigatório.
- O cliente não pode conter apenas espaços.
- O valor deve ser numérico e maior que zero.
- Os tipos aceitos são "entrega" e "retirada".
- As prioridades aceitas são "baixa", "normal" e "alta".
- Identificadores inexistentes retornam HTTP 404.
- Status inválidos retornam HTTP 400.

Os status implementados são:

- recebido
- em preparo
- pronto
- entregue
- cancelado

## 7. Arquitetura

O projeto utiliza uma organização em camadas:

**Routes:** define os endpoints da API.

**Controllers:** recebe as requisições HTTP e retorna as respostas.

**Services:** concentra as regras de negócio, validações e armazenamento dos pedidos.

**app.js:** configura a aplicação Express.

**server.js:** inicia o servidor na porta 3000.

## 8. Testes manuais

Os testes foram realizados utilizando o Postman.

As evidências estão disponíveis na pasta `evidencias/`.

Foram registrados testes de criação, validação, listagem, consulta por ID, pedido inexistente, atualização de status e status inválido.

## 9. Armazenamento

Os pedidos são armazenados em um array em memória.

Ao reiniciar o servidor, os dados cadastrados são perdidos.

## 10. Uso de Inteligência Artificial

Foi utilizada inteligência artificial como ferramenta de apoio durante o desenvolvimento, principalmente para compreender a organização da API em camadas, configurar o Git e elaborar a documentação.

As sugestões foram analisadas e adaptadas ao projeto, com testes manuais realizados no Postman para verificar o funcionamento das funcionalidades.

## 11. Autor

Projeto acadêmico desenvolvido para a disciplina Tópicos Avançados em Sistemas de Informação II.
