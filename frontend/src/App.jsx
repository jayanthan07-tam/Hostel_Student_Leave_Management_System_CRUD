import { useEffect, useMemo, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/leaves/";

const emptyForm = {
  student_name: "",
  register_no: "",
  department: "CSBS",
  year: 2,
  from_date: "",
  to_date: "",
  reason: "",
  status: "Pending",
};

function App() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadRecords = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Unable to load records.");
      const data = await response.json();
      setRecords(data);
    } catch (err) {
      setError("Backend is not reachable. Start Django server.");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const filteredRecords = useMemo(() => {
    const text = search.toLowerCase().trim();

    return records.filter((item) => {
      const matchesSearch =
        !text ||
        item.student_name.toLowerCase().includes(text) ||
        item.register_no.toLowerCase().includes(text);

      const matchesStatus =
        !statusFilter || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    if (
      !form.student_name.trim() ||
      !form.register_no.trim() ||
      !form.department.trim() ||
      !form.from_date ||
      !form.to_date ||
      !form.reason.trim()
    ) {
      return "Please fill all required fields.";
    }

    if (form.year < 1 || form.year > 4) {
      return "Year must be between 1 and 4.";
    }

    if (form.to_date < form.from_date) {
      return "To date cannot be earlier than from date.";
    }

    return "";
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const url = editingId ? `${API_URL}${editingId}/` : API_URL;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
      }

      setMessage(editingId ? "Leave request updated." : "Leave request created.");
      resetForm();
      await loadRecords();
    } catch (err) {
      setError("Save failed. Check the entered data and backend.");
    }
  };

  const editRecord = (item) => {
    setEditingId(item.id);
    setForm({
      student_name: item.student_name,
      register_no: item.register_no,
      department: item.department,
      year: item.year,
      from_date: item.from_date,
      to_date: item.to_date,
      reason: item.reason,
      status: item.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteRecord = async (id) => {
    const ok = window.confirm("Delete this leave request?");
    if (!ok) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed.");

      setMessage("Leave request deleted.");
      await loadRecords();
    } catch (err) {
      setError("Delete failed.");
    }
  };

  const total = records.length;
  const pending = records.filter((r) => r.status === "Pending").length;
  const approved = records.filter((r) => r.status === "Approved").length;
  const rejected = records.filter((r) => r.status === "Rejected").length;

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">VSB Skill Vault – Activity 3</p>
          <h1>Hostel Leave Management</h1>
          <p className="subtitle">Mini CRUD-Based Web Application</p>
        </div>
      </header>

      <main className="container">
        <section className="stats">
          <StatCard label="Total" value={total} />
          <StatCard label="Pending" value={pending} />
          <StatCard label="Approved" value={approved} />
          <StatCard label="Rejected" value={rejected} />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>{editingId ? "Edit Leave Request" : "Create Leave Request"}</h2>
              <p>Enter student and leave details.</p>
            </div>
            {editingId && (
              <button className="secondary-btn" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>

          {message && <div className="message success">{message}</div>}
          {error && <div className="message error">{error}</div>}

          <form className="form-grid" onSubmit={handleSubmit}>
            <Field label="Student Name">
              <input
                name="student_name"
                value={form.student_name}
                onChange={handleChange}
                placeholder="Enter student name"
              />
            </Field>

            <Field label="Register Number">
              <input
                name="register_no"
                value={form.register_no}
                onChange={handleChange}
                placeholder="Enter register number"
              />
            </Field>

            <Field label="Department">
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Example: CSBS"
              />
            </Field>

            <Field label="Year">
              <select name="year" value={form.year} onChange={handleChange}>
                <option value={1}>I Year</option>
                <option value={2}>II Year</option>
                <option value={3}>III Year</option>
                <option value={4}>IV Year</option>
              </select>
            </Field>

            <Field label="From Date">
              <input
                type="date"
                name="from_date"
                value={form.from_date}
                onChange={handleChange}
              />
            </Field>

            <Field label="To Date">
              <input
                type="date"
                name="to_date"
                value={form.to_date}
                onChange={handleChange}
              />
            </Field>

            <Field label="Status">
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </Field>

            <Field label="Reason" full>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                rows="3"
                placeholder="Reason for leave"
              />
            </Field>

            <div className="form-actions">
              <button className="primary-btn" type="submit">
                {editingId ? "Update Request" : "Add Request"}
              </button>
            </div>
          </form>
        </section>

        <section className="panel">
          <div className="panel-heading record-heading">
            <div>
              <h2>Leave Records</h2>
              <p>Search, filter, edit, and delete records.</p>
            </div>
            <div className="filters">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name / register no"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Register No</th>
                  <th>Dept</th>
                  <th>Year</th>
                  <th>Leave Dates</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="empty-cell">
                      No leave records found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => (
                    <tr key={item.id}>
                      <td>{item.student_name}</td>
                      <td>{item.register_no}</td>
                      <td>{item.department}</td>
                      <td>{item.year}</td>
                      <td>
                        {item.from_date}
                        <br />
                        <span className="muted">to {item.to_date}</span>
                      </td>
                      <td>
                        <span className={`badge ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="reason-cell">{item.reason}</td>
                      <td>
                        <div className="actions">
                          <button
                            className="edit-btn"
                            onClick={() => editRecord(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteRecord(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Field({ label, children, full = false }) {
  return (
    <label className={full ? "field full" : "field"}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export default App;
