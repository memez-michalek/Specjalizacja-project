import react from 'react';
import { ReactDOM} from 'react';
//import Navigation from '../components/navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register(){
    return(
        <Form>
            <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="secondary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
export default Register
