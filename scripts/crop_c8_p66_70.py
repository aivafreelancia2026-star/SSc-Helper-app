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

# media_1788755087806.png (Pg 57): Fig-4 hammer & Fig-5 wire coils
crop_and_save("media_1788755087806.png", (0.148, 0.282, 0.475, 0.422), "ch4_fig4.png")
crop_and_save("media_1788755087806.png", (0.565, 0.328, 0.795, 0.49), "ch4_fig5.png")

# media_1788755101532.png (Pg 58): Fig-6 electric circuit & QR code E2YBGH
crop_and_save("media_1788755101532.png", (0.148, 0.305, 0.34, 0.43), "ch4_fig6.png")
crop_and_save("media_1788755101532.png", (0.352, 0.315, 0.468, 0.415), "ch4_qr_electric.png")

# media_1788755123339.png (Pg 59): Fig-7 heat conduction & QR code E3871B
crop_and_save("media_1788755123339.png", (0.175, 0.125, 0.425, 0.262), "ch4_fig7.png")
crop_and_save("media_1788755123339.png", (0.725, 0.442, 0.845, 0.54), "ch4_qr_chem.png")

# media_1788755134061.png (Pg 60): Fig-8 burning sulphur and litmus test
crop_and_save("media_1788755134061.png", (0.175, 0.565, 0.84, 0.735), "ch4_fig8.png")

# media_1788755145804.png (Pg 61): Fig-9 sodium solution litmus test
crop_and_save("media_1788755145804.png", (0.58, 0.67, 0.755, 0.835), "ch4_fig9.png")
