export default function Profile() {
  const email = localStorage.getItem("contractor_email");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <p><strong>Email:</strong> {email}</p>
    </div>
  );
}
