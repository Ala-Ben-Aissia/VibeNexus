"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

/**
 * A client-side React component that demonstrates Suspense-enabled data fetching using tRPC integrated with Tanstack React Query.
 * This version uses useSuspenseQuery to suspend rendering until data is available, assuming proper <Suspense> boundaries in the parent components.
 * It's designed for scenarios where server-side prefetching is used in SSR (e.g. home page), but with considerations for hydration.
 */
export default function ClientComponent() {
  // Initialize the tRPC client hook to access tRPC procedures.
  const trpc = useTRPC();

  // Primary Approach: Use useSuspenseQuery for Suspense-enabled fetching.
  // This allows the component to "suspend" until data is resolved.
  // Benefits: Cleaner code without manual loading states; integrates well with React's concurrent features.
  // Requirements: The component (or its ancestors) must be wrapped in <Suspense> with a fallback (e.g., <Suspense fallback={<div>Loading...</div>}>).
  // In SSR with prefetch: Data from server prefetch can hydrate seamlessly if query keys match.
  const { data } = useSuspenseQuery(trpc.sayHello.queryOptions({ msg: "Ala" }));

  // ----------------------
  // Alternative Approach: Use standard useQuery with manual loading handling.
  // This avoids Suspense but requires explicit checks for data availability.
  // const { data } = useQuery(trpc.sayHello.queryOptions({ msg: "Ala" }));
  // if (!data) return <div>Loading...</div>;
  //
  // Hydration Error Mitigation:
  // - If using useQuery or useSuspenseQuery in an SSR context with prefetch, ensure no mismatched <Suspense> wrappers.
  // Remove unnecessary <Suspense> around this component to prevent hydration errors (server HTML vs. client render mismatch).
  // - If errors persist, try a different query input (e.g., { msg: "Peter" }) to make the client query distinct from the server-prefetched one.
  // This forces independent client-side fetching, bypassing hydration issues, but may lead to duplicate requests.
  // ----------------------
  // Another Alternative: Server-Side Prefetching for Guaranteed Data Availability.
  // In your SSR home page (server component), await the prefetch to ensure the query completes before rendering:
  // await queryClient.prefetchQuery(trpc.sayHello.queryOptions({ msg: "Ala" }));
  // Then dehydrate the QueryClient state and hydrate on the client.
  // Benefits: Data is available immediately on client hydration, reducing or eliminating loading states.
  // Tradeoff: Increases server render time, as the page waits for the query to finish before sending HTML to the client.
  // This is ideal for critical data but may slow initial page loads for slower queries.
  // For implementation details in tRPC + React Query with Next.js server components:
  // https://trpc.io/docs/client/tanstack-react-query/server-components#using-your-api

  // Render the fetched data as formatted JSON for display.
  return <pre>Client: {JSON.stringify(data, null, 2)}</pre>;
}
