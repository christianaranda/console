import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import httpBackend from 'i18next-http-backend';
import Pseudo from 'i18next-pseudo';

import { dateTimeFormatter, fromNow } from './components/utils/datetime';

const params = new URLSearchParams(window.location.search);
const pseudolocalizationEnabled = params.get('pseudolocalization') === 'true';

i18n
  .use(new Pseudo({ enabled: pseudolocalizationEnabled, wrapped: true }))
  // fetch json files
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(httpBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(detector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath: 'static/locales/{{lng}}/{{ns}}.json',
    },
    lng: localStorage.getItem('bridge/language'),
    fallbackLng: 'en',
    load: 'languageOnly',
    debug: process.env.NODE_ENV === 'development',
    detection: { caches: [] },
    contextSeparator: '~',
    ns: [
      'badge',
      'ceph-storage-plugin',
      'cloudshell',
      'console-app',
      'console-shared',
      'container-security',
      'devconsole',
      'editor',
      'git-service',
      'gitops-plugin',
      'helm-plugin',
      'insights-plugin',
      'k8s',
      'keystone-idp-form',
      'knative-plugin',
      'kubevirt-plugin',
      'language-preferences-modal',
      'ldap-idp-form',
      'limit-range',
      'logs',
      'list-page',
      'lso-plugin',
      'masthead',
      'machines',
      'machine-autoscalers',
      'machine-configs',
      'machine-config-pools',
      'machine-health-checks',
      'machine-sets',
      'metal3-plugin',
      'modal',
      'network-policy',
      'network-route',
      'network-service',
      'nodes',
      'notification-drawer',
      'oauth',
      'olm',
      'openid-idp-form',
      'olm',
      'pagerduty-receiver-form',
      'pipelines-plugin',
      'public',
      'quickstart',
      'related-objects',
      'remove-user-modal',
      'request-header-idp-form',
      'resource-quota',
      'rhoas-plugin',
      'role',
      'routing-labels-editor',
      'rules',
      'search',
      'service-account',
      'sidebar',
      'slack-receiver-form',
      'topology',
      'tour',
      'user',
      'webhook-receiver-form',
      'yaml',
    ],
    defaultNS: 'public',
    nsSeparator: '~',
    keySeparator: false,
    postProcess: ['pseudo'],
    interpolation: {
      format: function(value, format, lng, options) {
        if (format === 'number') {
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Browser_compatibility
          return new Intl.NumberFormat(lng).format(value);
        }
        if (value instanceof Date) {
          if (format === 'fromNow') {
            return fromNow(value, null, options);
          }
          return dateTimeFormatter.format(value);
        }
        return value;
      },
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: true,
      wait: true,
    },
    saveMissing: true,
    missingKeyHandler: function(lng, ns, key) {
      window.windowError = `Missing i18n key "${key}" in namespace "${ns}" and language "${lng}."`;
      // eslint-disable-next-line no-console
      console.error(window.windowError);
    },
  });

export default i18n;
