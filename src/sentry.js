import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";


// Only enable if on prod environment
if (process.env.BRANCH) {
  Sentry.init({
    dsn: "https://ff434f3f877e4a7a957fa0d875963509@o179529.ingest.sentry.io/1851600",
    // From Netlify
    release: process.env.COMMIT_REF,
    environment: process.env.BRANCH,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
  })
}
