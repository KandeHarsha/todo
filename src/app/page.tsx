import { Button } from "@/components/ui/button";
import Link  from "next/link";
import Image from "next/image";

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

