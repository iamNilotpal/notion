"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Trash } from "lucide-react";
import ActionItem from "./action-item";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import Spinner from "@/components/spinner";
import DocumentItem from "./document-item";
import { Input } from "@/components/ui/input";

const TrashItems = () => {
  const [search, setSearch] = useState("");
  const documents = useQuery(api.documents.getTrashDocuments);

  const filteredDocs = search.trim()
    ? documents?.filter((doc) =>
        doc.title.toLowerCase().includes(search.toLowerCase())
      ) || []
    : documents || [];

  return (
    <div className="mt-4">
      <Popover>
        <PopoverTrigger className="w-full">
          <ActionItem icon={Trash} label="Trash" onClick={() => {}} />
        </PopoverTrigger>
        <PopoverContent side="right" className="p-3 pl-1">
          {documents === undefined &&
            new Array(5).fill(0).map((_, idx) => (
              <DocumentItem.Skeleton
                key={idx}
                level={0}
                classNames={{
                  secondChild: "h-4",
                  firstChild: "h-5 w-[22.5px] rounded-full",
                }}
              />
            ))}

          <div>
            <div className="flex items-center gap-x-2 p-2">
              <Search className="h-4 w-4 text-foreground/40" />
              <Input
                value={search}
                placeholder="Filter by page title..."
                onChange={(e) => setSearch(e.target.value)}
                className="h-7 px-3 py-4 text-[13px] focus-visible:ring-transparent bg-secondary placeholder:text-[13px]"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TrashItems;
