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

# media_1788754952189.png (Pg 52): Code 4 resin icon in MCQ 4
crop_and_save("media_1788754952189.png", (0.29, 0.73, 0.35, 0.77), "ch3_code4.png")

# media_1788754977337.png (Pg 54): Fig-1 objects made of metals & QR code
crop_and_save("media_1788754977337.png", (0.21, 0.675, 0.485, 0.775), "ch4_fig1.png")
crop_and_save("media_1788754977337.png", (0.528, 0.742, 0.642, 0.838), "ch4_qr_metals.png")



# media_1788754988925.png (Pg 55): Fig-2 sonority instruments
crop_and_save("media_1788754988925.png", (0.51, 0.555, 0.82, 0.66), "ch4_fig2.png")


# media_1788755000383.png (Pg 56): Fig-3 early tools
crop_and_save("media_1788755000383.png", (0.60, 0.67, 0.83, 0.79), "ch4_fig3.png")
