import os
from PIL import Image

output_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(output_dir, exist_ok=True)
upload_dir = r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded"

def crop_and_save(src_name, rel_box, out_name):
    src_path = os.path.join(upload_dir, src_name)
    im = Image.open(src_path)
    w, h = im.size
    left = int(rel_box[0] * w)
    top = int(rel_box[1] * h)
    right = int(rel_box[2] * w)
    bottom = int(rel_box[3] * h)
    cropped = im.crop((left, top, right, bottom))
    out_path = os.path.join(output_dir, out_name)
    cropped.save(out_path)
    print(f"Saved {out_name}: {cropped.size} from {src_name}")

# media_1788593224615.png (Pg 47): Fig-16 plastic in cow stomach (clean image without bottom text)
crop_and_save("media_1788593224615.png", (0.138, 0.448, 0.475, 0.585), "ch3_fig16.png")

# media_1788593250803.png (Pg 50): Fig-17 Universal recycling symbol
crop_and_save("media_1788593250803.png", (0.195, 0.292, 0.385, 0.428), "ch3_fig17.png")

# media_1788593271114.png (Pg 51): QR code 67BPLM
crop_and_save("media_1788593271114.png", (0.742, 0.672, 0.855, 0.768), "ch3_qr_learn.png")


