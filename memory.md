# SSC Helper - Class 6 Hindi Reader Implementation Memory

This document captures the current state, design patterns, and next steps for the SSC Helper App, specifically for the Class 6 Hindi textbook integration. Use this memory to resume work seamlessly.

## 1. Project State
- **Completed Chapters:** Chapters 1 through 16 are fully implemented and integrated.
- **Latest Page Completed:** Page 83 (App routing `page=83`, which corresponds to Printed Page 74: "सीखने की प्रतिफल").
- **Recent Additions:**
  - Chapter 13: `शब्दकोश` (Pages 75–77, Printed 66–68)
  - Chapter 14: `अभ्यास तालिका` (Pages 78–79, Printed 69–70)
  - Chapter 15: `व्यक्तिगत शारीरिक सुरक्षा नियम` (Pages 80–81, Printed 71–72)
  - Chapter 16: `सीखने के प्रतिफल एवं सूचनाएँ` (Pages 82–83, Printed 73–74)
- **Next Step:** Textbook completion or next unit/grade integration.

## 2. Core Architecture & Routing
- **Data Source:** `src/data/classes/C6-Hindi.json`. When starting a new chapter, ensure `status` is set to `"available"` and update `pageEnd` accordingly as pages are added.
- **Component Location:** Individual page components are stored in `src/components/reader/content/` following the naming convention `c6-hindi-ch[X]-page[Y].tsx`.
- **Registry:** All new page components MUST be dynamically imported and registered in `src/lib/reader-content-registry.tsx`. Map the app's relative page number (1, 2, 3...) under the correct chapter key (e.g., `"6-Hindi-ch13"`).

## 3. Established Design Patterns (Crucial!)
To maintain the premium, highly interactive feel of the workbook, strictly adhere to these two layout patterns based on the page type:

### Pattern A: "Full Page Overlay" (For Story & Illustration Pages)
When the user provides a scan of a textbook page that is dominated by a large illustration or a beautiful scene:
1. Copy the user's uploaded image to `public/original_page_[XX].png`.
2. Set this image as the absolute background of the main content container using Next.js `<Image fill className="object-contain" />`. **Do not use object-cover** as it crops the artwork.
3. Place the Hindi text in floating, translucent frosted-glass boxes (`bg-white/95 backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,1)] border border-white/50`).
4. This ensures the original printed artwork is 100% visible while making the text perfectly crisp, selectable, and readable.

### Pattern B: "Interactive Workbook" (For Exercise & Q&A Pages)
When the page contains questions, matching, or fill-in-the-blanks:
1. Recreate the layout entirely using clean HTML/CSS grids and flexboxes.
2. Use React `useState` to make all blanks, textareas, and checkboxes fully interactive so students can type their answers directly into the app.
3. Use dotted bottom borders for text inputs (`border-b-2 border-slate-300 border-dotted bg-transparent`).
4. Replace blurry printed clip-art with sharp, high-quality emojis (e.g., 🏏, 👦, 📖, 🤔) to make the UI look modern and responsive across all devices.
5. For multiple-choice or table evaluation (like "हाँ / नहीं"), build custom interactive click targets.

## 4. Typography
- Always enforce the Hindi font on all text nodes and inputs using inline styles or Tailwind classes: `style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}`.

## 5. Troubleshooting Context
- **"Page Not Found" Errors:** If a newly created page returns a 404/Coming Soon, it means either:
  1. `C6-Hindi.json` doesn't have the correct `pageEnd` value for the chapter.
  2. The component was not successfully saved/registered in `reader-content-registry.tsx`.
- Always double-check that the `replace_file_content` edits to the registry do not fail silently.
