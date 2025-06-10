import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { loginSchema } from '../utils/validation';
import { login, setError } from '../redux/userSlice';
import { Button, Container, Alert } from 'react-bootstrap';
import BackToTop from '../components/BackToTop';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = React.useState(false);
  const [showReset, setShowReset] = React.useState(false);
  const [resetStatus, setResetStatus] = React.useState(null);
  const navigate = useNavigate();

  const handlePasswordReset = (values, { setSubmitting, resetForm }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.username === values.username);
    if (userIndex === -1) {
      setResetStatus({ type: 'danger', msg: 'Username not found.' });
      setSubmitting(false);
      return;
    }
    users[userIndex].password = values.newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    setResetStatus({ type: 'success', msg: 'Password reset successful! You can now log in.' });
    resetForm();
    setSubmitting(false);
    setTimeout(() => {
      setShowReset(false);
      setResetStatus(null);
    }, 2000);
  };

  return (
    <>
      <Container style={{ maxWidth: 500, marginTop: 40 }}>
        <h1>Login</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(
              u => u.username === values.username && u.password === values.password
            );
            if (!foundUser) {
              dispatch(setError('User not found or password incorrect.'));
              setStatus('User not found or password incorrect.');
              setSubmitting(false);
              return;
            }
            dispatch(login(foundUser));
            setSuccess(true);
            setStatus(null);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, status, values }) => (
            <Form>
              <div className="mb-3">
                <label>Username</label>
                <Field name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              {status && <Alert variant="danger">{status}</Alert>}
              {success && <Alert variant="success">Login successful!</Alert>}
              <Button type="submit" disabled={isSubmitting} variant="primary">Login</Button>
              {!success && (
                <div style={{ marginTop: 10 }}>
                  <Button variant="link" onClick={() => setShowReset(true)} style={{ padding: 0 }}>
                    Forgot password?
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
        {showReset && (
          <div style={{ marginTop: 30 }}>
            <h5>Reset Password</h5>
            <Formik
              initialValues={{ username: '', newPassword: '' }}
              validate={values => {
                const errors = {};
                if (!values.username) errors.username = 'Username is required';
                if (!values.newPassword) errors.newPassword = 'New password is required';
                else if (values.newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters';
                return errors;
              }}
              onSubmit={handlePasswordReset}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-2">
                    <label>Username</label>
                    <Field name="username" className="form-control" />
                    <ErrorMessage name="username" component="div" className="text-danger" />
                  </div>
                  <div className="mb-2">
                    <label>New Password</label>
                    <Field name="newPassword" type="password" className="form-control" />
                    <ErrorMessage name="newPassword" component="div" className="text-danger" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} variant="warning">Reset Password</Button>
                  <Button variant="link" onClick={() => { setShowReset(false); setResetStatus(null); }} style={{ padding: 0, marginLeft: 10 }}>
                    Cancel
                  </Button>
                  {resetStatus && <Alert variant={resetStatus.type} style={{ marginTop: 10 }}>{resetStatus.msg}</Alert>}
                </Form>
              )}
            </Formik>
          </div>
        )}
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
      <BackToTop />
    </>
  );
};

export default LoginPage; 