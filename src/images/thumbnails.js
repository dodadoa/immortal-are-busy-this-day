const importAll = (r) => {
  return r.keys().map(r);
}

const thumbnails = importAll(require.context('./thumbnails', true, /\.(png)$/));

export default thumbnails