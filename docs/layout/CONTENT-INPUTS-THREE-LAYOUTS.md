# Starter content inputs: Reading Atlas, Radio Letter, Trust Path

These inputs extend **existing** `StarterPlan v1` and travel into the standalone project's `site.config.json`. They do not create a CMS, booking engine, upload server or new app backend.

## Reading Atlas (reading-atlas)

Provide only real reading records. Month is `01`–`12`. Do not invent read dates, pages or books. The month buttons filter **the rendered records**; if none are supplied, twelve clearly marked empty examples remain visible.

```json
"reading": {
  "records": [
    {"month":"07","title":"（請填入實際閱讀的書名）","note":"（自己真實的閱讀評註）"}
  ],
  "annualBook": {"title":"（自己實際選出的年度書名）","note":"（具體選入原因）"}
}
```

When scripts are unavailable, all records are readable. Buttons use `aria-pressed` and a live filter status. There is no claim of genuine books unless supplied by the owner.

## Radio Letter (radio-letter)

A real audio source and transcript are **optional** and separate. Only show native `<audio controls>` when an owner-provided local path exists. The exporter validates and **copies** `public/audio/` assets found beside the source Site Brief; it fails closed for missing files. Unsupported third-party streaming URLs are not silently accepted.

```json
"media": {
  "episodeAudioPath": "/audio/my-first-episode.mp3",
  "episodeTranscript": [
    {"time":"00:00", "text":"（請填入真實且有權發布的逐字稿）"}
  ]
}
```

Audio does not automatically generate speech, captions, or a transcript; timestamps must be provided by the owner. When none is provided, the page clearly says playback is not configured.

## Trust Path (trust-path)

Five navigable anchors lead through **Scope / Method / Fees / First visit / When not a fit**. The route is decorative SVG with real anchor links, which remain functional on mobile or when CSS/JS is disabled.

```json
"serviceFacts": {
  "duration": "（核實後填入）",
  "price": "（核實後填入）",
  "cancellation": "（核實後填入）",
  "qualification": "（具體可查證資格）",
  "contact": "（實際公開的非敏感聯絡方式）"
}
```

Avoid fictitious licenses, medical claims, safety assurances, crisis phone numbers, availability, bookings or testimonials. All missing fields remain **待站長填寫** / **待提供可查證資料**.

## Acceptance

- Build all three independently, check page output and links.
- Test reading filter with keyboard and JS-disabled fallback at 390/768/1280/1440.
- Test podcast with and without an actual licensed file; verify source response/type and transcript quality.
- Inspect SVG route, anchor target focus and CJK wrapping at all four sizes.
- Compare exported sites with actual original prototypes. The Gallery thumbnails represent the prototype, **not** approved student exports.
- Until these checks are signed off, retain **Assembly in Progress**, not `Starter Ready`.
