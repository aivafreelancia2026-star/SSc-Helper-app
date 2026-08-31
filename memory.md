# Textbook Digitization Workflow Memory

This document outlines the systematic, high-fidelity workflow established for digitizing class textbook pages into interactive reader components within this application. It serves as a guide for developer transitions and maintaining code quality.

---

## 📂 Project Architecture Reference

* **Interactive Page Components:** `src/components/reader/content/C<Class>-<Subject>/`
  * Example: [`c6-science-ch14-page2.tsx`](file:///C:/Users/acer/.gemini/antigravity-ide/scratch/SSc-Helper-app/src/components/reader/content/C6-science/c6-science-ch14-page2.tsx)
* **Dynamic Import Registry:** [`src/lib/reader-content-registry.tsx`](file:///C:/Users/acer/.gemini/antigravity-ide/scratch/SSc-Helper-app/src/lib/reader-content-registry.tsx)
* **Subject Config Meta:** `src/data/classes/`
  * Example: [`C6-Science.json`](file:///C:/Users/acer/.gemini/antigravity-ide/scratch/SSc-Helper-app/src/data/classes/C6-Science.json)
* **Cropped Image Assets:** `public/assets/images/C<Class>-<Subject>/`
  * Example: `/assets/images/C6-science/ch14_fig9.png`

---

## 🛠️ Step-by-Step Digitization Workflow

### 1. Extract and Crop Figures
When textbooks refer to illustrations (e.g. **Fig. 1**, **Table 2 diagrams**, etc.), extract them directly from the raw screenshot uploads using a Python script inside the scratch directory.
* **Tool used:** Python PIL (`Pillow`) library.
* **Crop coordinates:** Ratios are mapped in `(left, top, right, bottom)` format where boundaries represent positions from `0.0` to `1.0` of image dimensions.
* **Output Path:** Save cropped assets directly to `public/assets/images/C<Class>-<Subject>/ch<ChapterNum>_fig<Num>.png`.
* **Execution:** Proactively execute the script via terminal.

### 2. Update Metadata and Registry
* **Activate Chapter:** In `src/data/classes/C<Class>-<Subject>.json`, locate the chapter ID and change its `"status"` field from `"coming-soon"` to `"available"`.
* **Register Routing:** In [`reader-content-registry.tsx`](file:///C:/Users/acer/.gemini/antigravity-ide/scratch/SSc-Helper-app/src/lib/reader-content-registry.tsx), dynamically import the new page components and map them to their corresponding indexes under the class-subject-chapter namespace.

### 3. Design System & Theme Alignment
Every chapter utilizes a strict color theme based on its **Sub-Area / Domain**:
* **Biology (Emerald / Green):** For units relating to plant/animal anatomy, movements, and ecosystems. Use class styles like `text-emerald-800`, `border-emerald-100`, and `bg-emerald-50/40`.
* **Physics (Sky / Blue):** For units relating to light, circuits, measurements, and physical forces. Use class styles like `text-sky-800`, `border-sky-100`, and `bg-sky-50/40`.
* **Layout Design:** 
  * Use a responsive `grid grid-cols-1 md:grid-cols-2 gap-8 items-start` layout to splits left and right textbook columns cleanly.
  * Wrap textbook illustrations inside a styled card (`bg-white rounded-2xl border border-<theme>-100 p-4 shadow-sm`).
  * Render fact callouts using custom `<TipBox>` or a matching border-styled alert box.
  * Render questions/lists using the custom `<ExerciseList>` component.
  * Render fill-in tables using the custom `<FillInTable>` component mapped to a persistent `storageKey`.

### 4. Code Standards and Validation
* Preserve all original docstrings and comments.
* Proactively check local dev server compilations to ensure no typescript warnings or import exceptions occur.

### 5. Git Commit and Synchronization
Always commit and push files incrementally after every textbook page range chunk is finalized.
```bash
git add .
git commit -m "Implement Chapter <Num> pages <Start>-<End> with cropped assets, tables, and layouts"
git pull --rebase
git push
```
