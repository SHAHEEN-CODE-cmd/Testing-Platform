// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Home() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      const snap = await getDocs(collection(db, "tests"));
      setTests(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTests();
  }, []);

  return (
    <div>
      <h2>Available Tests</h2>
      {tests.map(t => (
        <div key={t.id}>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <Link to={`/test/${t.id}`}>Take Test</Link>
        </div>
      ))}
    </div>
  );
}
