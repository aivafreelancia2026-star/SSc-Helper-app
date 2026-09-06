import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 12 (p12: 352 x 482)
p12 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592233310.png")
# QR Code
p12.crop((130, 128, 173, 175)).save(os.path.join(out_dir, "ch1_qr2.png"))
# Fig 1(a): Pressing tube to come out of toothpaste
p12.crop((65, 198, 115, 243)).save(os.path.join(out_dir, "ch1_fig1a.png"))
# Fig 1(b): Needle of compass due to bar magnet
p12.crop((116, 198, 166, 243)).save(os.path.join(out_dir, "ch1_fig1b.png"))

# Page 13 (p13: 350 x 474)
p13 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592245916.png")
# Fig 2: Floating needle magnets in water bowl
p13.crop((70, 95, 145, 155)).save(os.path.join(out_dir, "ch1_fig2.png"))
# Fig 3: Charged balloon attracting bits of paper
p13.crop((183, 98, 296, 170)).save(os.path.join(out_dir, "ch1_fig3.png"))

# Page 14 (p14: 342 x 472)
p14 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592256070.png")
# Fig 4: Magnetic field lines with iron filings
p14.crop((180, 272, 295, 330)).save(os.path.join(out_dir, "ch1_fig4.png"))

# Page 15 (p15: 341 x 471)
p15 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592268336.png")
# Fig 5: Bullock cart (Muscular force)
p15.crop((179, 88, 293, 174)).save(os.path.join(out_dir, "ch1_fig5.png"))

print("Cropped page 12-16 figures successfully!")
