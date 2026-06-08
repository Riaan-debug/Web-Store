import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { registrationSchema } from '../utils/validation';
import { register, setError } from '../redux/userSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Container style={{ maxWidth: 500, marginTop: 40 }}>
        <h1>Register</h1>
        <Formik
          initialValues={{
            firstName: '',
            surname: '',
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={registrationSchema}
          onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
            // Simulate checking if user exists (in real app, check backend)
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.username === values.username)) {
              dispatch(setError('Username already exists.'));
              setStatus('Username already exists.');
              setSubmitting(false);
              return;
            }
            const newUser = { ...values, id: uuidv4() };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            dispatch(register(newUser));
            setSuccess(true);
            setStatus(null);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="mb-3">
                <label>First Name</label>
                <Field name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Surname</label>
                <Field name="surname" className="form-control" />
                <ErrorMessage name="surname" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Username</label>
                <Field name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              {status && <Alert variant="danger">{status}</Alert>}
              {success && <Alert variant="success">Registration successful!</Alert>}
              <Button type="submit" disabled={isSubmitting} variant="primary">Register</Button>
            </Form>
          )}
        </Formik>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate('/store')}
          >
            Back to Store
          </button>
        </div>
      </Container>
    </>
  );
};

export default RegisterPage; 