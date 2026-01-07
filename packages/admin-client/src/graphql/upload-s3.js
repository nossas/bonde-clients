import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const UPLOAD_S3_MUTATION = gql`
  mutation ($filename: String!, $content_type: String!) {
    upload_s3(filename: $filename, content_type: $content_type) {
      signed_url
    }
  }
`

export const getSignedUrl = (file, callback) => {
  graphQLClient.request(
    UPLOAD_S3_MUTATION,
    { filename: file.name, content_type: file.type }
  ).then(response => {
    callback({ signedUrl: response.upload_s3.signed_url });
  }).catch(error => {
    console.error(error);
  });
}
