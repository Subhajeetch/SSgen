import Link from "next/link";

export default function Home() {
    return (
        <main className="p-4">
            <Link href="/home" className="p-2 px-3 bg-blue-900 rounded-md">Home</Link>
        </main>
    );
}