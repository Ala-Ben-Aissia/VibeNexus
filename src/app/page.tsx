// "use client";

// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";
import ClientComponent from "@/components/ClientComponent";
import { caller, getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "vibe-nexus",
  description:
    "Vibe Nexus is an AI-powered web app that turns simple prompts into stunning, fully responsive websites — no coding required",
};

export default async function Page() {
  // experiment with client component
  // const trpc = useTRPC();
  // const { data } = useQuery(trpc.sendMessge.queryOptions({ msg: "Ala" }));
  const data = await caller.sayHello({ msg: "Ala" });

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.sayHello.queryOptions({ msg: "Ala" }));
  // created a prefetch and HydrateClient helper functions to make this a bit more consice and reusable (trpc/server.tsx)

  // prefetch(trpc.sayHello.queryOptions({ msg: "Ala" }));

  return (
    <HydrateClient>
      <pre>Server: {JSON.stringify(data, null, 2)}</pre>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientComponent />
      </Suspense>
    </HydrateClient>
  );
}
