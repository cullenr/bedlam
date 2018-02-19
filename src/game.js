import { draw } from '/src/renderer.js';
import { map as mapdata } from '/data/map-a.js';
import {
    RenderCtx,
    Point,
    TileSet, 
    TileMap
} from '/src/types.js';

const canvas    = document.getElementById('stage'),
      context   = canvas.getContext('2d'),
      image     = document.getElementById('tm4');

ctx.imageSmoothingEnabled = false;

// TODO : put this stuff into the map data file itself, if we do that kind of 
// thing it may be easier to implement callbacks for scripted events and stuff 
// in the map?
//
// TODO swap passing images around for somthing else. OpenGL we will be using
// TextureIDs and we should be thinking of sprites as the numerical offset into 
// a tilesheet.
const ctx       = new RenderCtx(context, new Point(32, 32));
const tileset   = new TileSet(image, 32, 32);
const tilemap   = new TileMap(mapdata, 16, 16, [tileset]);
const hero      = tileset.tiles[781];

export default {
    tick(delta) {
        draw(ctx, hero, {x:64, y:64});
        draw(ctx, hero, {x:128, y:128, w:64, h:64});
        draw(ctx, hero, {x:256, y:256, w:128, h:128});
        draw(ctx, hero, {x:-64, y:512, w:128, h:128});
    }
}
