# Builds seamless floor/wall tiles in the same palette as the Finance Pixel Pack.
# Output: assets/tiles.png (128 x 96): row 0 navy carpet x4, row 1 marble floor x4, row 2 marble wall x4
import random, sys
from PIL import Image
out = sys.argv[1]
random.seed(7)
img = Image.new("RGBA", (128, 96))
P = img.load()
def hexc(h): return tuple(int(h[i:i+2], 16) for i in (1, 3, 5)) + (255,)
NAVY = [hexc(c) for c in ["#253c65", "#253c65", "#335170", "#1d3255", "#213a52"]]
MARB = [hexc(c) for c in ["#ede6de", "#ede6de", "#ebe3dc", "#e4dcd5", "#f0e7de"]]
VEIN, VEIN2, SEAM = hexc("#c2bebc"), hexc("#c3d0d3"), hexc("#d6cfc8")
for v in range(4):
    ox = v * 32
    # navy carpet: speckle noise, blocky 2px clusters
    for y in range(0, 32, 2):
        for x in range(0, 32, 2):
            c = random.choice(NAVY)
            for dy in (0, 1):
                for dx in (0, 1):
                    P[ox + x + dx, y + dy] = c if random.random() > 0.15 else random.choice(NAVY)
    # marble floor: base + one diagonal vein + slab seam on right/bottom edge
    for y in range(32):
        for x in range(32):
            P[ox + x, 32 + y] = random.choice(MARB) if random.random() < 0.25 else MARB[0]
    x, y = random.randint(0, 31), 32
    dx = random.choice([-1, 1])
    while y < 64:
        P[ox + (x % 32), y] = VEIN if random.random() > 0.2 else VEIN2
        if random.random() < 0.55: x += dx
        if random.random() < 0.15: dx = -dx
        y += 1
    for i in range(32):
        P[ox + 31, 32 + i] = SEAM; P[ox + i, 63] = SEAM
    # marble wall: lighter base with horizontal panel line and soft vein
    for y in range(32):
        for x in range(32):
            P[ox + x, 64 + y] = hexc("#f1e8df") if random.random() > 0.2 else random.choice(MARB)
    x = random.randint(0, 31)
    for yy in range(4, 30):
        if random.random() < 0.6: x += random.choice([-1, 0, 1])
        P[ox + (x % 32), 64 + yy] = VEIN
    for i in range(32):
        P[ox + i, 64 + 15] = hexc("#e4dcd5"); P[ox + 31, 64 + i] = hexc("#e4dcd5")
    # navy wainscot on the lower half so the wall reads clearly against the floor
    for yy in range(19, 32):
        for xx in range(32):
            P[ox + xx, 64 + yy] = random.choice(NAVY[:3]) if yy > 20 else hexc("#c2bebc")
    for yy in range(21, 32): P[ox + 15, 64 + yy] = hexc("#1d3255"); P[ox + 31, 64 + yy] = hexc("#1d3255")
img.save(out)
print("ok")
