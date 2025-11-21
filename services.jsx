export default function Services() {
  return (
    <div className="container mx-auto px-6 py-16">
      
      <h1 className="text-4xl font-bold mb-10 text-gray-900">
        Our Services
      </h1>

      {/* Categories */}
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {["Plumbing", "Electrical", "Building", "Painting", "Cleaning", "Gardening", "Security", "Handyman"]
          .map((cat) => (
            <div key={cat} className="bg-white shadow p-6 rounded-lg text-center">
              <p className="font-semibold">{cat}</p>
            </div>
        ))}
      </div>

      {/* Services List */}
      <h2 className="text-2xl font-bold mb-4">All Services</h2>
      <ul className="grid md:grid-cols-2 gap-4 mb-16">
        {[
          "Burst Pipe Repair",
          "Geyser Installation",
          "Electrical Wiring",
          "Plug & Light Fixing",
          "Home Renovations",
          "Roof Repairs",
          "Interior Painting",
          "Deep Cleaning",
          "Garden Maintenance",
          "CCTV Setup",
          "Security Gate Installations",
          "General Handyman Work"
        ].map((srv) => (
          <li key={srv} className="bg-white p-4 rounded shadow">{srv}</li>
        ))}
      </ul>

      {/* Top Contractors */}
      <h2 className="text-2xl font-bold mb-4">Top Contractors</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {["FixPro", "Handyman Hub", "Plumb24"].map((c) => (
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-bold text-xl">{c}</h3>
            <p className="text-gray-600">5-star rated | 200+ jobs</p>
          </div>
        ))}
      </div>
    </div>
  );
}
