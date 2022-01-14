# Admin Monorepo

# Para rodar o bonde-admin corretamente, siga os passos:

- Na raiz desse projeto, crie um arquivo .env para inserir as variáveis de ambiente. Elas podem ser encontradas no arquivo .drone.yml, também na raiz.
- Certifique-se que a versão do node utilizada é a 14 com o comando

### Requirements

- Git (required)
- NodeJS 14 (required) `nvm install 14 && nvm use 14`
- [Pnpm](https://pnpm.io/) (required) `curl -fsSL https://get.pnpm.io/install.sh | sh -`

```bash
$ git --version
git version 2.7.4
$ node --version
v14.18.3
$ pnpm --version
6.26.1
```

### Manual

```bash
mkdir bonde/ && cd bonde/
git clone git@github.com:nossas/bonde-client.git
cd bonde-client
```

To configure packages, we use .env files, examples could be founded at each package.

With help from Pnpm, install dependencies:

### Local Development

```jsx
	nvm use 14
```

- Ainda na raiz desse projeto, instale os pacotes necessários por meio do comando

```jsx
	pnpm i
```

- Agora é possível subir o package bonde-admin, ainda na mesma pasta, com o comando

```jsx
pnpm m run dev --filter bonde-admin
```

Seguindo os passos corretamente, o projeto estará rodando localmente na porta 5001

 <!-- TODO: Adicionar passo a passo para o package bonde-webpage -->

### Admin Dependencies

You will need to update .env file in bonde-admin to proper use of graphql api.

We use an api rest to upload images.

And as a logged in section you will need to be authenticated.

### Tests

As simples as:

`pnpm m run test`

## Links

- [How to contribute](../../CONTRIBUTING.md)
