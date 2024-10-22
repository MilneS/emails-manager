import { testDatabaseConnection } from "../actions";
import Comp from "./Comp";
export default async function Home() {
  const isConnected = await testDatabaseConnection();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Comp/>
      </div>
    </main>
  );
}
