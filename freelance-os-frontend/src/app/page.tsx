import Link from 'next/link';
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="text-3xl font-bold">Freelance OS</h1>
      <div>
        <Link href="/login">
          <Button>Ir al Login</Button>
        </Link>

        <Link href="/register">
        <Button>Registrarse</Button>
        </Link>
      </div>
    </main>
  );
}


