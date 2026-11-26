/**
 * Put the GG++ settings launcher immediately left of Gemini's sidenav gear
 * (the control beside the account / Pro row), never in the composer or CTTF chrome.
 */

const GEAR = "gem-icon-button.mavatar-settings-button";
const GEAR_CLASS = ".mavatar-settings-button";
const WRAPPER = ".mavatar-settings-button-wrapper";
const RIGHT = ".mavatar-footer-right";

const SETTINGS_LABELS = ["Settings", "设置", "設定"] as const;

export function findSidenavSettingsGear(footer: HTMLElement): HTMLElement | null {
  const byClass =
    (footer.querySelector(GEAR) as HTMLElement | null) ??
    (footer.querySelector(GEAR_CLASS) as HTMLElement | null);
  if (byClass) return byClass;
  for (const label of SETTINGS_LABELS) {
    const labeled = footer.querySelector(`button[aria-label='${label}']`) as HTMLElement | null;
    if (!labeled) continue;
    return (labeled.closest("gem-icon-button") as HTMLElement | null) ?? labeled;
  }
  return null;
}

export function placeSidenavSettingsEntry(btn: HTMLElement, footer: HTMLElement): void {
  const gear = findSidenavSettingsGear(footer);
  if (gear) {
    if (gear.previousElementSibling !== btn) gear.before(btn);
    return;
  }
  const host =
    (footer.querySelector(WRAPPER) as HTMLElement | null) ??
    (footer.querySelector(RIGHT) as HTMLElement | null) ??
    footer;
  if (!btn.isConnected || !host.contains(btn)) host.append(btn);
}
