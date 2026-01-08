import { gql, useMutation } from 'bonde-core-tools';

export const UPLOAD_S3_MUTATION = gql`
  mutation ($filename: String!, $content_type: String!) {
    upload_s3(filename: $filename, content_type: $content_type) {
      signed_url
    }
  }
`;

export const useUploadS3 = () => {
  const [mutate, { loading, error }] = useMutation(UPLOAD_S3_MUTATION);
  
  const getSignedUrl = async (file) => {
    const result = await mutate({
      variables: {
        filename: file.name,
        content_type: file.type
      }
    });
    return result.data.upload_s3.signed_url;
  };
  
  return { getSignedUrl, loading, error };
};

export const getSignedUrl = (file, callback) => {
  fetch(process.env.REACT_APP_DOMAIN_API_GRAPHQL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: UPLOAD_S3_MUTATION.loc.source.body,
      variables: { filename: file.name, content_type: file.type }
    })
  })
  .then(res => res.json())
  .then(response => {
    if (response.errors) throw new Error(response.errors[0].message);
    callback({ signedUrl: response.data.upload_s3.signed_url });
  })
  .catch(error => {
    console.error(error);
    callback({ error });
  });
};


export const asyncGetSignedUrl = async (file) => {
  try {
    const response = await fetch(process.env.REACT_APP_DOMAIN_API_GRAPHQL, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: UPLOAD_S3_MUTATION.loc.source.body,
        variables: { filename: file.name, content_type: file.type }
      })
    })
    const jsonData = await response.json()
    return { signedUrl: jsonData.data.upload_s3.signed_url }
  } catch (error) {
    console.log(error);
  }
};

export default getSignedUrl;