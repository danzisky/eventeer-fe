import PageHeading from "@/components/PageHeading";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/lib/mat-tailwind";
import Link from "next/link";

export default function Home() {
  const isAuthenticated = useAuth();

  return (
    <div className="mx-auto p-6 flex flex-col min-h-[50vh]">
      <PageHeading title={isAuthenticated ? 'Welcome User' : 'Anonymous'}></PageHeading>
      <div className="grow w-full flex items-center justify-center">
        <Link href="/events">
          <Button>
            Go to your events
          </Button>
        </Link>
      </div>
    </div>
  );
}
