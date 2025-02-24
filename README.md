# BONDE Clients

O **BONDE Clients** é um conjunto de aplicações cliente desenvolvidas em Node.js que fazem parte do ecossistema Bonde. Essas aplicações são gerenciadas em um monorepo utilizando o gerenciador de pacotes [pnpm](https://pnpm.io/).

## Requisitos

- **Node.js**: Utilize a versão 14.x. Recomenda-se o uso do [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) para gerenciar diferentes versões do Node.js.
- **pnpm**: Versão 7.x.
- **npm**: Versão 6.x.

## Instalação

1. **Instale o NVM**:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```

   Após a instalação, reinicie seu terminal ou execute:

   ```bash
   source ~/.nvm/nvm.sh
   ```

2. **Instale e use a versão 14 do Node.js**:

   ```bash
   nvm install 14
   nvm use 14
   ```

3. **Instale o pnpm**:

   ```bash
   npm install -g pnpm@7
   ```

## Configuração

1. **Instale as dependências**:

   ```bash
   pnpm install
   ```

2. **Configure as variáveis de ambiente**:

   Cada aplicação cliente dentro do diretório `packages` possui suas próprias variáveis de ambiente. Navegue até o diretório de cada cliente e configure as variáveis conforme necessário.

   Por exemplo, para o `accounts-client`:

   ```bash
   cd packages/accounts-client
   # Configure suas variáveis de ambiente aqui no arquivo .env
   ```

## Ambiente de Desenvolvimento

Para iniciar os serviços em modo de desenvolvimento, execute o seguinte comando a partir do diretório raiz:

```bash
pnpm --filter accounts-client --filter canary-client --filter admin-client run dev
```

Este comando iniciará simultaneamente os clientes `accounts-client`, `canary-client` e `admin-client` em modo de desenvolvimento. O uso do `--filter` permite especificar quais pacotes devem ser afetados pelo comando, garantindo que apenas os clientes desejados sejam iniciados.

## Arquitetura BONDE completa

Para executar a estrutura backend completa do BONDE utilize o [repositório central de desenvolvimento](https://github.com/nossas/bonde?tab=readme-ov-file#bonde---ambiente-de-desenvolvimento).