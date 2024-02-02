import Link from "next/link";

export default function Component() {
  return (
    <section
      key="1"
      className="w-full h-screen flex flex-col justify-start items-center py-12 md:py-24 lg:py-44 bg-gray-100 dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <img
            alt="Cool Quiz Screenshot"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="310"
            src="/demo.jpg"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-cool-500 dark:text-cool-300">
                Create Your Own Quiz
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Create engaging quizzes for your audience in minutes. Try it now
                or see our demo.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-green-400 to-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:from-pink-500 hover:to-yellow-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-600 disabled:pointer-events-none disabled:opacity-50 dark:from-yellow-500 dark:to-pink-500 dark:text-gray-900 dark:hover:from-pink-500 dark:hover:to-yellow-500 dark:focus-visible:ring-yellow-300"
                href="/new"
              >
                Create Quiz
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Show Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10">
        Made with 🫶 by <a className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500" href="https://twitter.com/nazeeh21">Nazeeh</a>
      </div>
    </section>
  );
}