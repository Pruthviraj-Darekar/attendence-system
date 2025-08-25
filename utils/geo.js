export function isWithinRadius(point, center, radiusMeters = 50) {
  function deg2rad(d) { return d * (Math.PI/180); }
  const R = 6371000;
  const dLat = deg2rad(point.lat - center.lat);
  const dLon = deg2rad(point.lng - center.lng);
  const a = Math.sin(dLat/2)**2 + Math.cos(deg2rad(center.lat))*Math.cos(deg2rad(point.lat))*Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const dist = R * c;
  return dist <= radiusMeters;
}
