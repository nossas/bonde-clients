const analytics = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  var page = document.location.pathname;
  if (page === '/') {
    var page = window.__data.mobilizations.data[0].id;
    ga('send', 'pageview', page);
  }

  ga('create', 'UA-26278513-30', 'auto');
  ga('send', 'pageview', page);
`

export const mobTracker = `ga('create', '{mobTrackingId}', 'auto', {'name': 'mobTracker'});`
export default analytics
