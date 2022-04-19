import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { Button, Divider, Form, Header, Label, Modal } from "semantic-ui-react";
import MyTextInput from "../../common/MyTextInput";
import * as Yup from 'yup';
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { UserFormValues } from "../../models/user";
import './loginForm.css';

interface Props{
    trigger: React.ReactNode
}

function LoginPage(props : Props){
    const [open, setOpen] = useState(false)
    const {orderItemStore} = useStore()
    const [isSubmitting, setSubmittingStatus] = useState(false);
    const {userStore} = useStore();

    const validationSchema = Yup.object({
        loginProp: Yup.string().notRequired().nullable(),
        password: Yup.string().required('The "password" field is required!'),
    })

    function handleLoginSubmit(values: UserFormValues, setErrors: any){
        setSubmittingStatus(true)
        if(values.tgUserName === "")
            values.tgUserName = null;            
        orderItemStore.orderItems = [];
        userStore.login(values)
                .catch(error => {
                    setSubmittingStatus(false);
                    setErrors({error: 'Invalid email or password'});
            })
    }

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={props.trigger}
            size="mini"
        >
            <Formik 
                validationSchema={validationSchema}
                initialValues ={{
                    tgUserName: '',
                    password: '',
                    error: null
                }}
                onSubmit={(initialValues, {setErrors}) => handleLoginSubmit(initialValues, setErrors)}
            >
            {({handleSubmit, errors, isValid, dirty}) => (
                <Form style={{padding: "10px"}} className="ui form" onSubmit={handleSubmit} autoComplete="off" size="large">
                    <Header as={'h2'} content="LOGIN" textAlign="center" color="teal"/>
                    <Divider/>
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
                        <MyTextInput name="tgUserName" placeholder="User name"/>
                        <MyTextInput  name = 'password' placeholder='Password' type='password'/>
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            fluid
                            positive
                            type='submit'
                        >
                            Login
                        </Button>
                </Form>
            )}
        </Formik>
      
    </Modal>
    )
}

export default observer(LoginPage);
