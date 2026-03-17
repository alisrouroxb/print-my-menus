import type { Employee, RestaurantInfo, TemplateId } from "@/types/idcard";

interface Props {
  employee: Employee;
  restaurant: RestaurantInfo;
  template: TemplateId;
}

export function IDCard({ employee, restaurant, template }: Props) {
  const cardStyle: React.CSSProperties = {
    width: "85.6mm",
    height: "53.98mm",
    border: "1px dashed hsl(210, 20%, 80%)",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#ffffff",
  };

  if (template === "classic") {
    return (
      <div style={cardStyle} className="flex flex-col">
        <div className="bg-primary px-4 py-2.5 flex items-center gap-3">
          {restaurant.logo && (
            <img src={restaurant.logo} alt="" className="w-7 h-7 object-contain rounded-sm bg-primary-foreground/20 p-0.5" />
          )}
          <span className="text-primary-foreground text-base font-semibold tracking-wide uppercase truncate">
            {restaurant.name || "Restaurant"}
          </span>
        </div>
        <div className="flex-1 px-4 py-3 flex flex-col justify-center">
          <p className="text-lg font-semibold text-foreground leading-tight truncate">{employee.name}</p>
          <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">{employee.role}</p>
        </div>
        <div className="px-4 pb-2">
          <div className="h-px bg-border" />
          <p className="text-[0.55rem] text-muted-foreground mt-1">STAFF IDENTIFICATION CARD</p>
        </div>
      </div>
    );
  }

  if (template === "modern") {
    return (
      <div style={cardStyle} className="flex">
        <div className="w-2 bg-primary shrink-0" />
        <div className="flex-1 px-4 py-3 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            {restaurant.logo && (
              <img src={restaurant.logo} alt="" className="w-6 h-6 object-contain" />
            )}
            <span className="text-[0.6rem] text-muted-foreground font-semibold uppercase tracking-wider truncate">
              {restaurant.name || "Restaurant"}
            </span>
          </div>
          <div>
            <p className="text-base font-semibold text-foreground leading-tight truncate">{employee.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{employee.role}</p>
          </div>
          <p className="text-[0.55rem] text-muted-foreground">STAFF ID</p>
        </div>
      </div>
    );
  }

  // minimal
  return (
    <div style={cardStyle} className="px-5 py-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[0.6rem] text-muted-foreground font-semibold uppercase tracking-wider truncate">
          {restaurant.name || "Restaurant"}
        </span>
        {restaurant.logo && (
          <img src={restaurant.logo} alt="" className="w-5 h-5 object-contain" />
        )}
      </div>
      <div>
        <p className="text-lg font-semibold text-foreground leading-tight truncate">{employee.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wide">{employee.role}</p>
      </div>
      <div className="h-0.5 bg-foreground/10 rounded-full" />
    </div>
  );
}
