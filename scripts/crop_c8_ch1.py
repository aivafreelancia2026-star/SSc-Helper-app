import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 11 (Table 1)
img = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788591108716.png")

# Table 1: Diagram column is approximately x=170 to 220
# Row 1: Digging bore well
img.crop((168, 93, 218, 131)).save(os.path.join(out_dir, "ch1_table1_1.png"))

# Row 2: Sipping Juice with a straw
img.crop((172, 133, 215, 171)).save(os.path.join(out_dir, "ch1_table1_2.png"))

# Row 3: Erasing letters on blackboard
img.crop((168, 173, 218, 211)).save(os.path.join(out_dir, "ch1_table1_3.png"))

# Row 4: A magnet attracting nails
img.crop((168, 215, 218, 250)).save(os.path.join(out_dir, "ch1_table1_4.png"))

# Row 5: Fruits falling from tree
img.crop((168, 252, 218, 290)).save(os.path.join(out_dir, "ch1_table1_5.png"))

# Row 6: Hoisting a flag
img.crop((168, 292, 218, 330)).save(os.path.join(out_dir, "ch1_table1_6.png"))

# Page 10 (Page 1) - QR Code
img_p10 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788591099302.png")
img_p10.crop((250, 77, 296, 126)).save(os.path.join(out_dir, "ch1_qr.png"))

print("Refined crops saved!")
