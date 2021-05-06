# Imagizer Cloudflare Worker

Integrate Imagizer using a Cloudflare worker

## Getting Started

![demo](https://user-images.githubusercontent.com/2287963/117368590-93911700-ae78-11eb-96d6-f5010524ae9e.gif)

### Install

This project requires [NodeJS](https://nodejs.org/en/download/) with the NPM package manager.

> Clone this project
```shell
git clone git@github.com:Nventify/imagizer-cloudflare-worker.git
cd imagizer-cloudflare-worker
````

> Install with NPM
```shell
# Install CloudFlare Wrangler
npm install @cloudflare/wrangler -g

# Install Project Dependencies
npm install
```

### Setup

> Login to your Cloudflare account and authorize this project.
```shell 
wrangler login
```

Once authorized, update the [wrangle.toml](wrangle.toml) file with the following information.

- The Cloudflare Zone ID, which can be found in the Cloudflare [dashboard](https://dash.cloudflare.com/).
- A route which matches your image locations. (ex: `*example.com/product-images/*`)
- An Imagizer source domain. If you do not already have an Imagizer source domain, follow the steps in our docs [here](https://docs.imagizer.com/guide/imagizer_cloud/).

### Publish

> Publish the worker to your Cloudflare account.
```shell
wrangler publish
```

Congratulations! Your images will now be optimized through Imagizer.

## Debug

> Monitor the logs from the worker
```shell
wrangler tail --format pretty
```

## Uninstall

You may remove the worker from the worker settings page on the Cloudflare Dashboard. 

---
**NOTE**

You may need to review the Cloudflare Worker [payment plans](https://developers.cloudflare.com/workers/platform/pricing).
Their free plan will cover up to 100,000 requests a day.

See our [Cloudflare Integration](https://docs.imagizer.com/guide/integration/cloudflare/) docs for more information.

See Cloudflare's [Wrangler](https://github.com/cloudflare/wrangler) docs for more information on the deployment process.

---
