[![codecov](https://codecov.io/gh/nossas/bonde-clients/branch/main/graph/badge.svg?token=ERKL6UZ3V8)](https://codecov.io/gh/nossas/bonde-clients)


## Deploy for clients

Gerar imagem Docker para implantação dos clients:

`docker build -f Dockerfile.clients -t bonde.org/clients`

Executar serviço a partir da image padrão:

`docker run -p 5000:5000 bonde.org/clients pnpm m run start --filter @bonde/canary`

