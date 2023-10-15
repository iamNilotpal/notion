"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DocumentItem from "./document-item";

const Documents = () => {
  const documents = useQuery(api.documents.getAll);
  if (!documents || documents.length === 0) return null;

  return (
    <div className="mt-4">
      {documents.map((doc) => (
        <DocumentItem
          icon="🔥"
          expanded
          id={doc._id}
          label={doc.title}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};

export default Documents;
