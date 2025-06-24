![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/artmizu/nuxt-prometheus/release.yml?branch=main)

![Cover](https://raw.githubusercontent.com/artmizu/nuxt-prometheus/main/.github/cover.jpg) 

# 📊 Prometheus integration for Nuxt 3
Allows you to better understand what's going on with your application and how to optimize performance and other things in production. **Nuxt 2** users can use [this version](https://github.com/artmizu/analytics-nuxt-2).

> **Note:** This is a fork of the original [@artmizu/nuxt-prometheus](https://github.com/artmizu/nuxt-prometheus) package with additional features for cluster support.

## Features
* Default NodeJS metrics exported through the prometheus middleware
* Custom metrics about pages render time and external request consumption time
* Health check middleware
* **NEW:** Cluster metrics support with `clusterMetrics()` from prom-client
* **NEW:** Cluster port configuration for multi-worker setups

## Default routes that you can customise via the module options
* `/metrics` - prometheus metrics
* `/health` - health check

## Installation
Install package via a package manager: 
```bash
# using nuxi, it automatically appends the module in your nuxt.config
npx nuxi@latest module add prometheus

# using npm
npm install @johnsilver/nuxt-prometheus

# using yarn
yarn add @johnsilver/nuxt-prometheus

# using pnpm
pnpm add @johnsilver/nuxt-prometheus
```

Add it to a modules section of your nuxt config:
```js
export default {
  modules: ['@johnsilver/nuxt-prometheus']
}
```

## Cluster Mode Setup
For production deployments with multiple workers, use the following configuration:

```js
export default defineNuxtConfig({
  modules: ['@johnsilver/nuxt-prometheus'],
  
  prometheus: {
    clusterPort: 9100, // Port for cluster metrics endpoint
    verbose: true,
  },
  
  nitro: {
    preset: 'node-cluster',
  }
})
```

### Running in Production with Cluster Mode
To run your application in production with cluster support:

```bash
NODE_ENV=production NITRO_PRESET=node-cluster NITRO_CLUSTER_WORKERS=2 node playground/.output/server/index.mjs
```

This command:
- Sets production environment
- Enables node-cluster preset
- Runs 2 worker processes
- Starts the server from the built output

## Grafana sample setup
Once the metrics have been collected by Prometheus, you will want to review them. I use Grafana for this purpose, and my metrics setup looks something like this:
![Cover](https://raw.githubusercontent.com/artmizu/nuxt-prometheus/main/.github/grafana.jpg)

## Options
You can pass it through module options and the nuxt config property `prometheus`.

### verbose
- Type: `boolean`
- Default: `true`
- Description: Additional logs in the dev mode, about page rendering time and time of external API requests

### healthCheck
- Type: `boolean`
- Default: `true`
- Description: To turn on and off the healthcheck route

### healthCheckPath
- Type: `string`
- Default: `/health`
- Description: Healthcheck url path

### prometheusPath
- Type: `string`
- Default: `/metrics`
- Description: Prometheus exporter url path

### prefix
- Type: `string`
- Default: no prefix
- Description: An optional prefix for metric names

### clusterPort
- Type: `number`
- Default: `9000`
- Description: Port for cluster metrics endpoint (only used when NITRO_PRESET=node-cluster)
