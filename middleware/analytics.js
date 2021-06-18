export default async function ({ app, $config }) {
  if ($config.plausibleAnalytics.enabled) {
    app.$plausible.enableAutoPageviews()
  }
}
