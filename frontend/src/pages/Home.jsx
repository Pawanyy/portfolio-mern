import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container px-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Portfolio management</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              This is the Portfolio management Portal
            </p>
          </div>
          <div className="space-x-4">
            <button className="w-full px-4 py-2 text-white rounded-lg bg-blue-600 hover:bg-blue-700">
              <Link to="/login">Admin Login</Link>
            </button>
            <a
              href="#"
              className="block text-center text-blue-600 hover:underline"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
