import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AirVent, Lightbulb, Plug, Thermometer, PowerOff, Edit, Save, GripVertical } from "lucide-react";
import { toast } from "sonner";
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
    name: "展厅",
    deviceCount: 13,
    position: { x: 2, y: 57, width: 48, height: 38 },
    color: "rgba(251, 207, 232, 0.5)",
    devices: {
      空调: { total: 3, active: 2 },
      灯光: { total: 6, active: 4 },
      传感器: { total: 2, active: 2 },
      开关: { total: 2, active: 1 },
    },
  },
];

export const FloorPlanView = () => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableZones, setEditableZones] = useState<Zone[]>(zones);
  const [draggingZone, setDraggingZone] = useState<string | null>(null);
  const [resizingZone, setResizingZone] = useState<{ id: string; handle: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef<{ x: number; y: number; zoneX: number; zoneY: number } | null>(null);
  const resizeStartPos = useRef<{ x: number; y: number; width: number; height: number; posX: number; posY: number } | null>(null);

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId === selectedZone ? null : zoneId);
  };

  const handleCloseAll = (zoneId: string, deviceType: string) => {
    console.log(`关闭 ${zoneId} 的所有 ${deviceType}`);
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      // 保存时输出配置
      console.log("保存的区域配置：", JSON.stringify(editableZones, null, 2));
      toast.success("区域配置已保存到控制台");
    }
    setIsEditMode(!isEditMode);
  };

  const handleMouseDown = (e: React.MouseEvent, zoneId: string, handle?: string) => {
    if (!isEditMode) return;
    e.stopPropagation();
    
    if (handle) {
      // 调整大小
      const zone = editableZones.find(z => z.id === zoneId);
      if (!zone || !containerRef.current) return;
      
      setResizingZone({ id: zoneId, handle });
      resizeStartPos.current = {
        x: e.clientX,
        y: e.clientY,
        width: zone.position.width,
        height: zone.position.height,
        posX: zone.position.x,
        posY: zone.position.y,
      };
    } else {
      // 拖动
      const zone = editableZones.find(z => z.id === zoneId);
      if (!zone) return;
      
      setDraggingZone(zoneId);
      dragStartPos.current = {
        x: e.clientX,
        y: e.clientY,
        zoneX: zone.position.x,
        zoneY: zone.position.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isEditMode) return;

    if (draggingZone && dragStartPos.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = ((e.clientX - dragStartPos.current.x) / containerRect.width) * 100;
      const deltaY = ((e.clientY - dragStartPos.current.y) / containerRect.height) * 100;
      const dragStart = dragStartPos.current;

      setEditableZones(prev =>
        prev.map(zone =>
          zone.id === draggingZone
            ? {
                ...zone,
                position: {
                  ...zone.position,
                  x: Math.max(0, Math.min(100 - zone.position.width, dragStart.zoneX + deltaX)),
                  y: Math.max(0, Math.min(100 - zone.position.height, dragStart.zoneY + deltaY)),
                },
              }
            : zone
        )
      );
    }

    if (resizingZone && resizeStartPos.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = ((e.clientX - resizeStartPos.current.x) / containerRect.width) * 100;
      const deltaY = ((e.clientY - resizeStartPos.current.y) / containerRect.height) * 100;
      const start = resizeStartPos.current;

      setEditableZones(prev =>
        prev.map(zone => {
          if (zone.id !== resizingZone.id) return zone;

          const { handle } = resizingZone;
          let newPos = { ...zone.position };

          if (handle.includes('e')) {
            newPos.width = Math.max(5, Math.min(100 - start.posX, start.width + deltaX));
          }
          if (handle.includes('w')) {
            const newWidth = Math.max(5, start.width - deltaX);
            const newX = Math.max(0, start.posX + (start.width - newWidth));
            newPos.x = newX;
            newPos.width = newWidth;
          }
          if (handle.includes('s')) {
            newPos.height = Math.max(5, Math.min(100 - start.posY, start.height + deltaY));
          }
          if (handle.includes('n')) {
            const newHeight = Math.max(5, start.height - deltaY);
            const newY = Math.max(0, start.posY + (start.height - newHeight));
            newPos.y = newY;
            newPos.height = newHeight;
          }

          return { ...zone, position: newPos };
        })
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingZone(null);
    setResizingZone(null);
    dragStartPos.current = null;
    resizeStartPos.current = null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">平面图视图</h2>
        <Button onClick={toggleEditMode} variant={isEditMode ? "default" : "outline"}>
          {isEditMode ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              保存配置
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              编辑区域
            </>
          )}
        </Button>
      </div>
      
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
          <div 
            ref={containerRef}
            className="absolute inset-0"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {editableZones.map((zone) => {
              const isHovered = hoveredZone === zone.id;
              const isSelected = selectedZone === zone.id;
              
              return (
                <div
                  key={zone.id}
                  className="absolute border-2 border-gray-400 transition-all duration-300"
                  style={{
                    left: `${zone.position.x}%`,
                    top: `${zone.position.y}%`,
                    width: `${zone.position.width}%`,
                    height: `${zone.position.height}%`,
                    backgroundColor: zone.color,
                    borderWidth: isHovered || isSelected || isEditMode ? "3px" : "2px",
                    borderColor: isEditMode ? "#10b981" : (isHovered || isSelected ? "#2563eb" : "#9ca3af"),
                    zIndex: isHovered || draggingZone === zone.id ? 10 : 1,
                    cursor: isEditMode ? "move" : "pointer",
                  }}
                  onMouseEnter={() => !isEditMode && setHoveredZone(zone.id)}
                  onMouseLeave={() => !isEditMode && setHoveredZone(null)}
                  onClick={() => !isEditMode && handleZoneClick(zone.id)}
                  onMouseDown={(e) => handleMouseDown(e, zone.id)}
                >
                  <div className="flex h-full items-center justify-center pointer-events-none">
                    <div className="text-center">
                      {isEditMode && (
                        <GripVertical className="h-5 w-5 mx-auto mb-1 text-primary" />
                      )}
                      <p className="font-semibold text-foreground text-sm md:text-base">
                        {zone.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {zone.deviceCount}个设备
                      </p>
                      {isEditMode && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {zone.position.x.toFixed(0)}, {zone.position.y.toFixed(0)} - {zone.position.width.toFixed(0)}×{zone.position.height.toFixed(0)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 调整大小的控制点 */}
                  {isEditMode && (
                    <>
                      {['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map(handle => (
                        <div
                          key={handle}
                          className="absolute w-3 h-3 bg-primary border-2 border-white rounded-full pointer-events-auto"
                          style={{
                            cursor: `${handle}-resize`,
                            ...(handle.includes('n') && { top: '-6px' }),
                            ...(handle.includes('s') && { bottom: '-6px' }),
                            ...(handle.includes('w') && { left: '-6px' }),
                            ...(handle.includes('e') && { right: '-6px' }),
                            ...(!handle.includes('n') && !handle.includes('s') && { top: 'calc(50% - 6px)' }),
                            ...(!handle.includes('w') && !handle.includes('e') && { left: 'calc(50% - 6px)' }),
                          }}
                          onMouseDown={(e) => handleMouseDown(e, zone.id, handle)}
                        />
                      ))}
                    </>
                  )}

                  {/* Hover tooltip */}
                  {isHovered && !isEditMode && (
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
