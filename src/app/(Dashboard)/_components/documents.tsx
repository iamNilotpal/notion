"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const Documents = () => {
  const documents = useQuery(api.documents.getAll);
  if (!documents || documents.length === 0) return null;

  return (
    <div className="mt-4">
      {documents.map((doc) => (
        <p key={doc._id}>{doc.title}</p>
      ))}
    </div>
  );
};

export default Documents;
