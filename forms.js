// La Chouette Marketing — soumission des formulaires (contact + infolettre) sans quitter la page
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form.contact-form, form.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi...';
      }

      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          var isNewsletter = form.classList.contains('newsletter-form');
          var message = isNewsletter
            ? 'Merci, c\'est noté ! Vous recevrez notre prochaine infolettre.'
            : 'Merci ! Votre message est bien reçu, on vous répond par courriel dans les 48h.';
          var successBox = document.createElement('p');
          successBox.className = 'form-success';
          successBox.textContent = message;
          form.replaceWith(successBox);
        } else {
          throw new Error('Formspree error');
        }
      }).catch(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        var errorBox = form.querySelector('.form-error');
        if (!errorBox) {
          errorBox = document.createElement('p');
          errorBox.className = 'form-error';
          form.appendChild(errorBox);
        }
        errorBox.textContent = 'Une erreur est survenue. Réessayez, ou écrivez-nous directement à evelyn@lachouettemarketing.ca';
      });
    });
  });
});
