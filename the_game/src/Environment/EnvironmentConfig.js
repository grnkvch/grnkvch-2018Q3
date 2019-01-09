const EnvironmentConfig = {
  combinations: {
    choco: ['castle', 'tree', 'clouds', 'sun', 'sky'],
    dirt: ['castle', 'tree', 'clouds', 'sun', 'sky'],
    grass: ['castle', 'tree', 'clouds', 'sun', 'sky'],
    metall: ['castle', 'tree', 'clouds', 'sun', 'sky'],
    purple: ['castle', 'tree', 'clouds', 'sun', 'sky'],
    sand: ['castleDesert', 'treeDesert', 'clouds', 'sun', 'sky'],
    snow: ['castle', 'treeSnow', 'clouds', 'sun', 'sky'],
    tundra: ['castle', 'tree', 'clouds', 'sun', 'sky'],
    cake: ['castle', 'tree', 'clouds', 'sun', 'sky'],
    choco_night: ['castle', 'tree', 'clouds', 'moon', 'night_sky'],
    dirt_night: ['castle', 'tree', 'clouds', 'moon', 'night_sky'],
    grass_night: ['castle', 'tree', 'clouds', 'moon', 'night_sky'],
    metall_night: ['castle', 'tree', 'clouds', 'moon', 'night_sky'],
    purple_night: ['castle', 'tree', 'clouds', 'moon', 'night_sky'],
    sand_night: ['castleDesert', 'treeDesert', 'clouds', 'moon', 'night_sky'],
    snow_night: ['castle', 'treeSnow', 'clouds', 'moon', 'night_sky'],
    tundra_night: ['castle', 'tree', 'clouds', 'moon', 'night_sky'],
    cake_night: ['castle', 'tree', 'clouds', 'moon', 'night_sky'],
  },
  itemsPos: {
    // {x: , y:}, {minX: , minY: , maxX: , maxY: },
    // add "_" (like {_x: , y:} or {_minX: , minY: , _maxX: , maxY: }),
    // to make position relative to canvas size
    // or leave object empty to make position allrandom
    castle: {
      pos: {
        minX: 0, _minY: 0, _maxX: 100, _maxY: 10,
      },
      countMax: 2,
      countMin: 1,
      overlay: false,
      drawOrder: 2,
      grounded: true,
    },
    castleDesert: {
      pos: { x: 100, y: 50 },
      countMax: 1,
      overlay: true,
      drawOrder: 2,
      grounded: true,
    },
    treeSnow: {
      pos: { x: 100, y: 50 },
      countMax: 1,
      overlay: true,
      drawOrder: 2,
      grounded: true,
    },
    treeDesert: {
      pos: { x: 100, y: 50 },
      countMax: 1,
      overlay: true,
      drawOrder: 2,
      grounded: true,
    },
    tree: {
      pos: { minX: 0, _maxX: 100 },
      countMax: 3,
      countMin: 1,
      overlay: true,
      drawOrder: 2,
      grounded: true,
    },
    clouds: {
      pos: {
        minX: 0, _minY: 0, _maxX: 100, _maxY: 10,
      },
      countMax: 3,
      countMin: 1,
      overlay: true,
      drawOrder: 1,
    },
    sun: {
      pos: {
        minX: 0, _minY: 0, _maxX: 100, _maxY: 10,
      },
      countMax: 1,
      countMin: 1,
      overlay: false,
      drawOrder: 1,
    },
    moon: {
      pos: {
        minX: 0, _minY: 0, _maxX: 100, _maxY: 10,
      },
      countMax: 1,
      countMin: 1,
      overlay: false,
      drawOrder: 1,
    },
    sky: {
      pos: { x: 0, y: 0 },
      countMax: 1,
      countMin: 1,
      overlay: true,
      drawOrder: 0,
    },
    night_sky: {
      pos: { x: 0, y: 0 },
      countMax: 1,
      countMin: 1,
      overlay: true,
      drawOrder: 0,
    },
  },

};
export default EnvironmentConfig;
