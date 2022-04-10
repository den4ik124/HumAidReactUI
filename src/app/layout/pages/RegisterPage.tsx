import {  ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { Button,  Form, ButtonOr, Container, Loader, Label } from "semantic-ui-react";
import * as Yup from 'yup'
import { history } from "../../..";
import MyTextInput from "../../common/MyTextInput";
import { UserFormValues } from "../../models/user";
import { useStore } from "../../stores/store";

export default function RegisterPage(){

    const {userStore} = useStore();
    const [isSubmitting, setSubmittingStatus] = useState(false);

    const validationSchema = Yup.object({
        tgUserName: Yup.string().required('The "user name" field is required!'),
        phoneNumber: Yup.string().required('The "phone number" field is required!'),
        password: Yup.string().required('The "password" field is required!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],"Passwords must match").required('You should confirm your password!')
    })

    function handleRegisterSubmit(values: UserFormValues, setErrors: any){
        setSubmittingStatus(true)
        if(values.confirmPassword !== values.password){
            setErrors('Password and Confirm password not matched')
        } else {
            userStore.register(values)
                .catch(error => {
                    setErrors({error})
                    setSubmittingStatus(false)
                })
        }
    }

    function handleCancel(){
        history.push('/');
    }

    return(
        <Container>
            <Loader/>
            <Formik 
                validationSchema={validationSchema}
                initialValues ={{
                    tgUserName: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    error: null
                }}
                onSubmit={(initialValues, {setErrors}) => handleRegisterSubmit(initialValues, setErrors)}>
            {({handleSubmit, errors, isValid, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <ErrorMessage 
                    name="error"
                    render={() => 
                        <Label 
                            basic 
                            color="red"
                            style ={{marginBottom: 10}}
                            content={errors.error}
                        />
                    }
                />
                    <MyTextInput name="tgUserName" placeholder="TG User name"/>
                    <MyTextInput name="phoneNumber" placeholder="PhoneNumber"/>
                    <MyTextInput name="password" placeholder="Password"  type='password'/>
                    <MyTextInput name="confirmPassword" placeholder="Confirm password"  type='password'/>
                    <Button.Group fluid>
                        <Button  
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            positive color='black' 
                            type='submit'
                        >
                            Register
                        </Button>
                        <ButtonOr/>
                        <Button color='grey' type='button' onClick={handleCancel}>Cancel</Button>
                    </Button.Group>
                </Form>
            )}
        </Formik>
        </Container>
        
    )
}