# Acerta Holerite - UNIVEM

Divide e renomeia os holerites a partir de um arquivo _.pdf_

## Configurar .env

**FIELD_NAME** o texto que antecede a informação a ser extraída
**QTDE_CHAR** quantidade de caracteres após o **FIELD_NAME** usada para renomrar os _.pdf_

## Ferramenta de Desenvolvedor

**ctrl + p** para abrir o DevTools

## Logs

Disponível na pasta **logs** da aplicação

**_debug.log_** número da página e o texto extraído

**_pdf.log_** primeira página do pdf

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
