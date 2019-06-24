# Acerta Holerite - UNIVEM

Divide e renomeia os holerites a partir de um arquivo _.pdf_

## :key: Configurar .env

**FIELD_NAME** o texto que antecede a informação a ser extraída

**QTDE_CHAR** quantidade de caracteres após o **FIELD_NAME** usada para renomerar os arquivos

## :wrench: Ferramenta de Desenvolvedor

**CTRL + p** para abrir o _DevTools_

## :page_facing_up: Logs

Disponível na pasta **logs** da aplicação

**_debug.log_** número da página e o texto extraído

**_pdf.log_** primeira página do pdf

## :hammer: Build

```sh
npm run build
```

## :wrench: Corrigir erro de versão do NodeJS

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
