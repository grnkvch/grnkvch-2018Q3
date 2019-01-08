const EnvironmentConfig = {
  combinations: {
    choco: ['castle', 'tree', 'clouds', 'sun'],
    dirt: ['castle', 'tree', 'clouds', 'sun'],
    grass: ['castle', 'tree', 'clouds', 'sun'],
    metall: ['castle', 'tree', 'clouds', 'sun'],
    purple: ['castle', 'tree', 'clouds', 'sun'],
    sand: ['castleDesert', 'treeDesert', 'clouds', 'sun'],
    snow: ['castle', 'treeSnow', 'clouds', 'sun'],
    tundra: ['castle', 'tree', 'clouds', 'sun'],
    cake: ['castle', 'tree', 'clouds', 'sun'],
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
      drawOrder: 1,
      grounded: true,
    },
    castleDesert: {
      pos: { x: 100, y: 50 },
      countMax: 1,
      overlay: true,
      drawOrder: 1,
      grounded: true,
    },
    treeSnow: {
      pos: { x: 100, y: 50 },
      countMax: 1,
      overlay: true,
      drawOrder: 1,
      grounded: true,
    },
    treeDesert: {
      pos: { x: 100, y: 50 },
      countMax: 1,
      overlay: true,
      drawOrder: 1,
      grounded: true,
    },
    tree: {
      pos: { minX: 0, _maxX: 100 },
      countMax: 3,
      countMin: 1,
      overlay: true,
      drawOrder: 1,
      grounded: true,
    },
    clouds: {
      pos: {
        minX: 0, _minY: 0, _maxX: 100, _maxY: 10,
      },
      countMax: 3,
      countMin: 1,
      overlay: true,
      drawOrder: 0,
    },
    sun: {
      pos: {
        minX: 0, _minY: 0, _maxX: 100, _maxY: 10,
      },
      countMax: 1,
      countMin: 1,
      overlay: false,
      drawOrder: 0,
    },
  },

};
export default EnvironmentConfig;
