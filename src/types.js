export class Point {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

export class Rect extends Point {
    constructor(x, y, w, h) {
        super(x, y);
        this.w = w || 0;
        this.h = h || 0;
    }
}

export class Sprite {
    constructor(image, x, y, w, h) {
        this.rect = new Rect(x, y, w, h);
        this.image = image;
    }
}

export class TileSet {
    constructor(image, tileWidth, tileHeight) {
        if(image.width % tileWidth !== 0) {
            console.warn(`WARN: ${image.src} width ${image.width} does not ` + 
                         `divide by tile-width ${tileWidth} `);
        }
        if(image.height % tileHeight !== 0) {
            console.warn(`WARN: ${image.src} height ${image.height} does not ` + 
                         `divide by tile-height ${tileHeight} `);
        }

        this.image = image;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        const tilesAcross = parseInt(image.width / tileWidth);
        const tilesDown = parseInt(image.height / tileHeight);

        this.size = tilesAcross * tilesDown;

        this.tiles = new Array(this.size)
            .fill()
            .map((e, i) => {
                const x = i % tilesAcross * tileWidth;  
                const y = Math.floor(i / tilesAcross) * tileHeight;  
                const s = new Sprite(image, x, y, tileWidth, tileHeight);

                return s;
            });
    }
};

export class TileMap extends Array {
    constructor(w, map) {
        super(...map);
        this.w = w;
    }
}

/**
 *  Wrapper for the rendering context that accomodates world to pixel scale.
 *
 *  @param ctx {CanvasRenderingContext2D} - the browser rendering context
 *  @param scale {Point} - the pixel part of the pixel:world ratio. Set this to
 *  your base tile size if in doubt (e.g. 32x32)
 */
export class RenderCtx {
    constructor(ctx, scale) {
        this.ctx = ctx;
        this.scale = scale;
    }
}

