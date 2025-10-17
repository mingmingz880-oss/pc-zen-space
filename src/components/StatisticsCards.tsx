import { Card } from "@/components/ui/card";
import { Layers, Power, WifiOff } from "lucide-react";

interface StatisticsCardsProps {
  total: number;
  active: number;
  offline: number;
  onFilterChange: (filter: "all" | "active" | "offline") => void;
  currentFilter: string;
}

export const StatisticsCards = ({ 
  total, 
  active, 
  offline, 
  onFilterChange,
  currentFilter 
}: StatisticsCardsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card 
        className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
          currentFilter === "all" ? "ring-2 ring-primary" : ""
        }`}
        onClick={() => onFilterChange("all")}
      >
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">设备总数</p>
            <p className="text-3xl font-bold text-foreground">{total}</p>
          </div>
        </div>
      </Card>

      <Card 
        className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
          currentFilter === "active" ? "ring-2 ring-success" : ""
        }`}
        onClick={() => onFilterChange("active")}
      >
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-success/10 p-3">
            <Power className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">开启设备</p>
            <p className="text-3xl font-bold text-success">{active}</p>
          </div>
        </div>
      </Card>

      <Card 
        className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
          currentFilter === "offline" ? "ring-2 ring-warning" : ""
        }`}
        onClick={() => onFilterChange("offline")}
      >
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-warning/10 p-3">
            <WifiOff className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">离线设备</p>
            <p className="text-3xl font-bold text-warning">{offline}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
