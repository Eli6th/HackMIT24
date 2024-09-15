import AuthStatus from "./(components-navbar)/auth-status";
import Navbar from "./(components-navbar)/navbar";

export default function Home() {
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden rounded-lg bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.inc.com/uploaded_files/image/1920x1080/getty_541975802_243006.jpg')`,
        width: "100vw",
      }}
    >
      {/* Dark overlay for the image */}
      <div className="absolute inset-0 z-0 rounded-lg bg-black/50"></div>

      {/* Updated Header */}
      <header className="relative z-10">
        <nav className="container mx-auto p-6">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <Navbar className="mx-6 text-white" />
              <div className="ml-auto flex items-center space-x-4">
                <AuthStatus />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between"></div>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-grow flex-col items-center justify-center text-center text-white">
        <h1 className="mb-6 font-sans text-6xl font-bold">Never Miss a Beat in Your Conversations</h1>
        <p className="mb-8 font-sans text-xl">
          Track discussions, follow agendas, and receive detailed reports all in real-time. Elevate your interactions
          with speakEZ.
        </p>
        <button className="rounded-lg bg-white px-6 py-3 font-sans font-bold text-black transition-all hover:bg-gray-200">
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 py-6 text-white">
        <div className="container mx-auto flex flex-col items-center justify-center md:flex-row md:justify-between">
          <p className="text-center font-sans md:text-left">&copy; 2024 speakEZ. All rights reserved.</p>
          <ul className="mt-4 flex space-x-6 md:mt-0">
            <li>
              <a href="#" className="font-sans hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="font-sans hover:text-gray-400">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
