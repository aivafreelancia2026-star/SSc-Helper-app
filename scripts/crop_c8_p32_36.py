import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 32 / Textbook Page 23 (371 x 495)
p23 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593086938.png")
# QR Code 08P9IY
p23.crop((120, 205, 168, 255)).save(os.path.join(out_dir, "ch2_qr_act2.png"))
# Fig 6: Pushing heavy box with small force
p23.crop((45, 275, 175, 345)).save(os.path.join(out_dir, "ch2_fig6.png"))
# Fig 7: Pushing heavy box with increasing force
p23.crop((185, 70, 315, 135)).save(os.path.join(out_dir, "ch2_fig7.png"))
# Fig 8: The heavy box starts moving
p23.crop((185, 205, 315, 268)).save(os.path.join(out_dir, "ch2_fig8.png"))

# Page 33 / Textbook Page 24 (358 x 509)
p24 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593099721.png")
# QR Code 08Y5KL
p24.crop((85, 100, 130, 150)).save(os.path.join(out_dir, "ch2_qr_act3.png"))
# Fig 9: Motion of a Ball on an inclined plane
p24.crop((45, 170, 175, 215)).save(os.path.join(out_dir, "ch2_fig9.png"))

# Page 34 / Textbook Page 25 (344 x 482)
p25 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593107647.png")
# Fig 10: Pulling a brick with spring balance
p25.crop((50, 105, 170, 140)).save(os.path.join(out_dir, "ch2_fig10.png"))
# Fig 11: Horizontal forces on the brick
p25.crop((55, 345, 165, 395)).save(os.path.join(out_dir, "ch2_fig11.png"))
# Fig 12: Pulling same brick with another orientation
p25.crop((180, 190, 295, 240)).save(os.path.join(out_dir, "ch2_fig12.png"))

# Page 35 / Textbook Page 26 (344 x 474)
p26 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593124237.png")
# QR Code 08HSQP
p26.crop((180, 360, 222, 405)).save(os.path.join(out_dir, "ch2_qr_act6.png"))
# Fig 13: Rubbing the hands
p26.crop((230, 360, 290, 410)).save(os.path.join(out_dir, "ch2_fig13.png"))

# Page 36 / Textbook Page 27 (347 x 484)
p27 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788593132756.png")
# Fig 14: Striking a matchstick against the surface of matchbox
p27.crop((50, 65, 155, 150)).save(os.path.join(out_dir, "ch2_fig14.png"))
# QR Code 08FGFC
p27.crop((250, 75, 290, 120)).save(os.path.join(out_dir, "ch2_qr_act7.png"))
# Fig 15: Bottom of the shoe
p27.crop((215, 300, 255, 375)).save(os.path.join(out_dir, "ch2_fig15.png"))

print("Cropped figures for pages 32-36 successfully!")
