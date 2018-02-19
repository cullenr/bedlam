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
const sampleTileMap = (tilemap, rect) => new Array(rect.area)
    .fill()
    .map((e, i) => {
        cop
        const x = i % tilemap.w + rect.x;
        const y = i / tilemap.w + rect.y;
        // id comprises of seperately truncated dimensions to avoid the
        // following: 
        // x: 0.9 + y : 0.9 = 1 instead of 0
        const xy = Math.truc(x) + Math.trunc(y) * tilemap.w;

        const id = xy >= 0 && xy < tilemap.length 
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
 *  @param ctx {CanvasRenderingContext2D}
 *  @param sprite {Clip}
 *  @param dest {Rect|Point}
 */
export const draw = (ctx, sprite, dest) => {
    return ctx.drawImage(sprite.image, 
            sprite.rect.x, sprite.rect.y, sprite.rect.w, sprite.rect.h, 
            dest.x, dest.y, dest.w || sprite.rect.w, dest.h || sprite.rect.h); 
}
/**
 * Render a portion of a tilemap into a rendering context.
 *
 *  @param ctx {CanvasRenderingContext2D} - the rendering context to write to
 *  @param tilemap {TileMap} - the map to sample from
 *  @param tileset {TileSet} - the tileset to use for textures
 *  @param rect {Rect} - the portion of the tileset to render
 */
export function drawTiles(ctx, tilemap, tileset, rect) {
    const mapping = sampleTileMap(tilemap, rect);
    const sprites = mapping.map(e => {sprite: tileset[e.id], dest: e.dest);
    const scale = {x: tileset.tileWidth, y: tileset.tileHeight};

    for(const sprite of sprites) {
        draw(ctx, sprite.sprite, sprite.dest);
    }
}
