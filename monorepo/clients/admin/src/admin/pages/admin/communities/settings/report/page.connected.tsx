//
// @route /community/report
//

import urljoin from 'url-join';

export default function ReportPageConnected(): JSX.Element {
  window.location.href = urljoin(import.meta.env.VITE_DOMAIN_ADMIN_CANARY, '/community/analytics');
  return (
    <p>Redirecionando para admin-canary</p>
  );
}