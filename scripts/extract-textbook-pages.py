#!/usr/bin/env python3
"""Extract selected textbook PDF pages into local PNG reference images.

This is an internal content-building helper. Output defaults to the untracked
"Textbook imgs local" folder beside the repo, so generated textbook images do
not get committed.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF is required. Install with: python -m pip install pymupdf", file=sys.stderr)
    raise SystemExit(1)


REPO_ROOT = Path(__file__).resolve().parents[1]
WORKSPACE_ROOT = REPO_ROOT.parent
DEFAULT_BOOK_ROOT = WORKSPACE_ROOT / "TEXT BOOKS"
DEFAULT_OUTPUT_DIR = WORKSPACE_ROOT / "Textbook imgs local"


def parse_pages(value: str) -> list[int]:
    pages: set[int] = set()

    for raw_part in value.split(","):
        part = raw_part.strip()
        if not part:
            continue

        match = re.fullmatch(r"(\d+)(?:-(\d+))?", part)
        if not match:
            raise argparse.ArgumentTypeError(
                f"Invalid page segment {part!r}. Use forms like 11, 11-18, or 10,167-168."
            )

        start = int(match.group(1))
        end = int(match.group(2) or start)
        if start < 1 or end < 1:
            raise argparse.ArgumentTypeError("Pages are 1-based and must be positive.")
        if end < start:
            raise argparse.ArgumentTypeError(f"Invalid descending page range {part!r}.")

        pages.update(range(start, end + 1))

    if not pages:
        raise argparse.ArgumentTypeError("At least one page is required.")

    return sorted(pages)


def default_pdf_path(class_grade: int, subject: str) -> Path:
    return DEFAULT_BOOK_ROOT / str(class_grade) / f"{subject}.pdf"


def render_pages(
    pdf_path: Path,
    output_dir: Path,
    class_grade: int,
    subject: str,
    pages: list[int],
    zoom: float,
    overwrite: bool,
) -> tuple[list[Path], list[Path]]:
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    output_dir.mkdir(parents=True, exist_ok=True)
    created: list[Path] = []
    skipped: list[Path] = []

    with fitz.open(pdf_path) as doc:
        page_count = doc.page_count
        invalid = [page for page in pages if page > page_count]
        if invalid:
            raise ValueError(
                f"Requested page(s) beyond PDF length {page_count}: "
                + ", ".join(str(page) for page in invalid)
            )

        matrix = fitz.Matrix(zoom, zoom)
        for page_number in pages:
            output_path = output_dir / f"C{class_grade}-{subject}-P{page_number}.png"
            if output_path.exists() and not overwrite:
                skipped.append(output_path)
                continue

            page = doc.load_page(page_number - 1)
            pixmap = page.get_pixmap(matrix=matrix, alpha=False)
            pixmap.save(output_path)
            created.append(output_path)

    return created, skipped


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Extract selected textbook PDF pages to local PNG images."
    )
    parser.add_argument("--class", dest="class_grade", type=int, default=6)
    parser.add_argument("--subject", default="Telugu")
    parser.add_argument(
        "--pages",
        required=True,
        type=parse_pages,
        help="1-based pages or ranges, e.g. 11-18 or 10,167,168.",
    )
    parser.add_argument(
        "--pdf",
        type=Path,
        help="Optional PDF path. Defaults to ../TEXT BOOKS/<class>/<subject>.pdf.",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help='Output folder. Defaults to "../Textbook imgs local".',
    )
    parser.add_argument(
        "--zoom",
        type=float,
        default=2.0,
        help="Render scale. 2.0 is usually readable without huge files.",
    )
    parser.add_argument("--overwrite", action="store_true", help="Replace existing PNG files.")
    args = parser.parse_args()

    pdf_path = (args.pdf or default_pdf_path(args.class_grade, args.subject)).resolve()
    output_dir = args.out.resolve()

    created, skipped = render_pages(
        pdf_path=pdf_path,
        output_dir=output_dir,
        class_grade=args.class_grade,
        subject=args.subject,
        pages=args.pages,
        zoom=args.zoom,
        overwrite=args.overwrite,
    )

    print(f"PDF: {pdf_path}")
    print(f"Output: {output_dir}")
    print(f"Created: {len(created)}")
    for path in created:
        print(f"  + {path.name}")

    if skipped:
        print(f"Skipped existing: {len(skipped)}")
        for path in skipped:
            print(f"  = {path.name}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
