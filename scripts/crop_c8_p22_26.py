import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 22 (351 x 495)
p22 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593014647.png")
# Fig-15: Car FBD + coordinate system
p22.crop((55, 235, 180, 298)).save(os.path.join(out_dir, "ch1_fig15.png"))
# Fig-16(a) & 16(b): Football kicks
p22.crop((195, 305, 305, 395)).save(os.path.join(out_dir, "ch1_fig16.png"))

# Page 23 (351 x 494)
p23 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593024693.png")
# Fig-17: Carrom board
p23.crop((215, 65, 285, 140)).save(os.path.join(out_dir, "ch1_fig17.png"))
# QR Code: 07HLE1
p23.crop((190, 335, 235, 385)).save(os.path.join(out_dir, "ch1_qr3.png"))

# Page 24 (353 x 481)
p24 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593037270.png")
# Fig-18: Pen into palm
p24.crop((185, 60, 300, 130)).save(os.path.join(out_dir, "ch1_fig18.png"))

# Page 25 (357 x 492)
p25 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593045277.png")
# Fig-19: Bricks in lime powder trays
p25.crop((55, 125, 175, 205)).save(os.path.join(out_dir, "ch1_fig19.png"))

# Page 26 (353 x 487)
p26 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593062267.png")
# QR Code: G6SKIC
p26.crop((260, 300, 305, 350)).save(os.path.join(out_dir, "ch1_qr4.png"))

print("Cropped page 22-26 figures successfully!")
