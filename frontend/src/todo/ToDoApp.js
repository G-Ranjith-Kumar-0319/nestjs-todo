import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { AiOutlineFile } from "react-icons/ai";
import Row from 'react-bootstrap/Row';
import { MdDelete } from "react-icons/md";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { IoIosAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';

const ToDoApp = () => {
  const notify = (text) => toast(text);
  const [inputValue, setInputValue] = useState({ title: '' })
  const [apiData, setApiData] = useState([])
  const onchangehandle = (e) => {
    let inputvalueget = { title: e.target.value };
    setInputValue(inputvalueget)
  }
  const [target, setTarget] = useState(false);

  const onSubmitHandler = () => {
    inputValue?.title !== '' ?
      axios.post('http://localhost:3000/todo', inputValue).then((res) => { setInputValue({ title: '' })}).then(()=> notify("Added Successfully.."))
      : notify("Value should be there in input box");
  }

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure do you want to Delete?")) {
      axios.delete(`http://localhost:3000/todo/${id}`).then(() => { notify("deleted...!"); setTarget((prev) => !prev) })
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then((res) => setApiData(res.data))
  }, [target, setTarget])

  

  return (
    <>
      <section className='container mt-5'>
        <div className='row'>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Col sm={10}>
                <Form.Control type="text" placeholder='Add the item Here...' value={inputValue.title} onChange={onchangehandle} required />
              </Col>
              <Col sm={2}>
                <Button type="submit" onClick={onSubmitHandler} className='btn btn-success w-100'>Add <IoIosAddCircle/> </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>

        <div>
          <Card style={{ width: '100%' }}>
            <Card.Header className='bg-default text-success'><h5>Todo List</h5></Card.Header>
            <ListGroup variant="primary">
              {
                apiData.map((item, index) => {
                  return <ListGroup.Item key={index} className='d-flex justify-content-between'><AiOutlineFile /> {item.title} <span style={{ cursor: 'pointer' }} onClick={() => deleteHandle(item.id)}><MdDelete className='text-danger' /></span></ListGroup.Item>
                }
                )}
            </ListGroup>
          </Card>
          <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        </div>
      </section>
    </>
  );
}

export default ToDoApp;
