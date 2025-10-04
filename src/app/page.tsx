import prisma from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "vibe-nexus",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi explicabo doloribus maiores modi eaque corrupti atque laborum adipisci repellat. Dolorem ratione vel minima molestiae exercitationem maxime odio amet necessitatibus neque.",
};

export default async function Page() {
  const [users, posts] = await Promise.all([
    await prisma.user.findMany(),
    await prisma.post.findMany(),
  ]);

  return (
    <div>
      <pre>users: {JSON.stringify(users, null, 2)}</pre>
      <pre>posts: {JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
