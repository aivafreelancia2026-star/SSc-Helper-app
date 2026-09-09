# SSC Helper - Class 6 Hindi Reader Implementation Memory

This document captures the current state, design patterns, and next steps for the SSC Helper App, specifically for the Class 6 Hindi textbook integration. Use this memory to resume work seamlessly.

## 1. Project State
- **Completed Chapters:** Chapters 1 through 16 are fully implemented and integrated.
- **Latest Page Completed:** Page 83 (App routing `page=83`, which corresponds to Printed Page 74: "सीखने की प्रतिफल"). The textbook is now fully complete (Total Pages updated from 150 to 83).
- **Recent Additions:**
  - Chapter 13: `शब्दकोश` (Pages 75–77, Printed 66–68)
  - Chapter 14: `अभ्यास तालिका` (Pages 78–79, Printed 69–70)
  - Chapter 15: `व्यक्तिगत शारीरिक सुरक्षा नियम` (Pages 80–81, Printed 71–72)
  - Chapter 16: `सीखने के प्रतिफल एवं सूचनाएँ` (Pages 82–83, Printed 73–74)
- **Next Step:** Move on to the next unit/grade integration since Class 6 Hindi is complete.

## 2. Project State (Class 8 Telugu)
- **Completed Pages:** 
  - Page 10 (Index / విషయసూచిక)
  - Page 11 (Chapter 1 / త్యాగనిరతి) - Fully implemented with interactive question textareas.
  - Page 12 (Lesson details & author) - Implemented with exact portrait.
  - Page 13 (Chapter 1, page 3) - Standard block layout.
  - Page 14 (Chapter 1, page 4) - Implemented with interactive questions and eagle illustration.
  - Page 15 (Chapter 1, page 5) - "తాత్పర్యాలు" section implemented with clean text layout.
  - Page 16 (Chapter 1, page 6) - "ఇవి చేయండి" section implemented with interactive MCQs and text inputs.
  - Page 17 (Chapter 1, page 7) - "స్వీయరచన", "సృజనాత్మకత", and "పదజాల వినియోగం" sections with interactive textareas and blanks.
  - Page 18 (Chapter 1, page 8) - Grammar exercises, project work box, self-assessment checklist, and quote.
  - Page 19 (Chapter 2, page 1 / సముద్ర ప్రయాణం) - Fully implemented with chapter header, intro, and interactive question textareas.
  - Page 20 (Chapter 2, page 2) - Lesson details, author intro with portrait, and student instructions.
  - Page 21 (Chapter 2, page 3) - Introduction section and beautifully cropped ship illustration with text layout.
  - Page 22 (Chapter 2, page 4) - Two-column responsive layout with "ఆలోచించండి-చెప్పండి" interactive questions.
  - Page 23 (Chapter 2, page 5) - Mirrored two-column layout with "ఆలోచించండి-చెప్పండి" interactive questions.
  - Page 24 (Chapter 2, page 6) - Responsive two-column layout with right-aligned "ఆలోచించండి-చెప్పండి" box.
  - Page 25 (Chapter 2, page 7) - Customs check illustration, continuous text, and centered "ఆలోచించండి-చెప్పండి" box.
  - Page 26 (Chapter 2, page 8) - Interactive exercise page ("ఇవి చేయండి") with textareas and a table input grid.
  - Page 27 (Chapter 2, page 9) - Sections III, IV, and V with self-writing, creative essay textareas, and interactive vocabulary MCQ inputs.
  - Page 28 (Chapter 2, page 10) - Section VI grammar exercises with complex interactive multi-input sandhi splitting and samasam naming.
  - Page 29 (Chapter 2, page 11) - Grammar exercises explaining 'అత్వసంధి' and 'బహుళం' with two-column interactive inputs.
  - Page 30 (Chapter 2, page 12) - End of chapter activities including a project work textarea, an interactive self-assessment checklist ("నేనివి చేయగలనా?"), and informational boxes.
  - Page 31 (Chapter 3, page 1) - Introduction to "బండారి బసవన్న", featuring a chapter header, reading sections, and interactive questions.
  - Page 32 (Chapter 3, page 2) - Informational page with lesson details, poet introduction (with cropped portrait), and student instructions.
  - Page 33 (Chapter 3, page 3) - First part of the poem featuring a large illustration of the king and interactive "ఆలోచించండి-చెప్పండి" questions.
  - Page 34 (Chapter 3, page 4) - Second part of the poem featuring an illustration of Shiva and animals, and interactive "ఆలోచించండి-చెప్పండి" questions.
  - Page 35 (Chapter 3, page 5) - Summary of the story and comprehensive interactive exercises with text inputs and textareas.
  - Page 36 (Chapter 3, page 6) - Extensive interactive workbook page featuring poem fill-in-the-blanks, self-writing textareas, creative writing exercises, and vocabulary inputs.
  - Page 37 (Chapter 3, page 7) - Interactive language grammar exercises including matching, a detailed table for Sandhi, and fill-in-the-blanks for Gunasandhi.
  - Page 38 (Chapter 3, page 8) - Continuation of Gunasandhi rules, project work textarea, self-assessment checklist, and a quote.
- **Book Metadata:** `C8-Telugu.json` structure set up with 162 total pages, chapters 1-12, Upavachakam, and Padavignanam.

## 3. Core Architecture & Routing
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
