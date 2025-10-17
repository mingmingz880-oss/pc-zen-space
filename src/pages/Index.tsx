import { useState } from "react";
import { Header } from "@/components/Header";
import { StatisticsCards } from "@/components/StatisticsCards";
import { DeviceList } from "@/components/DeviceList";
import { FloorPlanView } from "@/components/FloorPlanView";

// Mock data
const mockDevices = [
  { id: "1", name: "智能插座3E", type: "开关" as const, status: "online" as const, power: true },
  { id: "2", name: "智能插座3B", type: "开关" as const, status: "online" as const, power: true },
  { id: "3", name: "会议室空调", type: "空调" as const, status: "online" as const, power: true, details: "功率: 2500W" },
  { id: "4", name: "走廊灯", type: "灯光" as const, status: "online" as const, power: false },
  { id: "5", name: "温度传感器", type: "传感器" as const, status: "offline" as const, power: false, details: "功率: 5W" },
  { id: "6", name: "大厅空调1", type: "空调" as const, status: "online" as const, power: true, details: "功率: 3000W" },
  { id: "7", name: "办公区灯光", type: "灯光" as const, status: "online" as const, power: true },
  { id: "8", name: "湿度传感器", type: "传感器" as const, status: "online" as const, power: true, details: "功率: 5W" },
  { id: "9", name: "主展厅LED屏", type: "LED屏" as const, status: "online" as const, power: true, details: "55寸" },
  { id: "10", name: "会议室灯光", type: "灯光" as const, status: "online" as const, power: false },
  { id: "11", name: "前台空调", type: "空调" as const, status: "online" as const, power: false, details: "功率: 2000W" },
  { id: "12", name: "智能插座4A", type: "开关" as const, status: "online" as const, power: true },
];

const Index = () => {
  const [currentSpace, setCurrentSpace] = useState("余杭未来科技园/移动通讯大楼");
  const [currentView, setCurrentView] = useState<"list" | "floorplan">("list");
  const [filter, setFilter] = useState<"all" | "active" | "offline">("all");

  const totalDevices = mockDevices.length;
  const activeDevices = mockDevices.filter(d => d.power && d.status === "online").length;
  const offlineDevices = mockDevices.filter(d => d.status === "offline").length;

  const handleToggleAll = (power: boolean) => {
    console.log(`Toggle all devices to ${power ? "ON" : "OFF"}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentSpace={currentSpace}
        onSpaceChange={setCurrentSpace}
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      
      <main className="container mx-auto p-6 space-y-6">
        <StatisticsCards
          total={totalDevices}
          active={activeDevices}
          offline={offlineDevices}
          onFilterChange={setFilter}
          currentFilter={filter}
        />

        {currentView === "list" ? (
          <DeviceList
            devices={mockDevices}
            filter={filter}
            onToggleAll={handleToggleAll}
          />
        ) : (
          <FloorPlanView />
        )}
      </main>
    </div>
  );
};

export default Index;
