import { Formik } from 'formik';
import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import { Url } from 'url';
import { Product } from '../../../models/product';
import { useStore } from '../../../stores/store';
import ProductModalForm from './ProductModalForm';

interface Props{
    trigger: React.ReactNode
    product: Product
    onApplyButtonClick : () => void
}

function EditProductItem({trigger, product, onApplyButtonClick}  : Props) {
  const [open, setOpen] = useState(false)
  const {productStore} = useStore();
    

function handleProductEditing(values: {
      id: string;
      title: string;
      count: number;
      countPerCustomer: number;
      photoUrl: Url;
      description: string;
      error: null;
    }, 
    setErrors: (errors: import("formik").FormikErrors<{ title: string; 
                                                        count: number; 
                                                        countPerCustomer: number;
                                                        description: string;
                                                        photoUrl: Url;
                                                        error: string | null; }>) => void){
      var product : Product = {
        id : values.id,
        title: values.title,
        count: values.count,
        countPerCustomer: values.countPerCustomer,
        photoUrl: values.photoUrl,
        description: values.description,
      } 
      if(values.count <= 0){
        var message = "Неверное количество";
      }
      productStore.editProduct(product)
      .catch(error => setErrors({error: `${message}`}));
      onApplyButtonClick()
      setOpen(false);
}

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Product editing</Modal.Header>
      <Modal.Content>
            <Formik 
                initialValues ={{
                    id: product.id, 
                    title: product.title,
                    count: product.count,
                    countPerCustomer: product.countPerCustomer,
                    photoUrl: product.photoUrl,
                    description: product.description,
                    error: null
            }}
            onSubmit={(initialValues, {setErrors}) => {
              handleProductEditing(initialValues, setErrors)}}
            >
            {({handleSubmit, isSubmitting, errors}) => (
              <ProductModalForm 
                handleSubmit={handleSubmit} 
                isSubmitting={isSubmitting}
                applyButtonContent={'Подтвердить изменения'}
                errors = {errors}
                />
            )}
        </Formik>

      </Modal.Content>
    </Modal>
  )

}

export default EditProductItem