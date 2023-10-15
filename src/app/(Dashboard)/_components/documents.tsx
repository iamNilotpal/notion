"use client";

import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import DocumentItem from "./document-item";

export interface IDocumentsProps {
  level?: number;
  data?: Doc<"documents">[];
  parentDocId?: Id<"documents">;
}

const Documents = ({ level = 0, parentDocId }: IDocumentsProps) => {
  const params = useParams();
  const router = useRouter();

  const [interacting, setInteracting] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const createDoc = useMutation(api.documents.create);
  const deleteDoc = useMutation(api.documents.deleteDoc);
  const documents = useQuery(api.documents.getSidebarData, {
    parentDocument: parentDocId,
  });

  const handleExpand = (docId: Id<"documents">) => {
    setExpanded((state) => ({ ...state, [docId]: !state[docId] }));
  };

  const handleRedirect = (docId: Id<"documents">) => {
    router.push(`/documents/${docId}`);
  };

  const handleDeleteDoc = async (docId: Id<"documents">) => {
    if (!docId) return;
    setInteracting(true);

    const promise = deleteDoc({ docId: docId });
    toast.promise(promise, {
      loading: "Deleting document.",
      finally: () => setInteracting(false),
      error: "Error while deleting document.",
      success: "Document deleted successfully.",
    });

    try {
      const doc = await promise;
      if (doc) router.push(`/documents/${doc}`);
    } catch (error) {}
  };

  const handleAddNewDoc = (docId: Id<"documents">) => {
    if (!docId) return;

    setInteracting(true);
    const promise = createDoc({ title: "Untitled", parentDocument: docId });
    toast.promise(promise, {
      finally: () => setInteracting(false),
      loading: "Creating a new document.",
      error: "Error while creating document.",
      success: "Document created successfully.",
    });
  };

  if (documents === undefined)
    return level === 0 ? (
      <div className="mt-4 ml-[7px] w-full pr-6 flex flex-col gap-y-1">
        {new Array(10).fill(0).map((_, idx) => (
          <DocumentItem.Skeleton
            key={idx}
            level={level}
            classNames={{ firstChild: "hidden", secondChild: "h-5" }}
          />
        ))}
      </div>
    ) : null;

  return (
    <article>
      {level > 0 && documents.length == 0 && (
        <p
          style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
          className={cn(
            "hidden text-[13px] font-medium text-muted-foreground/80 mt-[1px]",
            expanded && "last:block",
            level === 0 && "hidden"
          )}
        >
          No pages inside
        </p>
      )}
      {documents?.map((doc) => (
        <div key={doc._id}>
          <DocumentItem
            id={doc._id}
            level={level}
            label={doc.title}
            disabled={interacting}
            documentIcon={doc.icon}
            expanded={expanded[doc._id]}
            active={params.docId === doc._id}
            onExpand={() => handleExpand(doc._id)}
            onClick={() => handleRedirect(doc._id)}
            onAddNewDoc={() => handleAddNewDoc(doc._id)}
            onDeleteDoc={() => handleDeleteDoc(doc._id)}
          />
          {expanded[doc._id] && (
            <Documents parentDocId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </article>
  );
};

export default Documents;
