import Link from "next/link";

export default function Home() {
    return (
        <main className="p-4">
            <Link href="/generate/whatsapp" className="p-2 px-3 bg-blue-900 rounded-md">Whatsapp</Link>
        </main>
    );
}