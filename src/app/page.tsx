"use client";
import Form from "../components/Form";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-800">
      <h1 className="text-3xl text-white font-bold mb-6 uppercase">Shorty</h1>
      <Form />
    </main>
  );
}
