// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     Container, Row, Col, Card, Button, Form,
//     Modal, Toast, ToastContainer
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Candidate = () => {
//     const [jobs, setJobs] = useState([]);
//     const [filters, setFilters] = useState({
//         location: "",
//         type: "",
//         keyword: "",
//         minSalary: "",
//         maxSalary: ""
//     });

//     const [showModal, setShowModal] = useState(false);
//     const [selectedJob, setSelectedJob] = useState(null);
//     const [resumeLink, setResumeLink] = useState('');
//     const [coverLetter, setCoverLetter] = useState('');
//     const [message, setMessage] = useState('');
//     const [showToast, setShowToast] = useState(false);

//     const [page, setPage] = useState(1);
//     const [limit] = useState(6);
//     const [hasMore, setHasMore] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();
//     const role = localStorage.getItem("role");

//     const fetchJobs = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/api/jobs", {
//                 params: { ...filters, page, limit },
//             });
//             setJobs(res.data);
//             setHasMore(res.data.length === limit);
//         } catch (err) {
//             console.error('Error fetching jobs:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (role !== "candidate") {
//             navigate("/");
//         } else {
//             fetchJobs();
//         }
//     }, [filters, page]);

//     const handleOpenModal = (job) => {
//         setSelectedJob(job);
//         setShowModal(true);
//     };

//     const handleClose = () => {
//         setShowModal(false);
//         setResumeLink('');
//         setCoverLetter('');
//         setMessage('');
//     };

//     const handleApply = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post(
//                 'http://localhost:5000/api/applications/apply',
//                 {
//                     jobId: selectedJob._id,
//                     resumeLink,
//                     coverLetter
//                 },
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             setShowToast(true);
//             handleClose();
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Application failed.');
//         }
//     };

//     const handleFilterChange = (e) => {
//         setFilters((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//         setPage(1); // Reset to page 1 when filter changes
//     };

//     return (
//         <Container className="mt-5">
//             <h3 className="mb-4 text-center">Job Listings</h3>

//             <Form className="mb-4">
//                 <Row className="g-2">
//                     <Col md={3}>
//                         <Form.Control
//                             type="text"
//                             placeholder="Keyword (title/description)"
//                             value={filters.keyword}
//                             onChange={handleFilterChange}
//                         />
//                     </Col>
//                     <Col md={2}>
//                         <Form.Control
//                             type="text"
//                             placeholder="Location"
//                             value={filters.location}
//                             onChange={handleFilterChange}
//                         />
//                     </Col>
//                     <Col md={2}>
//                         <Form.Select
//                             value={filters.type}
//                             onChange={handleFilterChange}
//                         >
//                             <option value="">Job Type</option>
//                             <option value="Full-time">Full-time</option>
//                             <option value="Part-time">Part-time</option>
//                             <option value="Internship">Internship</option>
//                         </Form.Select>
//                     </Col>
//                     <Col md={2}>
//                         <Form.Control
//                             type="number"
//                             placeholder="Min Salary"
//                             value={filters.minSalary}
//                             onChange={handleFilterChange}
//                         />
//                     </Col>
//                     <Col md={2}>
//                         <Form.Control
//                             type="number"
//                             placeholder="Max Salary"
//                             value={filters.maxSalary}
//                             onChange={handleFilterChange}
//                         />
//                     </Col>
//                     <Col md={1}>
//                         <Button variant="primary" onClick={fetchJobs}>Search</Button>
//                     </Col>
//                 </Row>
//             </Form>


//             {loading ? (
//                 <div className="text-center my-5">
//                     <span className="spinner-border text-primary"></span>
//                 </div>
//             ) : (

//                 <Row xs={1} md={2} lg={3} className="g-4">
//                     {jobs.map((job) => (
//                         <Col key={job._id}>
//                             <Card>
//                                 <Card.Body>
//                                     <Card.Title>{job.title}</Card.Title>
//                                     <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
//                                     <Card.Text>{job.description.substring(0, 100)}...</Card.Text>
//                                     <ul className="list-unstyled mb-2">
//                                         <li><strong>Location:</strong> {job.location}</li>
//                                         <li><strong>Type:</strong> {job.type}</li>
//                                         <li><strong>Salary:</strong> ₹{job.salaryRange.min} - ₹{job.salaryRange.max}</li>
//                                     </ul>
//                                     <Button variant="success" onClick={() => handleOpenModal(job)}>
//                                         Apply
//                                     </Button>
//                                 </Card.Body>
//                                 <Card.Footer>
//                                     <small className="text-muted">
//                                         Posted on: {new Date(job.postedDate).toLocaleDateString()}
//                                     </small>
//                                 </Card.Footer>
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             )}

