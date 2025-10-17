import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AirVent, Lightbulb, Plug, Thermometer, PowerOff } from "lucide-react";
import floorPlanBg from "@/assets/floor-plan-bg.jpg";

interface Zone {
  id: string;
  name: string;
  deviceCount: number;
  position: { x: number; y: number; width: number; height: number };
  color: string;
  devices: {
    空调: { total: number; active: number };
    灯光: { total: number; active: number };
    传感器: { total: number; active: number };
    开关: { total: number; active: number };
  };
}

const zones: Zone[] = [
  {
    id: "office",
    name: "办公区",
    deviceCount: 15,
    position: { x: 2, y: 5, width: 20, height: 28 },
    color: "rgba(254, 249, 195, 0.5)",
    devices: {
      空调: { total: 3, active: 2 },
      灯光: { total: 6, active: 4 },
      传感器: { total: 4, active: 4 },
      开关: { total: 2, active: 1 },
    },
  },
  {
    id: "meeting",
    name: "会议室",
    deviceCount: 8,
    position: { x: 2, y: 35, width: 20, height: 20 },
    color: "rgba(207, 250, 254, 0.5)",
    devices: {
      空调: { total: 2, active: 1 },
      灯光: { total: 3, active: 2 },
      传感器: { total: 2, active: 2 },
      开关: { total: 1, active: 1 },
    },
  },
  {
    id: "product",
    name: "产品展示区",
    deviceCount: 18,
    position: { x: 24, y: 5, width: 28, height: 28 },
    color: "rgba(186, 230, 253, 0.5)",
    devices: {
      空调: { total: 4, active: 3 },
      灯光: { total: 8, active: 6 },
      传感器: { total: 4, active: 4 },
      开关: { total: 2, active: 2 },
    },
  },
  {
    id: "rest",
    name: "休息区",
    deviceCount: 6,
    position: { x: 24, y: 35, width: 28, height: 20 },
    color: "rgba(187, 247, 208, 0.5)",
    devices: {
      空调: { total: 1, active: 1 },
      灯光: { total: 3, active: 2 },
      传感器: { total: 1, active: 1 },
      开关: { total: 1, active: 0 },
    },
  },
  {
    id: "main-hall",
    name: "展示区-主展厅",
    deviceCount: 24,
    position: { x: 54, y: 5, width: 44, height: 28 },
    color: "rgba(254, 202, 202, 0.5)",
    devices: {
      空调: { total: 5, active: 4 },
      灯光: { total: 10, active: 8 },
      传感器: { total: 6, active: 6 },
      开关: { total: 3, active: 2 },
    },
  },
  {
    id: "stage",
    name: "舞台区",
    deviceCount: 20,
    position: { x: 54, y: 35, width: 44, height: 20 },
    color: "rgba(221, 214, 254, 0.5)",
    devices: {
      空调: { total: 4, active: 3 },
      灯光: { total: 9, active: 7 },
      传感器: { total: 5, active: 5 },
      开关: { total: 2, active: 1 },
    },
  },
  {
    id: "hall-left",
    name: "展厅-左",
    deviceCount: 6,
    position: { x: 2, y: 57, width: 48, height: 38 },
    color: "rgba(251, 207, 232, 0.5)",
    devices: {
      空调: { total: 1, active: 1 },
      灯光: { total: 3, active: 2 },
      传感器: { total: 1, active: 1 },
      开关: { total: 1, active: 1 },
    },
  },
  {
    id: "hall-right",
    name: "展厅-右",
    deviceCount: 7,
    position: { x: 52, y: 57, width: 46, height: 38 },
    color: "rgba(251, 207, 232, 0.5)",
    devices: {
      空调: { total: 2, active: 1 },
      灯光: { total: 3, active: 2 },
      传感器: { total: 1, active: 1 },
      开关: { total: 1, active: 0 },
    },
  },
];

export const FloorPlanView = () => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId === selectedZone ? null : zoneId);
  };

  const handleCloseAll = (zoneId: string, deviceType: string) => {
    console.log(`关闭 ${zoneId} 的所有 ${deviceType}`);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="relative w-full" style={{ paddingBottom: "70%" }}>
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${floorPlanBg})`,
              opacity: 0.3
            }}
          />
          
          {/* Floor plan overlay */}
          <div className="absolute inset-0">
            {zones.map((zone) => {
              const isHovered = hoveredZone === zone.id;
              const isSelected = selectedZone === zone.id;
              
              return (
                <div
                  key={zone.id}
                  className="absolute border-2 border-gray-400 cursor-pointer transition-all duration-300"
                  style={{
                    left: `${zone.position.x}%`,
                    top: `${zone.position.y}%`,
                    width: `${zone.position.width}%`,
                    height: `${zone.position.height}%`,
                    backgroundColor: zone.color,
                    borderWidth: isHovered || isSelected ? "3px" : "2px",
                    borderColor: isHovered || isSelected ? "#2563eb" : "#9ca3af",
                    zIndex: isHovered ? 10 : 1,
                  }}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick(zone.id)}
                >
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <p className="font-semibold text-foreground text-sm md:text-base">
                        {zone.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {zone.deviceCount}个设备
                      </p>
                    </div>
                  </div>

                  {/* Hover tooltip */}
                  {isHovered && (
                    <div className="absolute left-full ml-4 top-0 z-20 w-80">
                      <Card className="p-4 shadow-xl">
                        <h3 className="font-semibold mb-3 text-foreground">{zone.name}</h3>
                        <div className="space-y-2">
                          {Object.entries(zone.devices).map(([type, count]) => (
                            <div key={type} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {type === "空调" && <AirVent className="h-4 w-4 text-primary" />}
                                {type === "灯光" && <Lightbulb className="h-4 w-4 text-primary" />}
                                {type === "传感器" && <Thermometer className="h-4 w-4 text-primary" />}
                                {type === "开关" && <Plug className="h-4 w-4 text-primary" />}
                                <span className="text-sm text-foreground">{type}:</span>
                                <span className="text-sm text-muted-foreground">
                                  {count.active}/{count.total} 开启中
                                </span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCloseAll(zone.id, type);
                                }}
                                className="h-7 text-xs"
                              >
                                <PowerOff className="h-3 w-3 mr-1" />
                                全部关闭
                              </Button>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {selectedZone && (
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">
            已选择区域: <span className="font-semibold text-foreground">
              {zones.find(z => z.id === selectedZone)?.name}
            </span>
            {" "}(点击区域可切换到该区域的设备列表)
          </p>
        </Card>
      )}
    </div>
  );
};
