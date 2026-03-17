import type { TemplateId } from "@/types/idcard";

const templates: { id: TemplateId; label: string; desc: string }[] = [
  { id: "classic", label: "Classic", desc: "Blue header bar with name and role" },
  { id: "modern", label: "Modern", desc: "Left color strip, clean layout" },
  { id: "minimal", label: "Minimal", desc: "Text-only, maximum readability" },
];

interface Props {
  selected: TemplateId;
  onSelect: (t: TemplateId) => void;
}

export function TemplateSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid gap-2">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`text-left px-3 py-2.5 rounded-md border transition-colors ${
            selected === t.id
              ? "border-primary bg-primary/5"
              : "border-border hover:bg-secondary"
          }`}
        >
          <p className="text-sm font-medium">{t.label}</p>
          <p className="text-xs text-muted-foreground">{t.desc}</p>
        </button>
      ))}
    </div>
  );
}
