function getBestIcon(wantedSize, icons) {
  let dist = (a, b) => Math.abs(a - b);

  let bestMatch = null;
  let bestDist = Infinity;

  for (let icon of icons) {
    let sizes = icon.sizes.split(" ");
    for (let size of sizes) {
      size = parseInt(size);
      if (dist(size, wantedSize) < bestDist) {
        bestMatch = icon;
        bestDist = dist(size, wantedSize);
      }
    }
  }
  return bestMatch;
}
