import { LiveCursor } from "@/components/molecules/LiveCursor/LiveCursor";
import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12" />
      <h1 className="font-bold">Get started with creating a new document</h1>

      {/* <LiveCursor
        userInfo={{
          name: "mikey",
          email: "m.haklander@live.nl",
          avatar: "avatar",
        }}
        cursor={{ x: 100, y: 100 }}
      /> */}
    </main>
  );
}
