"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";

const CreateNewDocument = () => {
  const [creating, setCreating] = useState(false);
  const create = useMutation(api.documents.create);

  const handleCreateDocument = async () => {
    setCreating(true);
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      finally: () => setCreating(false),
      loading: "Creating a new document.",
      error: "Error while creating document.",
      success: "Document created successfully.",
    });
  };

  return (
    <Button
      disabled={creating}
      onClick={handleCreateDocument}
      className={cn(
        "flex items-center gap-[6px]",
        creating && "cursor-not-allowed"
      )}
    >
      <PlusCircle size={16} />
      <span>Create a document</span>
    </Button>
  );
};

export default CreateNewDocument;
