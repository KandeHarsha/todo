import { Button } from "@/components/ui/button";
import Link  from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Link href="/list">
          <Button>Go to Lists</Button>
        </Link>
      </div>
    
    </>
    
  );
}

