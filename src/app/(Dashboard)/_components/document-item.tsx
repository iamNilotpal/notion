import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";

export interface IActionItemProps {
  icon: string;
  label: string;
  level?: number;
  active?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  id: Id<"documents">;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onExpand?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DocumentSkeleton = ({ level }: { level: number }) => {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

const DocumentItem = ({
  id,
  icon,
  label,
  active,
  onClick,
  expanded,
  onExpand,
  disabled,
  level = 0,
}: IActionItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      role="button"
      aria-disabled={disabled}
      onClick={disabled ? () => {} : onClick}
      className={cn(
        "group text-sm py-[6px] pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        disabled && "opacity-60",
        active && "bg-primary/5 text-primary"
      )}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
        ...(disabled && { pointerEvents: "none", cursor: "not-allowed" }),
      }}
    >
      <div
        role="button"
        className="rounded-sm hover:bg-neutral-300 mr-1 text-muted-foreground/50"
      >
        <ChevronIcon className="h-4 w-4" />
      </div>
      <div className="mr-1 text-[16px]">{icon}</div>
      <span className="truncate">{label}</span>
    </div>
  );
};

DocumentItem.Skeleton = DocumentSkeleton;
export default DocumentItem;
