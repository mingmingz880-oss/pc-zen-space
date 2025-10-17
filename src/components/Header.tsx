import { Button } from "@/components/ui/button";
import { Building2, ChevronDown, Map } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  currentSpace: string;
  onSpaceChange: (space: string) => void;
  onViewChange: (view: "list" | "floorplan") => void;
  currentView: "list" | "floorplan";
}

export const Header = ({ currentSpace, onSpaceChange, onViewChange, currentView }: HeaderProps) => {
  return (
    <header className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">智能设备管理系统</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {currentSpace}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px]">
              <DropdownMenuItem onClick={() => onSpaceChange("余杭未来科技园/移动通讯大楼")}>
                余杭未来科技园/移动通讯大楼
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSpaceChange("杭州总部/A栋大楼")}>
                杭州总部/A栋大楼
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSpaceChange("上海分部/研发中心")}>
                上海分部/研发中心
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant={currentView === "floorplan" ? "default" : "outline"}
          onClick={() => onViewChange(currentView === "list" ? "floorplan" : "list")}
          className="gap-2"
        >
          <Map className="h-4 w-4" />
          {currentView === "list" ? "平面图" : "设备列表"}
        </Button>
      </div>
    </header>
  );
};
