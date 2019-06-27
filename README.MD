# Acerta Holerite - UNIVEM

Divide um arquivo _.pdf_ e extraí informações internas para renomear os arquivo.

## Configurar .env

O arquivo .env é responsável pelas configurações utilizadas para extrair e renomear os arquivos.

### Variáveis

-   *LAYOUT*: identifica os layouts disponíveis que serão apresentados na tela. Os layouts devem ser separados por `','`.

-   *FIELD_NAME_<'LAYOUT'>*: para cada Layout deve criar um FIELD_NAME que representa o texto que antecede a informação a ser extraída para renomear os arquivos.

-   *QTDE_CHAR_<'LAYOUT'>*: quantidade de caracteres após o **FIELD_NAME** usado para renomear os arquivos.

**Exemplo arquivo .env**

```sh
FIELD_NAME_FUNCIONARIO="CODIGO"
QTDE_CHAR_FUNCIONARIO=5
FIELD_NAME_TELEFONE="TELEFONE"
QTDE_CHAR_TELEFONE=9
LAYOUTS="FUNCIONARIO,TELEFONE"

```

Com essas configurações dois layouts estarão disponível para selecionar: *FUNCIONARIO* e *TELEFONE*. 
+ **FUNCIONARIO**: os arquivos serão renomeados com os próximos *5* caracteres após a palavra *CODIGO* encontrada no arquivo.
+ **TELEFONE**: os arquivos serão renomeados com os próximos *9* caracteres após a palavra *TELEFONE* encontrada no arquivo.

## Ferramenta de Desenvolvedor

**CTRL + p** para abrir o _DevTools_

## Logs

Disponível na pasta **logs** da aplicação.

**_debug.log_** número da página e o texto extraído.

**_pdf.log_** primeira página do _.pdf_ (utilizado para identificar a localização das informações).

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
