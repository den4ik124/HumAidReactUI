import React, { useEffect, useState } from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import axios from 'axios';
import ValidationErrors from './ValidationErrors';
import { observer } from 'mobx-react-lite';

function TestErrors() {
    const baseUrl = 'http://localhost:5000/'
    //const baseUrl = "https://humanitarianaidapi.azurewebsites.net"

    // const [errors, setErrors] = useState(['testError1', 'testError2', 'testError3']);
    const [errors, setErrors] = useState(null);

    useEffect(()=>(
        console.log(errors)
    ), [errors])

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'Shop/notaguid').catch(err => setErrors(err));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'Shop', {}).catch( err  => setErrors(err)) 
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' primary inverted />
                    <Button onClick={handleBadRequest} content='Bad Request' primary inverted />
                    <Button onClick={handleServerError} content='Server Error' primary inverted />
                    <Button onClick={handleUnauthorised} content='Unauthorised' primary inverted />
                    <Button onClick={handleBadGuid} content='Bad Guid' primary inverted />
                    <Button onClick={handleValidationError} content='Validation Error' primary inverted />
                </Button.Group>
            </Segment>
            {errors && 
            <ValidationErrors errors={errors}/>
            }
        </>
    )
}

export default observer(TestErrors);
