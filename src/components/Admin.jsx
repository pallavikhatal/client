// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Row,
//   Col,
//   Container,
//   Alert,
// } from "react-bootstrap";

// const Admin = () => {
//   const [jobs, setJobs] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingJob, setEditingJob] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     company: "",
//     location: "",
//     type: "",
//     salaryMin: "",
//     salaryMax: "",
//   });
//   const [alertMsg, setAlertMsg] = useState("");

//   const token = localStorage.getItem("token"); // adjust if token is stored differently

//   // Fetch Jobs
//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/jobs");
//       setJobs(res.data);
//     } catch (error) {
//       console.error("Error fetching jobs", error);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   // Handle Form Input
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Handle Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const jobPayload = {
//       title: formData.title,
//       description: formData.description,
//       company: formData.company,
//       location: formData.location,
//       type: formData.type,
//       salaryRange: {
//         min: Number(formData.salaryMin),
//         max: Number(formData.salaryMax),
//       },
//     };

//     try {
//       if (editingJob) {
//         await axios.put(
//           `http://localhost:5000/api/jobs/${editingJob._id}`,
//           jobPayload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setAlertMsg("Job updated successfully");
//       } else {
//         await axios.post(`http://localhost:5000/api/jobs`, jobPayload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAlertMsg("Job added successfully");
//       }

//       setShowModal(false);
//       setFormData({
//         title: "",
//         description: "",
//         company: "",
//         location: "",
//         type: "",
//         salaryMin: "",
//         salaryMax: "",
//       });
//       setEditingJob(null);
//       fetchJobs();
//     } catch (err) {
//       console.error("Failed to save job", err);
//       setAlertMsg("Error saving job");
//     }
//   };

//   // Edit Job
//   const handleEdit = (job) => {
//     setEditingJob(job);
//     setFormData({
//       title: job.title,
//       description: job.description,
//       company: job.company,
//       location: job.location,
//       type: job.type,
//       salaryMin: job.salaryRange.min,
//       salaryMax: job.salaryRange.max,
//     });
//     setShowModal(true);
//   };

//   // Delete Job
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this job?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAlertMsg("Job deleted successfully");
//       fetchJobs();
//     } catch (err) {
//       console.error("Delete failed", err);
//       setAlertMsg("Failed to delete job");
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h2>Job Management</h2>

//       {alertMsg && <Alert variant="info">{alertMsg}</Alert>}

//       <Button className="mb-3" onClick={() => setShowModal(true)}>
//         + Add Job
//       </Button>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Company</th>
//             <th>Location</th>
//             <th>Type</th>
//             <th>Salary</th>
//             <th>Posted</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map((job) => (
//             <tr key={job._id}>
//               <td>{job.title}</td>
//               <td>{job.company}</td>
//               <td>{job.location}</td>
//               <td>{job.type}</td>
//               <td>
//                 ₹{job.salaryRange.min} - ₹{job.salaryRange.max}
//               </td>
//               <td>{new Date(job.postedDate).toLocaleDateString()}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   onClick={() => handleEdit(job)}
//                   className="me-2"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleDelete(job._id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingJob ? "Edit Job" : "Add Job"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-2">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 as="textarea"
//                 rows={3}
//                 required
//               />
//             </Form.Group>
//             <Row>
//               <Col>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Company</Form.Label>
//                   <Form.Control
//                     name="company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Location</Form.Label>
//                   <Form.Control
//                     name="location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Form.Group className="mb-2">
//               <Form.Label>Type</Form.Label>
//               <Form.Select name="type" value={formData.type} onChange={handleChange}>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Internship">Internship</option>
//               </Form.Select>
//             </Form.Group>
//             <Row>
//               <Col>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Salary Min</Form.Label>
//                   <Form.Control
//                     name="salaryMin"
//                     type="number"
//                     value={formData.salaryMin}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Salary Max</Form.Label>
//                   <Form.Control
//                     name="salaryMax"
//                     type="number"
//                     value={formData.salaryMax}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Button variant="primary" type="submit" className="mt-3 w-100">
//               {editingJob ? "Update Job" : "Add Job"}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Admin;




// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Row,
//   Col,
//   Container,
//   Alert,
// } from 'react-bootstrap';

// const Admin = () => {
//   const [jobs, setJobs] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     company: '',
//     location: '',
//     type: '',
//     salaryMin: '',
//     salaryMax: '',
//   });
//   const [editId, setEditId] = useState(null);
//   const [alert, setAlert] = useState('');
//   const token = localStorage.getItem('token');

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/jobs');
//       setJobs(res.data);
//     } catch (error) {
//       console.error('Error fetching jobs', error);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const openCreateModal = () => {
//     setFormData({
//       title: '',
//       description: '',
//       company: '',
//       location: '',
//       type: '',
//       salaryMin: '',
//       salaryMax: '',
//     });
//     setEditId(null);
//     setShowModal(true);
//   };

//   const openEditModal = (job) => {
//     setFormData({
//       title: job.title,
//       description: job.description,
//       company: job.company,
//       location: job.location,
//       type: job.type,
//       salaryMin: job.salaryRange.min,
//       salaryMax: job.salaryRange.max,
//     });
//     setEditId(job._id);
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const jobPayload = {
//       title: formData.title,
//       description: formData.description,
//       company: formData.company,
//       location: formData.location,
//       type: formData.type,
//       salaryRange: {
//         min: Number(formData.salaryMin),
//         max: Number(formData.salaryMax),
//       },
//     };

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/jobs/${editId}`, jobPayload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAlert('Job updated successfully!');
//       } else {
//         await axios.post(`http://localhost:5000/api/jobs`, jobPayload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAlert('Job created successfully!');
//       }
//       setShowModal(false);
//       setEditId(null);
//       fetchJobs();
//     } catch (err) {
//       console.error('Error saving job', err);
//       setAlert('Error saving job');
//     }
//   };

//   const deleteJob = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this job?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchJobs();
//       setAlert('Job deleted successfully');
//     } catch (err) {
//       console.error('Error deleting job', err);
//       setAlert('Failed to delete job');
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h2>Job Management System</h2>

//       {alert && <Alert variant="info">{alert}</Alert>}

//       <Button className="mb-3" onClick={openCreateModal}>
//         + Create Job
//       </Button>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Company</th>
//             <th>Location</th>
//             <th>Type</th>
//             <th>Salary</th>
//             <th>Posted</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map((job) => (
//             <tr key={job._id}>
//               <td>{job.title}</td>
//               <td>{job.company}</td>
//               <td>{job.location}</td>
//               <td>{job.type}</td>
//               <td>₹{job.salaryRange.min} - ₹{job.salaryRange.max}</td>
//               <td>{new Date(job.postedDate).toLocaleDateString()}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   className="me-2"
//                   onClick={() => openEditModal(job)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => deleteJob(job._id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? 'Edit Job' : 'Create Job'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-2">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Row>
//               <Col>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Company</Form.Label>
//                   <Form.Control
//                     value={formData.company}
//                     onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Location</Form.Label>
//                   <Form.Control
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-2">
//               <Form.Label>Type</Form.Label>
//               <Form.Select
//                 value={formData.type}
//                 onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                 required
//               >
//                 <option value="">Select Type</option>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Internship">Internship</option>
//               </Form.Select>
//             </Form.Group>

//             <Row>
//               <Col>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Salary Min</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={formData.salaryMin}
//                     onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Salary Max</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={formData.salaryMax}
//                     onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Button variant="primary" type="submit" className="w-100 mt-3">
//               {editId ? 'Update Job' : 'Create Job'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Admin;





import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Container,
  Alert,
  Spinner,
} from 'react-bootstrap';

const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    type: '',
    salaryMin: '',
    salaryMax: '',
  });
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState('');
  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/jobs?page=${page}&limit=${limit}`);
      setJobs(res.data);
      setHasMore(res.data.length === limit);
    } catch (error) {
      console.error('Error fetching jobs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const openCreateModal = () => {
    setFormData({
      title: '',
      description: '',
      company: '',
      location: '',
      type: '',
      salaryMin: '',
      salaryMax: '',
    });
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (job) => {
    setFormData({
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      type: job.type,
      salaryMin: job.salaryRange.min,
      salaryMax: job.salaryRange.max,
    });
    setEditId(job._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobPayload = {
      title: formData.title,
      description: formData.description,
      company: formData.company,
      location: formData.location,
      type: formData.type,
      salaryRange: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
      },
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/jobs/${editId}`, jobPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlert('Job updated successfully!');
      } else {
        await axios.post(`http://localhost:5000/api/jobs`, jobPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlert('Job created successfully!');
      }
      setShowModal(false);
      setEditId(null);
      fetchJobs();
    } catch (err) {
      console.error('Error saving job', err);
      setAlert('Error saving job');
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
      setAlert('Job deleted successfully');
    } catch (err) {
      console.error('Error deleting job', err);
      setAlert('Failed to delete job');
    }
  };

  const nextPage = () => {
    if (hasMore) setPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  return (
    <Container className="mt-4">
      <h2>Manage Jobs</h2>

      {alert && <Alert variant="info">{alert}</Alert>}

      <Button className="mb-3" onClick={openCreateModal}>
        + Create Job
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Type</th>
                <th>Salary</th>
                <th>Posted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td>₹{job.salaryRange.min} - ₹{job.salaryRange.max}</td>
                  <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(job)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={prevPage} disabled={page === 1}>
              ← Previous
            </Button>
            <span>Page {page}</span>
            <Button variant="primary" onClick={nextPage} disabled={!hasMore}>
              Next →
            </Button>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Job' : 'Create Job'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Salary Min</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Salary Max</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              {editId ? 'Update Job' : 'Create Job'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Admin;
