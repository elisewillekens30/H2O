window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('https://elisewillekens30.github.io/H2O/service_worker.js');
  }
}
