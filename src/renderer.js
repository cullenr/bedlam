import { Point } from '/src/types.js';
import M from '/src/math.js';
/**
 *  Simple software renderer using 2d canvas
 */


/**
 *  Get the tile ids inside the given rect. The rect dimensions should be in
 *  tile space.
 *  
 *  @param tilemap {TileMap} the tilemap to sample 
 *  @param rect {Rect} the rect that defines the area to be sampled
 *  @return {{id: number, dest: Rect}}
 */
export const sampleTileMap = (tilemap, rect) => new Array(rect.w * rect.h)
    .fill()
    .map((e, i) => {
        const w = tilemap.w < rect.w ? tilemap.w : rect.w;
        const x = Math.trunc(i % w + rect.x);
        const y = Math.trunc(i / w + rect.y);
        const xy = x + y * tilemap.w;

        const id = xy >= 0 && xy < tilemap.length && x < tilemap.w 
            ? tilemap[xy]
            : 0;// tile zero is a special tile that will be used when we try
                // to draw portions of the map that are out of range
        const dest = new Point(x, y);

        // this type is internal to this module. Don't bother exporting it
        return {id, dest};
    });

/**
 *  Renders a sprite into a rectangle in a rendering context. Decimal values in 
 *  the dest will quantised into pixel values accross the dimensions of the 
 *  global tile size.
 *
 * TODO : implement global tile size
 * TODO : implement quantisation 
 *
 *  The destination can be a point or a rectangle to allow scaling.
 *
 *  @param ctx {RenderCtx}
 *  @param sprite {Clip}
 *  @param dest {Rect|Point}
 */
export const draw = (ctx, sprite, dest) => {
    return ctx.ctx.drawImage(sprite.image, 
            sprite.rect.x, sprite.rect.y, sprite.rect.w, sprite.rect.h, 
            dest.x, dest.y, dest.w || sprite.rect.w, dest.h || sprite.rect.h); 
}
/**
 * Render a portion of a tilemap into a rendering context.
 *
 *  @param ctx {RenderCtx} - the rendering context to write to
 *  @param tilemap {TileMap} - the map to sample from
 *  @param tileset {TileSet} - the tileset to use for textures
 *  @param rect {Rect} - the portion of the tileset to render
 */
export const drawTiles = (ctx, tilemap, tileset, rect) => {
    const mapping = sampleTileMap(tilemap, rect);
    const scale = {x: tileset.tileWidth, y: tileset.tileHeight};
    const sprites = mapping.map(e => ({
        sprite: tileset.tiles[e.id], 
        dest: M.mult2(e.dest, scale)
    }));

    for(const sprite of sprites) {
        draw(ctx, sprite.sprite, sprite.dest);
    }
}
