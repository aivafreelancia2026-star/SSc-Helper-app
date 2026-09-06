import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 27 (349 x 475)
p27 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593224615.png")
# Q2 net forces diagrams
p27.crop((65, 68, 260, 115)).save(os.path.join(out_dir, "ch1_q2_netforces.png"))
# Individual sub-diagrams for Q2 if helpful
p27.crop((70, 70, 120, 110)).save(os.path.join(out_dir, "ch1_q2_a.png"))
p27.crop((130, 75, 180, 110)).save(os.path.join(out_dir, "ch1_q2_b.png"))
p27.crop((185, 70, 220, 110)).save(os.path.join(out_dir, "ch1_q2_c.png"))
p27.crop((225, 68, 255, 115)).save(os.path.join(out_dir, "ch1_q2_d.png"))
# Q6 inclined plane diagram
p27.crop((260, 205, 295, 230)).save(os.path.join(out_dir, "ch1_q6_incline.png"))

# Page 29 (339 x 475)
p29 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593242496.png")
# QR Code: 08GHFN
p29.crop((120, 185, 162, 230)).save(os.path.join(out_dir, "ch2_qr1.png"))
# Fig 1: Pushing the book
p29.crop((50, 255, 162, 330)).save(os.path.join(out_dir, "ch2_fig1.png"))
# Fig 2: The book acquires a speed
p29.crop((175, 130, 290, 210)).save(os.path.join(out_dir, "ch2_fig2.png"))

# Page 30 (349 x 479)
p30 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593250803.png")
# Fig 3: Forces acting on the book
p30.crop((60, 60, 150, 140)).save(os.path.join(out_dir, "ch2_fig3.png"))
# QR Code: 08FDHB
p30.crop((180, 185, 222, 230)).save(os.path.join(out_dir, "ch2_qr_lab.png"))
# Fig 4: The trolley accelerating towards left
p30.crop((185, 255, 290, 335)).save(os.path.join(out_dir, "ch2_fig4.png"))

# Page 31 (340 x 476)
p31 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593271114.png")
# Fig 5: The direction of friction on the block
p31.crop((55, 260, 145, 330)).save(os.path.join(out_dir, "ch2_fig5.png"))

print("Cropped page 27-31 figures successfully!")
