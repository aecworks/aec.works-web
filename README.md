![logo](https://aec.works/img/logo-black.10fa9bc4.svg)

### aec.works-web

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/ee864a9e-f8a4-436a-9e9e-094df6a03fca/deploy-status)](https://app.netlify.com/sites/aecworks/deploys)
---

Live at `https://aec.works`

## Project setup
```
yarn install
```

### Using Staging API

```
yarn run serve:staging
```
This will run dev server locally but point it to our staging api at [aecworks-api-staging.herokuapp.com](http://aecworks-api-staging.herokuapp.com/).

This is the recommended approach for contributors working on the front end only.

Note: when using staging api, you must use LinkedIn login (could not get Github to work locally due to limitations of using oauth on localhost).


### With Local API Servers (requires local aecworks api)

This is the recommended approach for contributors working on the front end only.

```
yarn run serve
```

This requieres you to have [aecworks.api](https://github.com/aecworks/aec.works-api) running locally at `localhost:8000`

This is the recommended approach for working on features the span across front and back end.


## Release

#### Staging

All code pushed or merged into `staging` is automatically deployed to http://staging--aecworks.netlify.app/

#### Production

#### PRs

All PRs generate a preview deploy through netlify. Previews using the staging api.

All code pushed or merged into `master` is automatically deployed to https://aec.works
