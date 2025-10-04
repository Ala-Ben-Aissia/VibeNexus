import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "vibe-nexus",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi explicabo doloribus maiores modi eaque corrupti atque laborum adipisci repellat. Dolorem ratione vel minima molestiae exercitationem maxime odio amet necessitatibus neque.",
};

export default function Page() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
