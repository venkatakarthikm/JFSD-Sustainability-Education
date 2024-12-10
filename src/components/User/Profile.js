import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock fetching user details (replace with actual API or local storage fetch)
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Loading profile...</p>; // Show a loading message if user data is not yet available
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Profile Page</h3>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
        <img
          src={user.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfyOa5OP-T-puERaQ9iEM5M_KVslF14IS0wA&s"} // Replace with user's avatar if available
          alt="User Avatar"
          style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', marginBottom: '20px' }}
        />
        <h4>Name: {user.name || "N/A"}</h4>
        <p>Email: {user.email || "N/A"}</p>
        <p>Role: {user.role || "N/A"}</p>
        <p>Here For: Learning Sustainability and Creating a Greener Future</p>
        <p>Bio: {user.bio || `I am a passionate ${user.role.toLowerCase()} eager to learn and contribute to sustainability.`}</p>
      </div>
    </div>
  );
}
