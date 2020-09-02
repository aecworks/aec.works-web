import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";


// Only enable if on prod environment
if (process.env.BRANCH) {
  Sentry.init({
    dsn: "https://90d9074c9f064bdf889461fadad1a390@o179529.ingest.sentry.io/5414489",
    // From Netlify
    release: process.env.COMMIT_REF,
    environment: process.env.BRANCH,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
  })
}
