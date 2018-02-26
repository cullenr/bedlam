import * as types from '../src/types.js';

describe('types', () => {
    describe('Point', () => {
        it('has constructor', () => {
            const p = new types.Point(1, 2);
            chai.assert.equal(p.x, 1);
            chai.assert.equal(p.y, 2);
        });
        it('is mutable', () => {
            const p = new types.Point(1, 2);
            chai.assert.equal(p.x, 1);
            chai.assert.equal(p.y, 2);
            p.x = 11; p.y = 12;
            chai.assert.equal(p.x, 11);
            chai.assert.equal(p.y, 12);
        });
    });
    describe('Rect', () => {
        it('has constructor', () => {
            const r = new types.Rect(1, 2, 3, 4);
            chai.assert.equal(r.x, 1);
            chai.assert.equal(r.y, 2);
            chai.assert.equal(r.w, 3);
            chai.assert.equal(r.h, 4);
        });
        it('is mutable', () => {
            const r = new types.Rect(1, 2, 3, 4);
            chai.assert.equal(r.x, 1);
            chai.assert.equal(r.y, 2);
            chai.assert.equal(r.w, 3);
            chai.assert.equal(r.h, 4);
            r.x = 11; r.y = 12; r.w = 13; r.h = 14; 
            chai.assert.equal(r.x, 11);
            chai.assert.equal(r.y, 12);
            chai.assert.equal(r.w, 13);
            chai.assert.equal(r.h, 14);
        });
    });
    describe('Sprite', () => {
        it('has constructor', () => {
            const image = {type: 'img'};
            const r = new types.Sprite(image, 1, 2, 3, 4);
            chai.assert.deepEqual(r.image, image);
            chai.assert(r.rect instanceof types.Rect);
            chai.assert.equal(r.rect.x, 1);
            chai.assert.equal(r.rect.y, 2);
            chai.assert.equal(r.rect.w, 3);
            chai.assert.equal(r.rect.h, 4);
        });
    });
    describe('TileSet', () => {
        it('has constructor', () => {
            const image = {type: 'img', src:'test-image', width: 128, height:256};
            const set = [
                {image: image, rect: {x: 0 * 32, y: 0 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 1 * 32, y: 0 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 2 * 32, y: 0 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 3 * 32, y: 0 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 0 * 32, y: 1 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 1 * 32, y: 1 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 2 * 32, y: 1 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 3 * 32, y: 1 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 0 * 32, y: 2 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 1 * 32, y: 2 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 2 * 32, y: 2 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 3 * 32, y: 2 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 0 * 32, y: 3 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 1 * 32, y: 3 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 2 * 32, y: 3 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 3 * 32, y: 3 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 0 * 32, y: 4 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 1 * 32, y: 4 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 2 * 32, y: 4 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 3 * 32, y: 4 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 0 * 32, y: 5 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 1 * 32, y: 5 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 2 * 32, y: 5 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 3 * 32, y: 5 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 0 * 32, y: 6 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 1 * 32, y: 6 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 2 * 32, y: 6 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 3 * 32, y: 6 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 0 * 32, y: 7 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 1 * 32, y: 7 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 2 * 32, y: 7 * 32, w: 32, h: 32}},
                {image: image, rect: {x: 3 * 32, y: 7 * 32, w: 32, h: 32}},
            ];
            const r = new types.TileSet(image, 32, 32);
            chai.assert.deepEqual(r.image, image);
            chai.assert.equal(r.tileWidth, 32);
            chai.assert.equal(r.tileHeight, 32);
            chai.assert.equal(r.size, 32);
            chai.assert.equal(r.tiles.length, 32);
            chai.assert.deepEqual(r.tiles, JSON.parse(JSON.stringify(set)));
        });
    });
    describe('TileMap', () => {
        it('has constructor', () => {
            const tiledata = [1, 1, 1, 1,
                              1, 0, 0, 1, 
                              1, 0, 0, 1, 
                              1, 1, 1, 1]
            const m = new types.TileMap(4, tiledata);
            chai.assert(m instanceof Array);
            chai.assert(m instanceof types.TileMap);
            chai.assert.deepEqual(tiledata, m);
            chai.assert.equal(m.w, 4);
        });
    });
});

