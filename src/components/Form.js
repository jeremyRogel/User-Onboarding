import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const Forms = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status]);
    return (
       
       <div className="form">
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
            <Field type="email" name="email" placeholder="Email" />
            {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
            <Field type="password" name="password" palceholder="Password" />
            {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
            
            <label>
                Terms of Service
                <Field
                    type="checkbox"
                    name="termsOfService"
                    checked={values.termsOfService}
                />
            </label>
            <button>Submit</button>
        </Form>
        
        {users.map(user => (
            <div className="user-list">
            <div className="user-card">
               <p key={user.id}>{user.name}</p>
               <p key={user.id}>{user.email}</p>
               <p key={user.id}>{user.password}</p>
               </div>
             </div>
           ))}
           
           </div>
    );
};


    const FormikForm = withFormik({
        mapPropsToValues({ name, email, password, termsOfService }) {
            return {
                name: name || "",
                email: email || "",
                password: password || "",
                termsOfService: termsOfService || false,
            };
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("You must put a name, dude"),
            email: Yup.string().required("input that email, please!"),
            password:Yup.string().required("Come on! You need to put in a password")
        }),

        handleSubmit(values, {setStatus}) {
            axios.post(" https://reqres.in/api/users", values).then(res => {
                console.log(res);
                setStatus(res.data);
            });
        }
    })(Forms);
    console.log("This is the HOC", FormikForm)
    export default FormikForm;