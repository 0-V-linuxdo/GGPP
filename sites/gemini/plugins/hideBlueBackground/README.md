# HideBlueBackground

Hides two site-owned blue decorative paints with scoped CSS (no node mutation):

```css
modular-zero-state .blur-bg { display: none !important; }
chat-window.show-lm-background > div.lm-glow::before { background-image: none !important; }
```

## Blue sources (field)

| Layer | Selector | Evidence |
|-------|----------|----------|
| Home zero-state wash | `modular-zero-state .blur-bg` | Public synthetic structural fixture in `test/fixtures/zero-state.synthetic.json`; not live-page evidence |
| Chat blue halo | `chat-window.show-lm-background > div.lm-glow::before` | A scoped live-page declaration check identified `background: radial-gradient(ellipse 42% 100% at 66% 81%, var(--lm-glow-body-base) …)`; ON→OFF halo gone→restore ON |

- **Not touched:** host `div.lm-glow` layout, `::after`, textarea / input chrome, voice controls.
- **Selector notes:** uses stable classes + direct child; no `_ngcontent` / dynamic Angular attrs.
- **Disable:** plugin stop removes the injected `<style>` via `ctx.css` cleanup.
- **Validation scope:** a controlled live-page check linked the site `::before` background shorthand to the blue halo. The integrated plugin then passed an ON→OFF→ON visual check on one task page: halo hidden→visible→hidden. Unit tests use synthetic structure and mocked CSS cleanup; they are not live DOM evidence and do not establish coverage of every page or future site layout.
