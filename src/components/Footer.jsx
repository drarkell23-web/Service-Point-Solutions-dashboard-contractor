export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-20">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} ServicePoint SA — All Rights Reserved.</p>
      </div>
    </footer>
  );
}
