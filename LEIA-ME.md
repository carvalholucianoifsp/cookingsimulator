# Gestão Express: Desafio do Gestor (IFSP Boituva)

## Ranking online
O ranking compartilhado depende da função `netlify/functions/rank.mjs`, que guarda os dados no Netlify Blobs (plano gratuito).
A senha de reset é validada no servidor. O padrão é `ifsp2026`; para trocar, crie a variável de ambiente `RESET_PASSWORD` no painel do Netlify.

## Publicar (escolha uma opção)
**A. Pelo GitHub (mais simples):** envie esta pasta para um repositório. No Netlify, clique em "Add new site", "Import an existing project", escolha o repositório e confirme. Não precisa configurar nada.
**B. Pelo terminal:** `npm i` e depois `npx netlify-cli deploy --prod` (faça login quando pedir).

Atenção: arrastar a pasta em app.netlify.com/drop publica só o jogo, sem o ranking online. Nesse caso o ranking fica local em cada computador.

## Rodar localmente
Abra `public/index.html` no Chrome ou no Edge. O ranking será local, só daquele computador.
