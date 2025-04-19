import Link from "next/link";

export default function Home() {
    return (
        <main>
            <Link href="/generate/whatsapp" className="p-2 px-3 bg-blue-900 rounded-md">Whatsapp</Link>
        </main>
    );
}