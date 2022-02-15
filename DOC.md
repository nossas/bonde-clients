
- Publicação / CI (Clients)

CI é a automatização desses processos.

- Testar aplicações / integrações [tests]

- Build e [Conteinerização](https://www.redhat.com/pt-br/topics/cloud-native-apps/what-is-containerization) [build]
      Monorepo
      `libs/` bibliotecas compartilhadas entre as aplicações
      `packages/` aplicações de interface web

- Publicação da imagem hub Docker [push]

- Atualização do cluster com nova imagem [pull]

Toda aplicação web tem os comandos:
  - test: executa testes unitários da aplicação.
  - build: compila aplicação para ser executada em ambiente de produção.
  - dev: executa servidor de desevolvimento com capacidade de hot reload.
  - start: executa server de produção a partir dos arquivos compilados.


NOTA:
  - Checkout necessário com submodules atividado, devido as libs bonde-components e bonde-core-tools estarem em outro repositorio. O problema está relacionado ao momento do checkout que faz isso na raiz, baixando repositórios como bonde-apis, bonde-workers entre outros, que não são necessários no processo de build / conteinerização.