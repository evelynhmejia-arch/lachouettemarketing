// La Chouette Marketing — bandeau de consentement Google Analytics
// GA reste en mode "consent denied" tant que le visiteur n'a pas cliqué "Accepter".

(function () {
  var CONSENT_KEY = 'lcm_cookie_consent';
  var saved = null;
  try { saved = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  function grant() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  if (saved === 'accepted') {
    grant();
    return;
  }
  if (saved === 'refused') {
    return;
  }

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML =
    '<p>On utilise Google Analytics pour comprendre comment ce site est visité. Aucune donnée n’est collectée sans votre accord.</p>' +
    '<div class="cookie-banner-actions">' +
      '<button type="button" class="cookie-btn cookie-btn-refuse">Refuser</button>' +
      '<button type="button" class="cookie-btn cookie-btn-accept">Accepter</button>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(banner);

    banner.querySelector('.cookie-btn-accept').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch (e) {}
      grant();
      banner.remove();
    });

    banner.querySelector('.cookie-btn-refuse').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'refused'); } catch (e) {}
      banner.remove();
    });
  });
})();
