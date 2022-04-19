import { ErrorMessage, FormikErrors } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, Icon, Label, Modal } from 'semantic-ui-react'
import MyTextArea from '../../../common/MyTextArea';
import MyTextInput from '../../../common/MyTextInput';
import DropdownCategories from '../../../features/DropdownCategories';
import { Category } from '../../../models/category';
import { useStore } from '../../../stores/store';
import * as Yup from 'yup'

interface Props{
    disabled: boolean;
    isSubmitting : boolean;
    handleSubmit : (arg1 : React.FormEvent<HTMLFormElement> | undefined) => void
    applyButtonContent: any
    errors: FormikErrors<{id: string;
                          title: string;
                          count: number;
                          description: string;
                          error: null;}>
  }

function ProductModalForm({handleSubmit,disabled, isSubmitting, applyButtonContent, errors} : Props) {
  const [open, setOpen] = useState(false)
  const {categoryStore} = useStore();
  const [categories, setCategories] = useState<Category[]>([]);

  // const validationSchema = Yup.object({
  //   tgUserName: Yup.string().required('The "user name" field is required!'),
  //   phoneNumber: Yup.string().required('The "phone number" field is required!'),
  //   password: Yup.string().required('The "password" field is required!'),
  //   confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],"Passwords must match").required('You should confirm your password!')
  // })


  useEffect(()=> {
    categoryStore.getCategories().then(()=>{
      setCategories(categoryStore.categories)
    });
  },[])

  return (
    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" size="large">
        <MyTextInput name = 'title' placeholder='Название товара' type='text'/>
        <Grid columns={2}>
          <Grid.Column>
            <MyTextInput name = 'count' placeholder='Количество' type='number'/>
          </Grid.Column>
          <Grid.Column>
            <MyTextInput name = 'countPerCustomer' placeholder='На руки человеку' type='number'/>
          </Grid.Column>
        </Grid>
        <MyTextArea name = 'description' rows={5} placeholder='Описание' type='text'/>
        <DropdownCategories categories={categories}/>
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
        {renderModalButtons(isSubmitting,disabled, applyButtonContent)}
    </Form>
  )

  function renderModalButtons(isSubmitting: boolean,disabled : boolean ,buttonContent: any) {
    return <Modal.Actions style={{ marginTop: '20px' }}>
            <Button color='black' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              loading={isSubmitting}
              labelPosition='right'
              icon
              positive
              disabled={disabled}
              type='submit'>
              <Icon name='checkmark' />
              {buttonContent}
            </Button>
          </Modal.Actions>;
  }
}

export default ProductModalForm