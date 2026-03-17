import { useState, useRef } from "react";
import { Sidebar } from "@/components/idcard/Sidebar";
import { A4Preview } from "@/components/idcard/A4Preview";
import type { Employee, RestaurantInfo, TemplateId } from "@/types/idcard";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { toast } from "sonner";

const Index = () => {
  const [restaurant, setRestaurant] = useState<RestaurantInfo>({ name: "", logo: null });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [template, setTemplate] = useState<TemplateId>("classic");
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const addEmployee = (name: string, role: string) => {
    setEmployees((prev) => [...prev, { id: crypto.randomUUID(), name, role }]);
  };

  const removeEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const generatePDF = async () => {
    if (!previewRef.current || employees.length === 0) {
      toast.error("Add at least one employee first.");
      return;
    }
    setGenerating(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const A4_W = 210;
      const A4_H = 297;
      const ratio = canvas.width / canvas.height;
      let imgW = A4_W;
      let imgH = imgW / ratio;
      if (imgH > A4_H) {
        imgH = A4_H;
        imgW = imgH * ratio;
      }
      const xPos = (A4_W - imgW) / 2;
      const yPos = (A4_H - imgH) / 2;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      pdf.addImage(imgData, "PNG", xPos, yPos, imgW, imgH);
      pdf.save(`${restaurant.name || "restaurant"}-id-cards.pdf`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-workspace">
      <Sidebar
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        employees={employees}
        addEmployee={addEmployee}
        removeEmployee={removeEmployee}
        template={template}
        setTemplate={setTemplate}
        onGenerate={generatePDF}
        generating={generating}
      />
      <main className="flex-1 overflow-auto p-8 flex items-start justify-center">
        <A4Preview
          ref={previewRef}
          restaurant={restaurant}
          employees={employees}
          template={template}
        />
      </main>
    </div>
  );
};

export default Index;
