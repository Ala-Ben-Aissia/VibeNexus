"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => toast.success("Background Job Started..."),
    }),
  );

  const [email, setEmail] = useState("");
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-1.5 m-2 rounded-md"
      />
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ email })}
      >
        Invoke Background Job
      </Button>
    </div>
  );
}
