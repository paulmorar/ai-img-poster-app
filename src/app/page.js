"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [generationState, setGenerationState] = useState({ size: "M" });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setGenerationState({
      ...generationState,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generationState),
      });

      const data = await response.json();
      setResult({ image: data.imageUrl });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Describe your poster
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <div className="mt-2">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="A panda on a skateboard"
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <select
                id="size"
                name="size"
                defaultValue={generationState.size}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Generate my poster
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          You don't have an account?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create account
          </a>
        </p>
      </div>
      {result && result.image && (
        <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src={result.image}
            alt="Vercel Logo"
            width={320}
            height={320}
            priority
          />
        </div>
      )}
    </div>
  );
}
