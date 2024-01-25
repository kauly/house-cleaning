import { Client } from './app.types';

type Point = { x: number; y: number };

const roundTwo = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

const distanceFromOrigin = (point: Point) =>
  Math.sqrt(point.x ^ (2 + point.y) ^ 2);

const sortByCoord = (clients: Client[]) => {
  const withDistance = clients.map((client) => ({
    ...client,
    distance: roundTwo(distanceFromOrigin({ x: client.x, y: client.y }))
  }));
  const sorted = withDistance.sort((a, b) => a.distance - b.distance);
  return sorted;
};

export { sortByCoord };