//             <Modal show={showModal} onHide={handleClose} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Apply for {selectedJob?.title}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleApply}>
//                         <Form.Group className="mb-3" controlId="resumeLink">
//                             <Form.Label>Resume Link</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={resumeLink}
//                                 onChange={(e) => setResumeLink(e.target.value)}
//                                 placeholder="Enter resume link"
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="coverLetter">
//                             <Form.Label>Cover Letter</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={4}
//                                 value={coverLetter}
//                                 onChange={(e) => setCoverLetter(e.target.value)}
//                                 placeholder="Write your cover letter"
//                                 required
//                             />
//                         </Form.Group>

//                         {message && <div className="alert alert-danger">{message}</div>}

//                         <Button variant="primary" type="submit">
//                             Submit Application
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>

//             <div className="d-flex justify-content-between align-items-center mt-4">
//                 <Button variant="secondary" disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
//                     ← Previous
//                 </Button>
//                 <span>Page {page}</span>
//                 <Button variant="primary" disabled={!hasMore} onClick={() => setPage((prev) => prev + 1)}>
//                     Next →
//                 </Button>
//             </div>

//             <ToastContainer position="top-center" className="p-3">
//                 <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
//                     <Toast.Body>Applied successfully!</Toast.Body>
//                 </Toast>
//             </ToastContainer>

//         </Container>
//     );
// };

// export default Candidate;




import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container, Row, Col, Card, Button, Form,
    Modal, Toast, ToastContainer
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Candidate = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        location: "",
        type: "",
        keyword: "",
        minSalary: "",
        maxSalary: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [resumeLink, setResumeLink] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const fetchJobs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/jobs", {
                params: {
                    ...filters,
                    minSalary: filters.minSalary || undefined,
                    maxSalary: filters.maxSalary || undefined,
                },
            });
            setJobs(res.data);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
        }
    };

    useEffect(() => {
        if (role !== "candidate") {
            navigate("/");
        } else {
            fetchJobs(); 
        }
    }, []); 

    const handleOpenModal = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setResumeLink('');
        setCoverLetter('');
        setMessage('');
    };

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/applications/apply',
                {
                    jobId: selectedJob._id,
                    resumeLink,
                    coverLetter
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setShowToast(true);
            handleClose();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Application failed.');
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="mb-4 text-center">Job Listings</h3>

            <Form className="mb-4">
                <Row className="g-2">
                    <Col md={3}>
                        <Form.Control
                            type="text"
                            placeholder="Keyword (title/description)"
                            value={filters.keyword}
                            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="text"
                            placeholder="Location"
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="">Job Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Internship">Internship</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="number"
                            placeholder="Min Salary"
                            value={filters.minSalary}
                            onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="number"
                            placeholder="Max Salary"
                            value={filters.maxSalary}
                            onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
                        />
                    </Col>
                    <Col md={1}>
                        <Button variant="primary" onClick={fetchJobs}>Search</Button>
                    </Col>
                </Row>
            </Form>

            <Row xs={1} md={2} lg={3} className="g-4">
                {jobs.map((job) => (
                    <Col key={job._id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                <Card.Text>{job.description.substring(0, 100)}...</Card.Text>
                                <ul className="list-unstyled mb-2">
                                    <li><strong>Location:</strong> {job.location}</li>
                                    <li><strong>Type:</strong> {job.type}</li>
                                    <li><strong>Salary:</strong> ₹{job.salaryRange.min} - ₹{job.salaryRange.max}</li>
                                </ul>
                                <Button variant="success" onClick={() => handleOpenModal(job)}>
                                    Apply
                                </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Posted on: {new Date(job.postedDate).toLocaleDateString()}
                                </small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Apply for {selectedJob?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleApply}>
                        <Form.Group className="mb-3" controlId="resumeLink">
                            <Form.Label>Resume Link</Form.Label>
                            <Form.Control
                                type="text"
                                value={resumeLink}
                                onChange={(e) => setResumeLink(e.target.value)}
                                placeholder="Enter resume link"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="coverLetter">
                            <Form.Label>Cover Letter</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                placeholder="Write your cover letter"
                            />
                        </Form.Group>

                        {message && <div className="alert alert-danger">{message}</div>}

                        <Button variant="primary" type="submit">
                            Submit Application
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Body>Applied successfully!</Toast.Body>
                </Toast>
            </ToastContainer>

        </Container>
    );
};

export default Candidate;
