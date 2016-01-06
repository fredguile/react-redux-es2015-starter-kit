export default function statsSummary(stats) {
  const json = stats.toJson({
    hash: true,
    version: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    chunkOrigins: false,
    source: false,
    modules: false,
    errorDetails: false
  });

  return {
    errors: json.errors,
    warnings: json.warnings,
    hash: json.hash,
    time: json.time,
    chunks: json.chunks.map(chunk => {
      return {
        names: chunk.names,
        files: chunk.files,
        modules: chunk.modules.map(mod => mod.name)
      };
    })
  };
}
