import * as migration_20250105_184440_baseline from './20250105_184440_baseline';

export const migrations = [
  {
    up: migration_20250105_184440_baseline.up,
    down: migration_20250105_184440_baseline.down,
    name: '20250105_184440_baseline'
  },
];
