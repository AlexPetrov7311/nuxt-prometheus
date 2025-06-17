// @ts-ignore
import { defineNuxtConfig } from 'nuxt'
// @ts-ignore
import MyModule from '..'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],

  prometheus: {
    verbose: true,
    prefix: 'playground_',
    clusterPort: 9100,
  },

  nitro: {
    preset: 'node-cluster',
  },
})
