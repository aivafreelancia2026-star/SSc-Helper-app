import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 47 / Textbook Page 38 (360 x 495)
p38 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592932880.png")
# Fig 5: Iron stand with thread
p38.crop((120, 65, 175, 135)).save(os.path.join(out_dir, "ch3_fig5.png"))

# Page 48 / Textbook Page 39 (346 x 474)
p39 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592944156.png")
# Fig 6: Articles made from rayon
p39.crop((50, 170, 165, 230)).save(os.path.join(out_dir, "ch3_fig6.png"))
# Fig 7: Labels showing different percentages of blend
p39.crop((185, 235, 285, 315)).save(os.path.join(out_dir, "ch3_fig7.png"))

# Page 50 / Textbook Page 41 (362 x 495)
p41 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592962122.png")
# Fig 8: Laundry label codes
p41.crop((55, 335, 170, 395)).save(os.path.join(out_dir, "ch3_fig8.png"))

# Page 51 / Textbook Page 42 (353 x 500)
p42 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592982320.png")
# Fig 9: Resin identification codes
p42.crop((70, 260, 145, 305)).save(os.path.join(out_dir, "ch3_fig9.png"))
# QR Code: E2FJ08
p42.crop((180, 350, 225, 395)).save(os.path.join(out_dir, "ch3_qr_plastics.png"))

print("Cropped figures for Chapter 3 pages 38-42 successfully!")
