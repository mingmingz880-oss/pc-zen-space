import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AirVent, Lightbulb, Thermometer, Clock, CheckCircle2, Calendar } from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "history" | "planned";
  deviceType: "空调" | "灯光" | "传感器";
  deviceName: string;
  action: string;
  zone: string;
  time: Date;
  status?: "completed" | "scheduled";
  rule?: string;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "planned",
    deviceType: "空调",
    deviceName: "主展厅-空调-01",
    action: "降温至22°C",
    zone: "展示区-主展厅",
    time: new Date(Date.now() + 30 * 60000),
    status: "scheduled",
    rule: "工作日节能模式",
  },
  {
    id: "2",
    type: "planned",
    deviceType: "灯光",
    deviceName: "办公区-灯光组-A",
    action: "自动关闭",
    zone: "办公区",
    time: new Date(Date.now() + 60 * 60000),
    status: "scheduled",
    rule: "下班自动关灯",
  },
  {
    id: "3",
    type: "history",
    deviceType: "空调",
    deviceName: "会议室-空调-01",
    action: "开启制冷",
    zone: "会议室",
    time: new Date(Date.now() - 15 * 60000),
    status: "completed",
  },
  {
    id: "4",
    type: "history",
    deviceType: "灯光",
    deviceName: "产品展示区-灯光-02",
    action: "亮度调至80%",
    zone: "产品展示区",
    time: new Date(Date.now() - 45 * 60000),
    status: "completed",
  },
  {
    id: "5",
    type: "planned",
    deviceType: "空调",
    deviceName: "休息区-空调-01",
    action: "调整至节能模式",
    zone: "休息区",
    time: new Date(Date.now() + 120 * 60000),
    status: "scheduled",
    rule: "午休时段节能",
  },
  {
    id: "6",
    type: "history",
    deviceType: "传感器",
    deviceName: "舞台区-温度传感器",
    action: "温度异常告警",
    zone: "舞台区",
    time: new Date(Date.now() - 90 * 60000),
    status: "completed",
  },
];

const getDeviceIcon = (deviceType: string) => {
  switch (deviceType) {
    case "空调":
      return <AirVent className="h-4 w-4" />;
    case "灯光":
      return <Lightbulb className="h-4 w-4" />;
    case "传感器":
      return <Thermometer className="h-4 w-4" />;
    default:
      return null;
  }
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const absDiff = Math.abs(diff);
  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(minutes / 60);

  if (diff > 0) {
    // 未来时间
    if (hours > 0) return `${hours}小时后`;
    return `${minutes}分钟后`;
  } else {
    // 过去时间
    if (hours > 0) return `${hours}小时前`;
    return `${minutes}分钟前`;
  }
};

export const DeviceTimeline = () => {
  const now = new Date();
  const sortedEvents = [...mockEvents].sort((a, b) => a.time.getTime() - b.time.getTime());
  
  const futureEvents = sortedEvents.filter(e => e.time > now);
  const pastEvents = sortedEvents.filter(e => e.time <= now).reverse();

  return (
    <Card className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">设备操作时间轴</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6">
          {/* 计划任务 */}
          {futureEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-primary" />
                <h4 className="font-medium text-sm text-muted-foreground">即将执行</h4>
              </div>
              <div className="space-y-3 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/30">
                {futureEvents.map((event) => (
                  <div key={event.id} className="relative pl-8">
                    <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    </div>
                    <Card className="p-3 border-primary/30 bg-primary/5">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(event.deviceType)}
                          <span className="font-medium text-sm">{event.deviceName}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {formatTime(event.time)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{event.action}</p>
                      {event.rule && (
                        <div className="flex items-center gap-1 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.rule}
                          </Badge>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">位置: {event.zone}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 当前时间分隔线 */}
          <div className="flex items-center gap-2 py-2">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-xs font-medium text-primary">当前时刻</span>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-primary via-transparent to-transparent" />
          </div>

          {/* 历史记录 */}
          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium text-sm text-muted-foreground">操作历史</h4>
              </div>
              <div className="space-y-3 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                {pastEvents.map((event) => (
                  <div key={event.id} className="relative pl-8">
                    <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Card className="p-3 bg-muted/30">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(event.deviceType)}
                          <span className="font-medium text-sm">{event.deviceName}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {formatTime(event.time)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{event.action}</p>
                      <p className="text-xs text-muted-foreground">位置: {event.zone}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
