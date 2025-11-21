export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Connect with trusted professionals
          </h1>
          <p className="text-gray-600 mb-6">
            From plumbing to renovations — ServicePoint SA links you with vetted
            contractors instantly.
          </p>

          <a
            href="/services"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
          >
            Explore Services
          </a>
        </div>

        <img src="https://i.imgur.com/xgQmGqE.png" className="w-full" />
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-blue-50 py-20 mt-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose ServicePoint SA?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="font-bold text-xl mb-2">Verified Contractors</h3>
              <p>All professionals are background-checked and approved.</p>
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="font-bold text-xl mb-2">Fast Response</h3>
              <p>Get contractors reaching out within minutes.</p>
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="font-bold text-xl mb-2">Secure Chat</h3>
              <p>Communicate safely via our built-in secure chat tool.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
