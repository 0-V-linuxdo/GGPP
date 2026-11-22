/**
 * Put the GG++ composer button bar next to Gemini's model picker.
 * Hydrogen keeps that picker in the page header, so looking only inside
 * the composer leaves the usage ring disconnected. Prefer the in-composer
 * picker when present, then the header picker, then trailing actions.
 */

const MODE_BUTTON = "[data-test-id='bard-mode-menu-button']";

type QueryRoot = { querySelector: (sel: string) => Element | null };

function modeHost(root: QueryRoot | null | undefined): HTMLElement | null {
  const mode = root?.querySelector(MODE_BUTTON) as HTMLElement | null;
  if (!mode) return null;
  return (mode.closest("bard-mode-switcher") ?? mode.closest(".model-picker-container") ?? mode) as HTMLElement;
}

function searchRootOf(composer: HTMLElement, searchRoot?: QueryRoot | null): QueryRoot | null {
  if (searchRoot) return searchRoot;
  const owner = (composer as HTMLElement & { ownerDocument?: Document | null }).ownerDocument;
  if (owner) return owner;
  if (typeof document !== "undefined") return document;
  return null;
}

function alreadyHasBar(host: HTMLElement, bar: HTMLElement): boolean {
  const prev = host.previousElementSibling as HTMLElement | null;
  return !!prev && prev !== bar && !!prev.classList?.contains("ggpp-chatbar");
}

export function placeComposerChatBar(
  bar: HTMLElement,
  composer: HTMLElement,
  searchRoot?: QueryRoot | null,
): void {
  const inComposer = modeHost(composer);
  if (inComposer && composer.contains(inComposer)) {
    if (inComposer.previousElementSibling !== bar) inComposer.before(bar);
    return;
  }

  const headerHost = modeHost(searchRootOf(composer, searchRoot));
  if (headerHost && !composer.contains(headerHost)) {
    const otherComposer = headerHost.closest("input-container");
    if (!otherComposer && !alreadyHasBar(headerHost, bar)) {
      if (headerHost.previousElementSibling !== bar) headerHost.before(bar);
      return;
    }
  }

  const sendBox = composer.querySelector<HTMLElement>("[data-test-id='send-button-container']");
  const sendIcon = composer.querySelector<HTMLElement>("gem-icon-button.send-button");
  const sendBtn = sendBox?.querySelector<HTMLElement>("button") ?? sendIcon?.querySelector<HTMLElement>("button");
  const trailing =
    composer.querySelector<HTMLElement>(".trailing-actions-wrapper") ??
    composer.querySelector<HTMLElement>("[class*='trailing-actions']") ??
    sendBtn?.parentElement ??
    sendBox ??
    sendIcon ??
    null;

  if (trailing && trailing !== bar && composer.contains(trailing)) {
    if (trailing.firstElementChild !== bar) trailing.prepend(bar);
    return;
  }

  if (!bar.isConnected || !composer.contains(bar)) composer.append(bar);
}
