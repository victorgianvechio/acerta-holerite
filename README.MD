# Acerta Holerite - UNIVEM

Divide e renomeia os holerites a partir de um arquivo _.pdf_

## Ferramenta de Desenvolvedor

Pressionar **ctrl + p** para abrir o DevTools

## Logs

Disponível na raiz da aplicação
_debug.log_ número página e o texto extraído
_pdf.log_ primeira página do pdf

## Build

```sh
npm run build
```

## Corrigir erro de versão do NodeJS

excluir **package-lock.json** e a pasta **node_modules**

executar:

```sh
npm i
```

depois das dependências instaladas executar o rebuild:

```sh
npm run rebuild
```

e então gere o build:

```sh
npm run build
```

Copyright ® 2019 Victor Gianvechio
