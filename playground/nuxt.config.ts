import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../'

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
  }
})
