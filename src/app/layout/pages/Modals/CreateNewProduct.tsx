import { Formik } from 'formik';
import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import { useStore } from '../../../stores/store';
import ProductModalForm from './ProductModalForm';

interface Props{
    trigger: React.ReactNode
    updateList : () => void
}

function CreateNewProductModal(props : Props) {
  const [open, setOpen] = useState(false)
  const {productStore} = useStore();

    
function handleNewProductCreation( values : any,
    setErrors: (errors: import("formik")
               .FormikErrors<{ title: string; 
                                count: number; 
                                countPerCustomer: number, 
                                description: string; 
                                error: string | null; }>) => void): any {
        if(values.count <= 0 || values.countPerCustomer <= 0){
          var message = "Неверное количество товара";
        }
        props.updateList();
        productStore.createProduct(values)
          .catch(error => setErrors({error: message}));
        setOpen(false);
}

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
    >
      <Modal.Header>Создаем новый продукт</Modal.Header>
      <Modal.Content>
            <Formik 
                initialValues ={{
                    id: '', 
                    title: '',
                    count: '',
                    countPerCustomer: '',
                    description: '',
                    category: {id : 0},
                    error: null
                }}
            onSubmit={(initialValues, {setErrors}) => handleNewProductCreation(initialValues, setErrors)}
            >
            {({handleSubmit, isSubmitting, errors}) => (
              <ProductModalForm 
                handleSubmit={handleSubmit} 
                isSubmitting={isSubmitting}
                applyButtonContent={'Создать'}
                errors = {errors}
                />
            )}
        </Formik>

      </Modal.Content>
    </Modal>
  )

}

export default CreateNewProductModal