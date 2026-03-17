import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Employee, RestaurantInfo, TemplateId } from "@/types/idcard";
import { IDCard } from "./IDCard";

interface Props {
  restaurant: RestaurantInfo;
  employees: Employee[];
  template: TemplateId;
}

export const A4Preview = forwardRef<HTMLDivElement, Props>(
  ({ restaurant, employees, template }, ref) => {
    const visibleEmployees = employees.slice(0, 8);

    return (
      <div className="inline-block">
        <div
          ref={ref}
          className="bg-card shadow-[var(--shadow-card)]"
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "10mm",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "6mm",
            alignContent: "start",
          }}
        >
          <AnimatePresence>
            {visibleEmployees.map((emp, i) => (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.4, delay: i * 0.05 }}
              >
                <IDCard employee={emp} restaurant={restaurant} template={template} />
              </motion.div>
            ))}
          </AnimatePresence>
          {visibleEmployees.length === 0 && (
            <div
              className="col-span-2 flex items-center justify-center border border-dashed border-border rounded"
              style={{ height: "53.98mm" }}
            >
              <p className="text-sm text-muted-foreground">
                Add employees to see cards here
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

A4Preview.displayName = "A4Preview";
