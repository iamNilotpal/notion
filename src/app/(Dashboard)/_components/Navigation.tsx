"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { PlusCircleIcon, SearchIcon, Settings } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import ActionItem from "./action-item";
import UserActionItem from "./user-action";
import Documents from "./documents";

const Navigation = () => {
  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);

  const handleCreateDocument = async () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new document.",
      error: "Error while creating document.",
      success: "Document created successfully.",
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isResizingRef.current) return;
    if (!sidebarRef.current) return;

    let newWidth = e.clientX;
    if (newWidth > 400) newWidth = 400;
    if (newWidth < 240) newWidth = 240;

    sidebarRef.current.style.width = `${newWidth}px`;
    sidebarRef.current.style.transition = "all .01s cubic-bezier(0.2, 0, 0, 1)";
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = false;
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col"
      )}
    >
      <UserActionItem />
      <ActionItem
        isSearch
        label="Search"
        icon={SearchIcon}
        onClick={() => {}}
      />
      <ActionItem label="Settings" icon={Settings} onClick={() => {}} />
      <ActionItem
        disabled
        label="New Page"
        icon={PlusCircleIcon}
        onClick={handleCreateDocument}
      />
      <Documents />
      <div
        onMouseDown={handleMouseDown}
        className="opacity-0 group-hover/sidebar:opacity-100 transition ease-in cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0 active:w-1"
      />
    </aside>
  );
};

export default Navigation;
