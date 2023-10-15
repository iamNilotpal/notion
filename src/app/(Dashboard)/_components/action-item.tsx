import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

export interface IActionItemProps {
  label: string;
  icon: LucideIcon;
  isSearch?: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ActionItem = ({
  label,
  onClick,
  isSearch,
  disabled,
  icon: Icon,
}: IActionItemProps) => {
  return (
    <div
      role="button"
      aria-disabled={disabled}
      onClick={disabled ? () => {} : onClick}
      className={cn(
        "group text-sm py-[6px] pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        disabled && "opacity-60"
      )}
      style={{
        paddingLeft: "12px",
        ...(disabled && { pointerEvents: "none", cursor: "not-allowed" }),
      }}
    >
      <Icon className="h-[18px] mr-2" />
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none select-none rounded border bg-muted px-1.5 font-medium text-muted-foreground">
          <span className="text-[11px]">⌘</span>
          <span className="text-sm ml-[3px]">K</span>
        </kbd>
      )}
    </div>
  );
};

export default ActionItem;
