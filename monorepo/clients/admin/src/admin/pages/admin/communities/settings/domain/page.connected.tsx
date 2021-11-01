//
// @route /community/domain
//
import urljoin from 'url-join';


export default function DomainPageConnected(): JSX.Element {
  window.location.href = urljoin(import.meta.env.VITE_DOMAIN_ADMIN_CANARY, '/community/domains');

  return (
    <p>Redirecionando para admin-canary</p>
  );
}