import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Power, PowerOff, AirVent, Lightbulb, Plug, Thermometer, Monitor } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Device {
  id: string;
  name: string;
  type: "空调" | "开关" | "灯光" | "传感器" | "LED屏";
  status: "online" | "offline";
  power: boolean;
  details?: string;
}

interface DeviceListProps {
  devices: Device[];
  filter: string;
  onToggleAll: (power: boolean) => void;
}

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "空调": return AirVent;
    case "开关": return Plug;
    case "灯光": return Lightbulb;
    case "传感器": return Thermometer;
    case "LED屏": return Monitor;
    default: return Plug;
  }
};

export const DeviceList = ({ devices, filter, onToggleAll }: DeviceListProps) => {
  const filteredDevices = devices.filter(device => {
    if (filter === "all") return true;
    if (filter === "active") return device.power && device.status === "online";
    if (filter === "offline") return device.status === "offline";
    return true;
  });

  const devicesByType = {
    all: filteredDevices,
    空调: filteredDevices.filter(d => d.type === "空调"),
    开关: filteredDevices.filter(d => d.type === "开关"),
    灯光: filteredDevices.filter(d => d.type === "灯光"),
    传感器: filteredDevices.filter(d => d.type === "传感器"),
    "LED屏": filteredDevices.filter(d => d.type === "LED屏"),
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">全部 ({devicesByType.all.length})</TabsTrigger>
          <TabsTrigger value="空调">空调 ({devicesByType.空调.length})</TabsTrigger>
          <TabsTrigger value="开关">开关 ({devicesByType.开关.length})</TabsTrigger>
          <TabsTrigger value="传感器">传感器 ({devicesByType.传感器.length})</TabsTrigger>
          <TabsTrigger value="灯光">灯光 ({devicesByType.灯光.length})</TabsTrigger>
          <TabsTrigger value="LED屏">LED屏 ({devicesByType["LED屏"].length})</TabsTrigger>
        </TabsList>

        {Object.entries(devicesByType).map(([type, typeDevices]) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => onToggleAll(true)} variant="outline" size="sm">
                <Power className="mr-2 h-4 w-4" />
                全部开启
              </Button>
              <Button onClick={() => onToggleAll(false)} variant="outline" size="sm">
                <PowerOff className="mr-2 h-4 w-4" />
                全部关闭
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typeDevices.map((device) => {
                const Icon = getDeviceIcon(device.type);
                return (
                  <Card key={device.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 ${
                          device.power ? "bg-success/10" : "bg-muted"
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            device.power ? "text-success" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{device.name}</p>
                          {device.details && (
                            <p className="text-sm text-muted-foreground">{device.details}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {device.status === "offline" ? (
                          <Badge variant="destructive">离线</Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant={device.power ? "default" : "outline"}
                            className="rounded-full h-8 w-8 p-0"
                          >
                            <Power className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
