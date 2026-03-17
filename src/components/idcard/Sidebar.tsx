import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FileDown, Upload } from "lucide-react";
import type { Employee, RestaurantInfo, TemplateId } from "@/types/idcard";
import { TemplateSelector } from "./TemplateSelector";

interface SidebarProps {
  restaurant: RestaurantInfo;
  setRestaurant: (r: RestaurantInfo) => void;
  employees: Employee[];
  addEmployee: (name: string, role: string) => void;
  removeEmployee: (id: string) => void;
  template: TemplateId;
  setTemplate: (t: TemplateId) => void;
  onGenerate: () => void;
  generating: boolean;
}

export function Sidebar({
  restaurant,
  setRestaurant,
  employees,
  addEmployee,
  removeEmployee,
  template,
  setTemplate,
  onGenerate,
  generating,
}: SidebarProps) {
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    addEmployee(newName.trim(), newRole.trim() || "Staff");
    setNewName("");
    setNewRole("");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setRestaurant({ ...restaurant, logo: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <aside className="w-[340px] shrink-0 bg-card border-r border-border h-full flex flex-col overflow-hidden">
      <div className="p-5 border-b border-border">
        <h1 className="display-text text-foreground">ID Card Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">Generate print-ready staff IDs.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Restaurant Info */}
        <section className="space-y-3">
          <label className="label-text">Restaurant Name</label>
          <Input
            placeholder="e.g. The Golden Fork"
            value={restaurant.name}
            onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
          />
          <label className="label-text">Logo (optional)</label>
          <div className="flex items-center gap-3">
            {restaurant.logo ? (
              <img src={restaurant.logo} alt="Logo" className="w-10 h-10 rounded object-contain border border-border" />
            ) : (
              <div className="w-10 h-10 rounded border border-dashed border-border flex items-center justify-center text-muted-foreground">
                <Upload className="w-4 h-4" />
              </div>
            )}
            <label className="cursor-pointer text-sm text-primary hover:underline">
              {restaurant.logo ? "Change" : "Upload"}
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
            {restaurant.logo && (
              <button
                onClick={() => setRestaurant({ ...restaurant, logo: null })}
                className="text-sm text-destructive hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        </section>

        {/* Add Employee */}
        <section className="space-y-3">
          <label className="label-text">Add Employee</label>
          <div className="flex gap-2">
            <Input
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="flex-1"
            />
            <Input
              placeholder="Role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="w-28"
            />
          </div>
          <Button onClick={handleAdd} variant="secondary" className="w-full gap-2">
            <Plus className="w-4 h-4" /> Add
          </Button>
        </section>

        {/* Employee List */}
        <section className="space-y-2">
          <label className="label-text">Employees ({employees.length})</label>
          {employees.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No employees added yet.</p>
          ) : (
            <ul className="space-y-1">
              {employees.map((emp) => (
                <li
                  key={emp.id}
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-secondary transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                  </div>
                  <button
                    onClick={() => removeEmployee(emp.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Template Selector */}
        <section className="space-y-3">
          <label className="label-text">Card Template</label>
          <TemplateSelector selected={template} onSelect={setTemplate} />
        </section>
      </div>

      {/* Generate Button */}
      <div className="p-5 border-t border-border">
        <Button
          onClick={onGenerate}
          disabled={generating || employees.length === 0}
          className="w-full h-11 gap-2 font-medium active:scale-95 transition-transform"
        >
          <FileDown className="w-4 h-4" />
          {generating ? "Generating…" : "Generate PDF"}
        </Button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {Math.min(employees.length, 8)} of 8 cards per A4 sheet
        </p>
      </div>
    </aside>
  );
}
