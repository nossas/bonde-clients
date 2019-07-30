declare module 'next/config' {
  export default function getConfig(): {
    publicRuntimeConfig: {
      domainApiRest: string
      domainApiGraphql: string
      domainPublic: string
      pagarmeKey: string
    }
  }
}
