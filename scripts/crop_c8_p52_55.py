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

# Page 43: media_1788593169430.png
# Fig 10: bucket and chair
crop_and_save("media_1788593169430.png", (0.15, 0.565, 0.46, 0.69), "ch3_fig10.png")
# Fig 11a: linear arrangement
crop_and_save("media_1788593169430.png", (0.53, 0.245, 0.82, 0.295), "ch3_fig11a.png")
# Fig 11b: cross-linked arrangement
crop_and_save("media_1788593169430.png", (0.55, 0.295, 0.80, 0.385), "ch3_fig11b.png")
# Parkes portrait
crop_and_save("media_1788593169430.png", (0.72, 0.435, 0.845, 0.545), "ch3_parkes.png")

# Page 44: media_1788593176603.png
# Fig 12: deformed bottle
crop_and_save("media_1788593176603.png", (0.31, 0.32, 0.465, 0.525), "ch3_fig12.png")
# Fig 13: conducting flame test
crop_and_save("media_1788593176603.png", (0.505, 0.315, 0.67, 0.45), "ch3_fig13.png")

# Page 45: media_1788593183939.png
# Staudinger portrait
crop_and_save("media_1788593183939.png", (0.37, 0.665, 0.462, 0.755), "ch3_staudinger.png")

# Page 46: media_1788593191341.png
# Fig 14: Bakelite articles
crop_and_save("media_1788593191341.png", (0.145, 0.285, 0.47, 0.36), "ch3_fig14.png")
# Fig 15: Melamine articles
crop_and_save("media_1788593191341.png", (0.145, 0.575, 0.47, 0.655), "ch3_fig15.png")
# Baekeland portrait
crop_and_save("media_1788593191341.png", (0.715, 0.18, 0.842, 0.312), "ch3_baekeland.png")
