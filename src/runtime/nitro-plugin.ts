// @ts-ignore
import http from 'http'
// @ts-ignore
import cluster from 'node:cluster'
// @ts-ignore
import { AggregatorRegistry } from 'prom-client'
import { useRuntimeConfig } from '#imports'
// @ts-ignore
import { defineNitroPlugin } from 'nitropack/runtime/plugin'

const aggregatorRegistry = new AggregatorRegistry()

let server: http.Server | null = null

export default defineNitroPlugin((nitroApp: any) => {
  // @ts-ignore
  if (process.env.NITRO_PRESET !== 'node-cluster') {
    return
  }
  const config = useRuntimeConfig()
  const prometheusConfig = config.public.prometheus

  if (cluster.isMaster) {
    if (!server) {
      server = http
        .createServer(async (req: any, res: any) => {
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

