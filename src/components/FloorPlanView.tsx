import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AirVent, Lightbulb, Plug, Thermometer, PowerOff, Edit, Save, GripVertical, ChevronDown, ChevronUp, Monitor } from "lucide-react";
import { toast } from "sonner";
import floorPlanBg from "@/assets/floor-plan-bg.jpg";
import { DeviceTimeline } from "./DeviceTimeline";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface DeviceItem {
  id: string;
  name: string;
  isActive: boolean;
}

interface Zone {
  id: string;
  name: string;
  deviceCount: number;
  position: { x: number; y: number; width: number; height: number };
  color: string;
  devices: {
    空调: { total: number; active: number; items: DeviceItem[] };
    灯光: { total: number; active: number; items: DeviceItem[] };
    传感器: { total: number; active: number; items: DeviceItem[] };
    开关: { total: number; active: number; items: DeviceItem[] };
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
      空调: { 
        total: 3, 
        active: 2,
        items: [
          { id: "ac-1", name: "空调-01", isActive: true },
          { id: "ac-2", name: "空调-02", isActive: true },
          { id: "ac-3", name: "空调-03", isActive: false },
        ]
      },
      灯光: { 
        total: 6, 
        active: 4,
        items: [
          { id: "light-1", name: "灯光-01", isActive: true },
          { id: "light-2", name: "灯光-02", isActive: true },
          { id: "light-3", name: "灯光-03", isActive: true },
          { id: "light-4", name: "灯光-04", isActive: true },
          { id: "light-5", name: "灯光-05", isActive: false },
          { id: "light-6", name: "灯光-06", isActive: false },
        ]
      },
      传感器: { 
        total: 4, 
        active: 4,
        items: [
          { id: "sensor-1", name: "传感器-01", isActive: true },
          { id: "sensor-2", name: "传感器-02", isActive: true },
          { id: "sensor-3", name: "传感器-03", isActive: true },
          { id: "sensor-4", name: "传感器-04", isActive: true },
        ]
      },
      开关: { 
        total: 2, 
        active: 1,
        items: [
          { id: "switch-1", name: "开关-01", isActive: true },
          { id: "switch-2", name: "开关-02", isActive: false },
        ]
      },
    },
  },
  {
    id: "meeting",
    name: "会议室",
    deviceCount: 8,
    position: { x: 2, y: 35, width: 20, height: 20 },
    color: "rgba(207, 250, 254, 0.5)",
    devices: {
      空调: { 
        total: 2, 
        active: 1,
        items: [
          { id: "ac-4", name: "空调-04", isActive: true },
          { id: "ac-5", name: "空调-05", isActive: false },
        ]
      },
      灯光: { 
        total: 3, 
        active: 2,
        items: [
          { id: "light-7", name: "灯光-07", isActive: true },
          { id: "light-8", name: "灯光-08", isActive: true },
          { id: "light-9", name: "灯光-09", isActive: false },
        ]
      },
      传感器: { 
        total: 2, 
        active: 2,
        items: [
          { id: "sensor-5", name: "传感器-05", isActive: true },
          { id: "sensor-6", name: "传感器-06", isActive: true },
        ]
      },
      开关: { 
        total: 1, 
        active: 1,
        items: [
          { id: "switch-3", name: "开关-03", isActive: true },
        ]
      },
    },
  },
  {
    id: "product",
    name: "产品展示区",
    deviceCount: 18,
    position: { x: 24, y: 5, width: 28, height: 28 },
    color: "rgba(186, 230, 253, 0.5)",
    devices: {
      空调: { total: 4, active: 3, items: [{ id: "ac-6", name: "空调-06", isActive: true }, { id: "ac-7", name: "空调-07", isActive: true }, { id: "ac-8", name: "空调-08", isActive: true }, { id: "ac-9", name: "空调-09", isActive: false }] },
      灯光: { total: 8, active: 6, items: [{ id: "light-10", name: "灯光-10", isActive: true }, { id: "light-11", name: "灯光-11", isActive: true }, { id: "light-12", name: "灯光-12", isActive: true }, { id: "light-13", name: "灯光-13", isActive: true }, { id: "light-14", name: "灯光-14", isActive: true }, { id: "light-15", name: "灯光-15", isActive: true }, { id: "light-16", name: "灯光-16", isActive: false }, { id: "light-17", name: "灯光-17", isActive: false }] },
      传感器: { total: 4, active: 4, items: [{ id: "sensor-7", name: "传感器-07", isActive: true }, { id: "sensor-8", name: "传感器-08", isActive: true }, { id: "sensor-9", name: "传感器-09", isActive: true }, { id: "sensor-10", name: "传感器-10", isActive: true }] },
      开关: { total: 2, active: 2, items: [{ id: "switch-4", name: "开关-04", isActive: true }, { id: "switch-5", name: "开关-05", isActive: true }] },
    },
  },
  {
    id: "rest",
    name: "休息区",
    deviceCount: 6,
    position: { x: 24, y: 35, width: 28, height: 20 },
    color: "rgba(187, 247, 208, 0.5)",
    devices: {
      空调: { total: 1, active: 1, items: [{ id: "ac-10", name: "空调-10", isActive: true }] },
      灯光: { total: 3, active: 2, items: [{ id: "light-18", name: "灯光-18", isActive: true }, { id: "light-19", name: "灯光-19", isActive: true }, { id: "light-20", name: "灯光-20", isActive: false }] },
      传感器: { total: 1, active: 1, items: [{ id: "sensor-11", name: "传感器-11", isActive: true }] },
      开关: { total: 1, active: 0, items: [{ id: "switch-6", name: "开关-06", isActive: false }] },
    },
  },
  {
    id: "main-hall",
    name: "展示区-主展厅",
    deviceCount: 24,
    position: { x: 54, y: 5, width: 44, height: 28 },
    color: "rgba(254, 202, 202, 0.5)",
    devices: {
      空调: { total: 5, active: 4, items: [{ id: "ac-11", name: "空调-11", isActive: true }, { id: "ac-12", name: "空调-12", isActive: true }, { id: "ac-13", name: "空调-13", isActive: true }, { id: "ac-14", name: "空调-14", isActive: true }, { id: "ac-15", name: "空调-15", isActive: false }] },
      灯光: { total: 10, active: 8, items: [{ id: "light-21", name: "灯光-21", isActive: true }, { id: "light-22", name: "灯光-22", isActive: true }, { id: "light-23", name: "灯光-23", isActive: true }, { id: "light-24", name: "灯光-24", isActive: true }, { id: "light-25", name: "灯光-25", isActive: true }, { id: "light-26", name: "灯光-26", isActive: true }, { id: "light-27", name: "灯光-27", isActive: true }, { id: "light-28", name: "灯光-28", isActive: true }, { id: "light-29", name: "灯光-29", isActive: false }, { id: "light-30", name: "灯光-30", isActive: false }] },
      传感器: { total: 6, active: 6, items: [{ id: "sensor-12", name: "传感器-12", isActive: true }, { id: "sensor-13", name: "传感器-13", isActive: true }, { id: "sensor-14", name: "传感器-14", isActive: true }, { id: "sensor-15", name: "传感器-15", isActive: true }, { id: "sensor-16", name: "传感器-16", isActive: true }, { id: "sensor-17", name: "传感器-17", isActive: true }] },
      开关: { total: 3, active: 2, items: [{ id: "switch-7", name: "开关-07", isActive: true }, { id: "switch-8", name: "开关-08", isActive: true }, { id: "switch-9", name: "开关-09", isActive: false }] },
    },
  },
  {
    id: "stage",
    name: "舞台区",
    deviceCount: 20,
    position: { x: 54, y: 35, width: 44, height: 20 },
    color: "rgba(221, 214, 254, 0.5)",
    devices: {
      空调: { total: 4, active: 3, items: [{ id: "ac-16", name: "空调-16", isActive: true }, { id: "ac-17", name: "空调-17", isActive: true }, { id: "ac-18", name: "空调-18", isActive: true }, { id: "ac-19", name: "空调-19", isActive: false }] },
      灯光: { total: 9, active: 7, items: [{ id: "light-31", name: "灯光-31", isActive: true }, { id: "light-32", name: "灯光-32", isActive: true }, { id: "light-33", name: "灯光-33", isActive: true }, { id: "light-34", name: "灯光-34", isActive: true }, { id: "light-35", name: "灯光-35", isActive: true }, { id: "light-36", name: "灯光-36", isActive: true }, { id: "light-37", name: "灯光-37", isActive: true }, { id: "light-38", name: "灯光-38", isActive: false }, { id: "light-39", name: "灯光-39", isActive: false }] },
      传感器: { total: 5, active: 5, items: [{ id: "sensor-18", name: "传感器-18", isActive: true }, { id: "sensor-19", name: "传感器-19", isActive: true }, { id: "sensor-20", name: "传感器-20", isActive: true }, { id: "sensor-21", name: "传感器-21", isActive: true }, { id: "sensor-22", name: "传感器-22", isActive: true }] },
      开关: { total: 2, active: 1, items: [{ id: "switch-10", name: "开关-10", isActive: true }, { id: "switch-11", name: "开关-11", isActive: false }] },
    },
  },
  {
    id: "hall-left",
    name: "展厅",
    deviceCount: 13,
    position: { x: 2, y: 57, width: 48, height: 38 },
    color: "rgba(251, 207, 232, 0.5)",
    devices: {
      空调: { total: 3, active: 2, items: [{ id: "ac-20", name: "空调-20", isActive: true }, { id: "ac-21", name: "空调-21", isActive: true }, { id: "ac-22", name: "空调-22", isActive: false }] },
      灯光: { total: 6, active: 4, items: [{ id: "light-40", name: "灯光-40", isActive: true }, { id: "light-41", name: "灯光-41", isActive: true }, { id: "light-42", name: "灯光-42", isActive: true }, { id: "light-43", name: "灯光-43", isActive: true }, { id: "light-44", name: "灯光-44", isActive: false }, { id: "light-45", name: "灯光-45", isActive: false }] },
      传感器: { total: 2, active: 2, items: [{ id: "sensor-23", name: "传感器-23", isActive: true }, { id: "sensor-24", name: "传感器-24", isActive: true }] },
      开关: { total: 2, active: 1, items: [{ id: "switch-12", name: "开关-12", isActive: true }, { id: "switch-13", name: "开关-13", isActive: false }] },
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
  const [expandedDeviceTypes, setExpandedDeviceTypes] = useState<Record<string, boolean>>({});
  const [deviceFilter, setDeviceFilter] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef<{ x: number; y: number; zoneX: number; zoneY: number } | null>(null);
  const resizeStartPos = useRef<{ x: number; y: number; width: number; height: number; posX: number; posY: number } | null>(null);

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId === selectedZone ? null : zoneId);
  };

  const handleCloseAll = (zoneId: string, deviceType: string) => {
    toast.success(`已关闭${zoneId}的所有${deviceType}`);
    console.log(`关闭 ${zoneId} 的所有 ${deviceType}`);
  };

  const handleDeviceToggle = (zoneId: string, deviceType: string, deviceId: string, currentState: boolean) => {
    toast.success(`${deviceId} 已${currentState ? '关闭' : '开启'}`);
    console.log(`${deviceId} 从 ${currentState} 切换到 ${!currentState}`);
  };

  const toggleDeviceTypeExpand = (key: string) => {
    setExpandedDeviceTypes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
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
                      {!isEditMode && (() => {
                        const activeDevices = Object.entries(zone.devices)
                          .filter(([_, info]) => info.active > 0)
                          .map(([type, info]) => ({ type, count: info.active }));
                        
                        if (activeDevices.length > 0) {
                          return (
                            <div className="flex flex-wrap gap-1 justify-center mt-2">
                              {activeDevices.map(({ type, count }) => (
                                <Badge key={type} variant="secondary" className="text-xs px-1.5 py-0.5">
                                  {type === "空调" && <AirVent className="h-3 w-3 mr-0.5" />}
                                  {type === "灯光" && <Lightbulb className="h-3 w-3 mr-0.5" />}
                                  {type === "传感器" && <Thermometer className="h-3 w-3 mr-0.5" />}
                                  {type === "开关" && <Plug className="h-3 w-3 mr-0.5" />}
                                  {count}
                                </Badge>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      })()}
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
                    <div className="absolute left-full ml-4 top-0 z-20 w-96">
                      <Card className="p-4 shadow-xl">
                        <h3 className="font-semibold mb-3 text-foreground">{zone.name}</h3>
                        <div className="space-y-3">
                          {Object.entries(zone.devices).map(([type, deviceInfo]) => {
                            const expandKey = `${zone.id}-${type}`;
                            const isExpanded = expandedDeviceTypes[expandKey];
                            
                            return (
                              <div key={type} className="border rounded-lg p-2">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2 flex-1">
                                    {type === "空调" && <AirVent className="h-4 w-4 text-primary" />}
                                    {type === "灯光" && <Lightbulb className="h-4 w-4 text-primary" />}
                                    {type === "传感器" && <Thermometer className="h-4 w-4 text-primary" />}
                                    {type === "开关" && <Plug className="h-4 w-4 text-primary" />}
                                    <span className="text-sm text-foreground">{type}:</span>
                                    <span className="text-sm text-muted-foreground">
                                      {deviceInfo.active}/{deviceInfo.total} 开启中
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDeviceTypeExpand(expandKey);
                                      }}
                                      className="h-7 w-7 p-0"
                                    >
                                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </Button>
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
                                </div>
                                
                                {isExpanded && (
                                  <div className="space-y-1 mt-2 pl-6">
                                    {deviceInfo.items.map((device) => (
                                      <div key={device.id} className="flex items-center justify-between py-1">
                                        <span className="text-xs text-foreground">{device.name}</span>
                                        <Switch
                                          checked={device.isActive}
                                          onCheckedChange={() => handleDeviceToggle(zone.id, type, device.name, device.isActive)}
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Device Filter Tabs */}
        <div className="mt-4">
          <Tabs value={deviceFilter} onValueChange={setDeviceFilter} className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all" className="flex items-center gap-1">
                全部
              </TabsTrigger>
              <TabsTrigger value="空调" className="flex items-center gap-1">
                <AirVent className="h-4 w-4" />
                空调
              </TabsTrigger>
              <TabsTrigger value="灯光" className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                灯光
              </TabsTrigger>
              <TabsTrigger value="开关" className="flex items-center gap-1">
                <Plug className="h-4 w-4" />
                开关
              </TabsTrigger>
              <TabsTrigger value="传感器" className="flex items-center gap-1">
                <Thermometer className="h-4 w-4" />
                传感器
              </TabsTrigger>
              <TabsTrigger value="LED屏" className="flex items-center gap-1">
                <Monitor className="h-4 w-4" />
                LED屏
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Card>
        </div>

        <div className="lg:col-span-1">
          <DeviceTimeline />
        </div>
      </div>

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
