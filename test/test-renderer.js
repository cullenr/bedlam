import * as types from '../src/types.js';
import * as gfx from '../src/renderer.js';

describe('renderer', () => {
    describe('sampleTileMap', () => {
        const tiledata = [
            8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9,
            8, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 9, 
            8, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 9, 
            8, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 9, 
            8, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 9, 
            8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 
            8, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 9, 
            8, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 9, 
            8, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 9, 
            8, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 9, 
            8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 
            8, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 9, 
            8, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 9, 
            8, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 9, 
            8, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 9, 
            8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9,
        ];
        const tilemap = new types.TileMap(16, tiledata);
        it('samples single tiles', () => {
            let out = gfx.sampleTileMap(tilemap, new types.Rect(0, 0, 1, 1));
            chai.assert.deepEqual(out, [{id: 8, dest: {x: 0, y: 0}}]);

            out = gfx.sampleTileMap(tilemap, new types.Rect(1, 1, 1, 1));
            chai.assert.deepEqual(out, [{id: 2, dest: {x: 1, y: 1}}]);
        });
        it('returns id 0 on out of range tiles', () => {
            const n = gfx.sampleTileMap(tilemap, new types.Rect(0,  -1, 1, 1));
            const e = gfx.sampleTileMap(tilemap, new types.Rect(80,  0, 1, 1));
            const s = gfx.sampleTileMap(tilemap, new types.Rect(0,  80, 1, 1));
            const w = gfx.sampleTileMap(tilemap, new types.Rect(-1,  0, 1, 1));
            chai.assert.deepEqual(n, [{id: 0, dest: {x: 0,  y: -1}}]);
            chai.assert.deepEqual(e, [{id: 0, dest: {x: 80, y: 0}}]);
            chai.assert.deepEqual(s, [{id: 0, dest: {x: 0,  y: 80}}]);
            chai.assert.deepEqual(w, [{id: 0, dest: {x: -1, y: 0}}]);
        });
        it('samples on map areas at origin', () => {
            const expected = [
                {id: 8, dest: {x: 0, y: 0}},
                {id: 1, dest: {x: 1, y: 0}},
                {id: 1, dest: {x: 2, y: 0}},
                {id: 1, dest: {x: 3, y: 0}},
                {id: 8, dest: {x: 0, y: 1}},
                {id: 2, dest: {x: 1, y: 1}},
                {id: 2, dest: {x: 2, y: 1}},
                {id: 2, dest: {x: 3, y: 1}}
            ];
            const out = gfx.sampleTileMap(tilemap, new types.Rect(0, 0, 4, 2));
            chai.assert.deepEqual(out, expected);
        });
        it('samples on map areas at offset', () => {
            const expected = [
                {id: 0, dest: {x: 8,  y: 14}},
                {id: 0, dest: {x: 9,  y: 14}},
                {id: 0, dest: {x: 10, y: 14}},
                {id: 5, dest: {x: 11, y: 14}},
                {id: 1, dest: {x: 8,  y: 15}},
                {id: 1, dest: {x: 9,  y: 15}},
                {id: 1, dest: {x: 10, y: 15}},
                {id: 1, dest: {x: 11, y: 15}}
            ];
            const out = gfx.sampleTileMap(tilemap, new types.Rect(8, 14, 4, 2));
            chai.assert.deepEqual(out, expected);
        });
        it('samples on and off map areas at offset', () => {
            const expected = [
                {id: 5, dest: {x: 14, y: 14}},
                {id: 9, dest: {x: 15, y: 14}},
                {id: 0, dest: {x: 16, y: 14}},
                {id: 1, dest: {x: 14, y: 15}},
                {id: 9, dest: {x: 15, y: 15}},
                {id: 0, dest: {x: 16, y: 15}},
                {id: 0, dest: {x: 14, y: 16}},
                {id: 0, dest: {x: 15, y: 16}},
                {id: 0, dest: {x: 16, y: 16}}
            ];
            const out = gfx.sampleTileMap(tilemap, new types.Rect(14, 14, 3, 3));
            console.log(expected, out)
            chai.assert.deepEqual(out, expected);
        });
    });
    describe('draw', () => {
        const image = {type: 'img'};
        const sprite = new types.Sprite(image, 1, 2, 3, 4);
        it('draws at Points', () => {
            const ctx = {
                ctx: {
                    drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) {
                        chai.assert.deepEqual(img, image);
                        chai.assert.equal(sx, 1);
                        chai.assert.equal(sy, 2);
                        chai.assert.equal(sw, 3);
                        chai.assert.equal(sh, 4);
                        chai.assert.equal(dx, 5);
                        chai.assert.equal(dy, 6);
                        chai.assert.equal(dw, 3);
                        chai.assert.equal(dh, 4);
                    }
                }
            };
            gfx.draw(ctx, sprite, new types.Point(5, 6))
        })
        it('draws into Rects', () => {
            const ctx = {
                ctx: {
                    drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) {
                        chai.assert.deepEqual(img, image);
                        chai.assert.equal(sx, 1);
                        chai.assert.equal(sy, 2);
                        chai.assert.equal(sw, 3);
                        chai.assert.equal(sh, 4);
                        chai.assert.equal(dx, 5);
                        chai.assert.equal(dy, 6);
                        chai.assert.equal(dw, 7);
                        chai.assert.equal(dh, 8);
                    }
                }
            };
            gfx.draw(ctx, sprite, new types.Rect(5, 6, 7, 8))
        });
    });
    describe('drawTiles', () => {
        
    });
});
