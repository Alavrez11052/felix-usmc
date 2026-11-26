import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <Image src="/images/ega.png" alt="Eagle, Globe, and Anchor" width={90} height={93} className="mx-auto h-20 w-auto opacity-80" />
        <h1 className="mt-6 font-display font-black uppercase text-5xl">404</h1>
        <p className="mt-3 text-paper/70">This position has been overrun — the page you are looking for does not exist.</p>
        <Link href="/" className="btn-white mt-8">Return to Headquarters</Link>
      </div>
    </div>
  );
}
