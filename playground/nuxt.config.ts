export default defineNuxtConfig({
  modules: [
    '@johnsilver/nuxt-prometheus',
  ],

  prometheus: {
    prefix: 'playground_',
    verbose: true,
    clusterPort: 9100,
  },
  nitro: {
    preset: 'node-cluster',
    // options: {
    //   cluster: {
    //     workers: '1' // or a specific number
    //   }
    // }
  }
})
