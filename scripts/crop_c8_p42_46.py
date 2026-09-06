import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 43 / Textbook Page 34 (345 x 491)
p34 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592875995.png")
# Fig 1: Clothes from Natural Resources
p34.crop((50, 255, 295, 310)).save(os.path.join(out_dir, "ch3_fig1.png"))

# Page 44 / Textbook Page 35 (357 x 494)
p35 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592886026.png")
# Fig 2(a): bead necklace
p35.crop((65, 190, 100, 245)).save(os.path.join(out_dir, "ch3_fig2a.png"))
# Fig 2(b): single paper clip
p35.crop((60, 250, 105, 285)).save(os.path.join(out_dir, "ch3_fig2b.png"))
# Fig 2(c): paper clips chain
p35.crop((115, 240, 160, 285)).save(os.path.join(out_dir, "ch3_fig2c.png"))
# QR Code: DNGZLX
p35.crop((115, 185, 162, 235)).save(os.path.join(out_dir, "ch3_qr_poly.png"))

# Page 46 / Textbook Page 37 (360 x 495)
p37 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592904515.png")
# Fig 3: Articles made of nylon
p37.crop((45, 205, 165, 315)).save(os.path.join(out_dir, "ch3_fig3.png"))
# Fig 4: Use of Nylon Fibres (Parachute & Climber)
p37.crop((180, 60, 300, 120)).save(os.path.join(out_dir, "ch3_fig4.png"))

print("Cropped figures for Chapter 3 pages 34-37 successfully!")
