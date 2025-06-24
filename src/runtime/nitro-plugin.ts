import http from 'http'
import cluster from 'node:cluster'
import { defineNitroPlugin } from 'nitropack/runtime/plugin'
import { useRuntimeConfig } from 'nitropack/runtime/config'

import { AggregatorRegistry } from 'prom-client'

let server: http.Server | null = null

export default defineNitroPlugin((nitroApp) => {

  if (process.env.NITRO_PRESET !== 'node-cluster' && process.env.NITRO_PRESET !== 'node_cluster') {
    return;
  }
  const config = useRuntimeConfig()
  const prometheusConfig = config.public.prometheus


  if (cluster.isMaster) {
    const aggregatorRegistry = new AggregatorRegistry()

    if (!server) {
      server = http
        .createServer(async (req, res) => {
          if (req.url !== '/metrics') {
            res.writeHead(404)
            res.end()
            return
          }

          const metrics = await aggregatorRegistry.clusterMetrics()

          res.writeHead(200, {
            'Content-Type': aggregatorRegistry.contentType,
          })
          res.end(metrics)
        })
        .listen(prometheusConfig.clusterPort)
    }
  }
})
