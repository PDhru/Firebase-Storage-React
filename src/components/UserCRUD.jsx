import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseconfig";
import { Table, Button, Form, Card } from "react-bootstrap";

function UserCRUD() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ email: "", password: "" });
  const [editId, setEditId] = useState("");

  // Fetch users from Firestore
  const fetchUsers = async () => {
    const userCollection = collection(db, "users");
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert("Fill all fields.");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "users", editId), user);
        setUsers((prev) =>
          prev.map((item) =>
            item.id === editId ? { id: editId, ...user } : item
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "users"), user);
        setUsers((prev) => [...prev, { id: docRef.id, ...user }]);
      }
      setUser({ email: "", password: "" });
      setEditId("");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  // Handle Edit
  const handleEdit = (user) => {
    setUser({ email: user.email, password: user.password });
    setEditId(user.id);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Form Section */}
      <Card className="mb-5 shadow-lg rounded border-0">
        <Card.Body
          style={{
            background: "linear-gradient(135deg, #84fab0, #8fd3f4)",
            borderRadius: "15px",
          }}
          className="p-4"
        >
          <h3 className="text-center text-white mb-4">
            {editId ? "Edit User" : "Add User"}
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="rounded-pill"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="rounded-pill"
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100 rounded-pill"
              style={{
                background: "linear-gradient(135deg, #f093fb, #f5576c)",
                border: "none",
              }}
            >
              {editId ? "Update User" : "Add User"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Table Section */}
      <Card className="shadow-lg rounded border-0">
        <Card.Header
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
          }}
          className="text-center"
        >
          <h4>User List</h4>
        </Card.Header>
        <Table striped hover responsive className="mb-0">
          <thead>
            <tr style={{ background: "#f7f9fc" }}>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(user)}
                    className="me-2 rounded-pill"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                    className="rounded-pill"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default UserCRUD;
