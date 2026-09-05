import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 37 / Textbook Page 28 (356 x 485)
p28 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593169430.png")
# Fig 16: Pattern of tyre
p28.crop((80, 120, 150, 195)).save(os.path.join(out_dir, "ch2_fig16.png"))
# Fig 17: The carom board
p28.crop((50, 260, 170, 335)).save(os.path.join(out_dir, "ch2_fig17.png"))
# QR Code: 0HPC6Z
p28.crop((185, 245, 230, 290)).save(os.path.join(out_dir, "ch2_qr_act8.png"))
# Fig 18: Pulling suitcase with rollers
p28.crop((200, 270, 305, 360)).save(os.path.join(out_dir, "ch2_fig18.png"))

# Page 38 / Textbook Page 29 (350 x 482)
p29 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593176412.png")
# Fig 19: Pushing a book on pencils
p29.crop((45, 60, 160, 90)).save(os.path.join(out_dir, "ch2_fig19.png"))
# Fig 20: Rotating the lids
p29.crop((50, 265, 95, 325)).save(os.path.join(out_dir, "ch2_fig20.png"))
# QR Code: 0HY8IN
p29.crop((105, 265, 150, 315)).save(os.path.join(out_dir, "ch2_qr_act9.png"))
# Fig 21: Stirring water
p29.crop((190, 180, 245, 255)).save(os.path.join(out_dir, "ch2_fig21.png"))
# QR Code: 0N84KA
p29.crop((250, 195, 295, 245)).save(os.path.join(out_dir, "ch2_qr_act10.png"))

# Page 39 / Textbook Page 30 (367 x 493)
p30 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593183939.png")
# Fig 22: Bird and Aeroplane
p30.crop((210, 175, 290, 235)).save(os.path.join(out_dir, "ch2_fig22.png"))

# Page 40 / Textbook Page 31 (360 x 479)
p31 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593191341.png")
# QR Code: 672TJZ
p31.crop((255, 150, 305, 200)).save(os.path.join(out_dir, "ch2_qr_learning.png"))

print("Cropped figures for pages 37-41 successfully!")
