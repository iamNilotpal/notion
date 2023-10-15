import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  FileIcon,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";

export interface IActionItemProps {
  label: string;
  level?: number;
  active?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  id: Id<"documents">;
  documentIcon?: string;
  onDeleteDoc: (id: Id<"documents">) => void;
  onAddNewDoc: (id: Id<"documents">) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onExpand?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DocumentSkeleton = ({
  level,
  className,
  classNames = {},
  ...delegated
}: {
  level: number;
  classNames?: { firstChild?: string; secondChild?: string };
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex gap-x-2 py-[3px]", className)}
      style={{ paddingLeft: level ? `${level * 12 + 24}px` : "12px" }}
      {...delegated}
    >
      <Skeleton
        className={cn("h-3 w-3 bg-foreground/10", classNames.firstChild)}
      />
      <Skeleton
        className={cn("h-3 w-full bg-foreground/10", classNames.secondChild)}
      />
    </div>
  );
};

const DocumentItem = ({
  id,
  label,
  active,
  onClick,
  expanded,
  onExpand,
  disabled,
  level = 0,
  onAddNewDoc,
  onDeleteDoc,
  documentIcon,
}: IActionItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      role="button"
      aria-disabled={disabled}
      onClick={disabled ? () => {} : onClick}
      className={cn(
        "group text-sm py-[6px] pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium transition-all ease-in-out",
        disabled && "opacity-60",
        active && "bg-primary/5 text-primary font-[600]"
      )}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
        ...(disabled && { pointerEvents: "none", cursor: "not-allowed" }),
      }}
    >
      <div
        role="button"
        className="rounded-sm hover:bg-neutral-300 mr-1 text-muted-foreground/50 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          onExpand?.(e);
        }}
      >
        <ChevronIcon className="h-4 w-4" />
      </div>
      {documentIcon ? (
        <div className="mr-1 text-[16px]">{documentIcon}</div>
      ) : (
        <FileIcon className="h-[16px] mr-1" />
      )}
      <span className="truncate">{label}</span>
      <div className="ml-auto flex items-center gap-x-1 text-muted-foreground">
        <div
          className="opacity-0 group-hover:opacity-100 rounded-sm transition-all ease-in-out hover:text-foreground/70"
          onClick={(e) => {
            e.preventDefault();
            onAddNewDoc(id);
          }}
        >
          <PlusCircle className="h-4 w-4" />
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            onDeleteDoc(id);
          }}
          className="opacity-0 group-hover:opacity-100 rounded-sm transition-all ease-in-out hover:text-foreground/70"
        >
          <Trash2 className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

DocumentItem.Skeleton = DocumentSkeleton;
export default DocumentItem;
