# Removes 1px bleed lines at cell edges (pixels from the neighbouring cell) and
# bottom-aligns characters so every animal stands on the same floor line.
import sys
from PIL import Image
def clean(path, align_bottom=False):
    im = Image.open(path).convert("RGBA"); px = im.load()
    for cy in range(im.size[1] // 32):
        for cx in range(im.size[0] // 32):
            x0, y0 = cx * 32, cy * 32
            filled = lambda y: any(px[x0 + x, y0 + y][3] for x in range(32))
            if filled(0) and not filled(1):
                for x in range(32): px[x0 + x, y0] = (0, 0, 0, 0)
            if filled(31) and not filled(30):
                for x in range(32): px[x0 + x, y0 + 31] = (0, 0, 0, 0)
            if align_bottom:
                rows = [y for y in range(32) if filled(y)]
                if rows and rows[-1] < 31:
                    d = 31 - rows[-1]
                    cell = im.crop((x0, y0, x0 + 32, y0 + 32))
                    blank = Image.new("RGBA", (32, 32))
                    blank.paste(cell, (0, d)); im.paste(blank, (x0, y0))
                    px = im.load()
    im.save(path)
for p in sys.argv[1:]:
    clean(p, align_bottom=p.endswith("characters-sheet.png"))
print("cleaned")
