//
// @route /community/info
//

import urljoin from 'url-join';

export default function InfoPageConnected(): JSX.Element {
  window.location.href = urljoin(import.meta.env.VITE_DOMAIN_ADMIN_CANARY, '/community/settings');
  return (
    <p>Redirecionando para admin-canary</p>
  );
}
