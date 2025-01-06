import * as migration_20250105_184440_baseline from './20250105_184440_baseline';
import * as migration_20250106_094938_add_about from './20250106_094938_add_about';

export const migrations = [
  {
    up: migration_20250105_184440_baseline.up,
    down: migration_20250105_184440_baseline.down,
    name: '20250105_184440_baseline',
  },
  {
    up: migration_20250106_094938_add_about.up,
    down: migration_20250106_094938_add_about.down,
    name: '20250106_094938_add_about'
  },
];
