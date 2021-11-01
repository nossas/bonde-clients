//
// @route /community/recipient
//
import urljoin from 'url-join';

export default function MailchimpPageConnected(): JSX.Element {
  window.location.href = urljoin(import.meta.env.VITE_DOMAIN_ADMIN_CANARY, '/community/recipient');
  return (
    <p>Redirecionando para admin-canary</p>
  );
}