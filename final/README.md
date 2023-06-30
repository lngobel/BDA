# Documentação da API

## COLEÇÃO: ENTREGADORES

### Retornar todos os entregadores

```http
  GET /entregadores
```
Obs: resultados ornedados pelo identificador padrão do banco de dados, gerados automaticamente no registro dos mesmos.

### Filtrar entregadores ordenados por campo específico

```http
  GET /entregadores/?order=${campo}&reverse=${valor}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `order`     | `string`   | Campo a ser usado para a ordenação na busca, padrão é o `id_ent`|
| `reverse`   | `string`   | Opcao {0:1} para buscar em orden reversa ou não, padrão é o valor `0`|

### Filtrar entregadores por nome

```http
  GET /entregadores?search=${nome}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `search`    | `string`   | Nome a ser buscado entre os entregadores.|
Obs: a busca é realizada por nome, não é possível buscar por partes de um nome, ou seja, o termo `Luc` não resultará em conteúdos com o nome `Lucas`.

### Retornar entregador por ID

```http
  GET /entregadores/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`       | `number`   | **Obrigatório**. Identificador do entregador, valor do campo `id_ent` no banco|

### Retorna entregadores filtrados por ano de nascimento

```http
  GET /entregadores/filter_year?greater=${min}&less=${max}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `min`       | `number`   | **Obrigatório**. Limite inicial do ano de nascimento|
| `max`       | `number`   | **Obrigatório**. Limite final do ano de nascimento|
Obs: os limites são inclusos na resposta.

### Registrar um novo entregador

```http
  POST /entregadores
```
Parâmetros:

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id_ent`| `number`   | **Obrigatório**. Um identificador numérico para o entregador|
| `nome`| `string`   | **Obrigatório**. Nome do entregador|
| `nascimento`| `number`   | **Obrigatório**. Ano de nascimento do entregador|
| `cpf`| `string`   | **Obrigatório**. CPF do entregador, adicionar valor com os '.' e o '-' nos devidos lugares|
| `email`| `string`   | **Obrigatório**. Email do entregador|
Obs: enviar parâmetros no corpo da requisição no formato **form-url-encode**

### Atualizar um entregador passando o id

```http
  PUT /entregadores/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Um identificador numérico para o entregador, valor do campo `id_ent` no banco|

No corpo da requisição deverão ser passados os seguintes parâmetros a serem atualizados no formato **form-url-encode**:
| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`| `string`   | Nome do entregador|
| `nascimento`| `number`   | Ano de nascimento do entregador|
| `cpf`| `string`   | CPF do entregador, adicionar valor com os '.' e o '-' nos devidos lugares|
| `email`| `string`   | Email do entregador|
Obs: Nenhum parâmetro é **Obrigatório**, os parâmetros  não enviados não serão alterados.

### Remover um entregador por ID

```http
  DELETE /entregadores/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Um identificador numérico para o entregador, valor do campo `id_ent` no banco|
