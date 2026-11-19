import type { SettingDef } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { UiApi } from "../ui";
import { coerceListSetting } from "../../runtime";

/** Renders one setting row. `onChange` persists; the row keeps its own DOM state. */
export function settingField(
  ui: UiApi,
  key: string,
  def: SettingDef,
  value: unknown,
  onChange: (v: unknown) => void,
): HTMLElement {
  const head = h(
    "div",
    { class: "ggpp-field-head" },
    h("div", { class: "ggpp-field-label" }, def.label, def.restartNeeded && h("span", { class: "ggpp-pill ggpp-pill-warn", title: "Takes effect after a reload" }, "reload")),
    def.description && h("div", { class: "ggpp-field-desc" }, def.description),
  );
  const row = h("div", { class: `ggpp-field ggpp-field-${def.type}`, dataset: { key } }, head);

  switch (def.type) {
    case "boolean": {
      row.classList.add("ggpp-field-inline");
      row.append(ui.switch(value as boolean, onChange));
      break;
    }
    case "number": {
      const n = value as number;
      if (def.slider && def.min !== undefined && def.max !== undefined) {
        const out = h("output", { class: "ggpp-slider-value" }, `${n}${def.unit ?? ""}`);
        const input = h("input", {
          type: "range",
          class: "ggpp-slider",
          min: def.min,
          max: def.max,
          step: def.step ?? 1,
          value: n,
          oninput: () => (out.textContent = `${input.value}${def.unit ?? ""}`),
          onchange: () => onChange(Number(input.value)),
        });
        row.append(h("div", { class: "ggpp-slider-row" }, input, out));
      } else {
        const input = h("input", {
          type: "number",
          class: "ggpp-input ggpp-number",
          min: def.min,
          max: def.max,
          step: def.step ?? 1,
          value: n,
          onchange: () => {
            let v = Number(input.value);
            if (Number.isNaN(v)) v = def.default;
            if (def.min !== undefined) v = Math.max(def.min, v);
            if (def.max !== undefined) v = Math.min(def.max, v);
            input.value = String(v);
            onChange(v);
          },
        });
        row.classList.add("ggpp-field-inline");
        row.append(h("div", { class: "ggpp-number-wrap" }, input, def.unit && h("span", { class: "ggpp-unit" }, def.unit)));
      }
      break;
    }
    case "select": {
      const select = h(
        "select",
        { class: "ggpp-input", onchange: () => onChange(select.value) },
        def.options.map((o) => h("option", { value: o.value, selected: o.value === value }, o.label)),
      );
      row.append(select);
      break;
    }
    case "string": {
      const input = def.multiline
        ? h("textarea", { class: "ggpp-input", rows: 4, placeholder: def.placeholder ?? "", value: value as string })
        : h("input", { class: "ggpp-input", placeholder: def.placeholder ?? "", value: value as string });
      input.addEventListener("change", () => onChange(input.value));
      row.append(input);
      break;
    }
    case "color": {
      const input = h("input", { type: "color", class: "ggpp-color", value: value as string, onchange: () => onChange(input.value) });
      row.classList.add("ggpp-field-inline");
      row.append(input);
      break;
    }
    case "list": {
      const items = [...coerceListSetting(value)];
      const list = h("div", { class: "ggpp-list" });
      const commit = () => onChange(items.filter((s) => s.trim()));
      const render = () => {
        list.replaceChildren(
          ...items.map((item, i) => {
            const input = h("input", {
              class: "ggpp-input",
              value: item,
              placeholder: def.placeholder ?? "",
              onchange: () => ((items[i] = input.value), commit()),
            });
            return h(
              "div",
              { class: "ggpp-list-row" },
              input,
              ui.iconButton(I.trash, "Remove", () => {
                items.splice(i, 1);
                commit();
                render();
              }),
            );
          }),
          h(
            "button",
            {
              class: "ggpp-btn ggpp-btn-ghost ggpp-list-add",
              type: "button",
              onclick: () => {
                items.push("");
                render();
                (list.querySelector(".ggpp-list-row:last-of-type input") as HTMLInputElement | null)?.focus();
              },
            },
            icon(I.plus, 16),
            "Add",
          ),
        );
      };
      render();
      row.append(list);
      break;
    }
    default: {
      const never: never = def;
      throw new Error(`Unknown setting type ${(never as SettingDef).type}`);
    }
  }
  return row;
}
