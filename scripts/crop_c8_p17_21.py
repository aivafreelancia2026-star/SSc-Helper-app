import os
from PIL import Image

out_dir = r"c:\Users\acer\.gemini\antigravity-ide\scratch\SSc-Helper-app\public\assets\images\C8-Science"
os.makedirs(out_dir, exist_ok=True)

# Page 17 (351 x 476)
p17 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592431175.png")
# Fig-6: Tray inclined plane
p17.crop((55, 140, 168, 222)).save(os.path.join(out_dir, "ch1_fig6.png"))
# Fig-7: Slipping person
p17.crop((195, 85, 285, 180)).save(os.path.join(out_dir, "ch1_fig7.png"))

# Page 18 (347 x 488)
p18 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592441437.png")
# Fig-8: Book on table with Fg and Fn
p18.crop((55, 75, 172, 165)).save(os.path.join(out_dir, "ch1_fig8.png"))
# Fig-9: Wooden block on string
p18.crop((240, 105, 290, 190)).save(os.path.join(out_dir, "ch1_fig9.png"))
# Fig-10: Tension T and Weight W
p18.crop((260, 305, 305, 410)).save(os.path.join(out_dir, "ch1_fig10.png"))

# Page 19 (370 x 490)
p19 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592453028.png")
# Fig-11: Spring balance
p19.crop((125, 170, 185, 280)).save(os.path.join(out_dir, "ch1_fig11.png"))
# Blocks A and B diagram
p19.crop((290, 175, 320, 205)).save(os.path.join(out_dir, "ch1_fig_blocks.png"))

# Page 20 (347 x 491)
p20 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592463952.png")
# Fig-12(a): Single boy pushing table
p20.crop((65, 330, 172, 420)).save(os.path.join(out_dir, "ch1_fig12a.png"))
# Fig-12(b): Two boys pushing same direction
p20.crop((185, 105, 300, 180)).save(os.path.join(out_dir, "ch1_fig12b.png"))
# Fig-12(c): Two boys pushing opposite directions
p20.crop((185, 305, 300, 380)).save(os.path.join(out_dir, "ch1_fig12c.png"))

# Page 21 (348 x 489)
p21 = Image.open(r"C:\Users\acer\.gemini\antigravity-ide\brain\acc4cad2-0b9d-4cdb-8768-fd0427c9ea87\.user_uploaded\media_1788592474394.png")
# Fig-13: F1 and F2 arrows
p21.crop((65, 175, 160, 212)).save(os.path.join(out_dir, "ch1_fig13.png"))
# Fig-14: Stretching rubber bands
p21.crop((182, 150, 300, 208)).save(os.path.join(out_dir, "ch1_fig14.png"))

print("Cropped page 17-21 figures successfully!")
