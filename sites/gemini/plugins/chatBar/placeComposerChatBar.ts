/**
 * Put the GG++ composer button bar on the message box.
 * Gemini Hydrogen keeps the model picker in the header, so the in-composer
 * mode-button host is often missing — always recover into trailing actions
 * (or the composer itself) instead of leaving the bar disconnected.
 */

export function placeComposerChatBar(bar: HTMLElement, composer: HTMLElement): void {
  const mode = composer.querySelector<HTMLElement>("[data-test-id='bard-mode-menu-button']");
  const host = mode
    ? (mode.closest("bard-mode-switcher") ?? mode.closest(".model-picker-container") ?? mode)
    : null;
  if (host && composer.contains(host)) {
    if (host.previousElementSibling !== bar) host.before(bar);
    return;
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
