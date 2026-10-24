# Campanhas solidárias

Aplicação para consultar campanhas solidárias e registrar doações de itens. Desenvolvida com Vue no front-end e Node.js com Express no backend.

## Requisitos

- Node.js 22.18 ou superior na versão 22, ou 24.12 ou superior.
- npm instalado.

## Como executar

Na pasta raiz do projeto, abra um terminal e inicie o backend:

```sh
cd backend
npm install
npm start
```

O backend será iniciado em `http://localhost:3000`.

Abra outro terminal na pasta raiz e inicie o front-end:

```sh
cd frontend
npm install
npm run dev
```

Abra no navegador o endereço informado pelo Vite, normalmente `http://localhost:5173`. Mantenha os dois terminais em execução.

Se o PowerShell bloquear os comandos, use `npm.cmd` no lugar de `npm`.

## Como usar

1. Consulte as campanhas disponíveis e suas metas.
2. Clique em **Quero doar** ou selecione uma campanha no formulário.
3. Informe seu nome e a quantidade de itens.
4. Clique em **Registrar doação** e aguarde a confirmação.

Se ocorrer um erro, confira se o backend está em execução e tente novamente.

As doações são armazenadas apenas na memória e são apagadas quando o backend reinicia.

## Gerar a versão de produção

Na pasta `frontend`, execute:

```sh
npm run build
npm run preview
```

O build gera os arquivos na pasta `frontend/dist`. O comando de preview permite conferir essa versão localmente e também precisa do backend em execução.
