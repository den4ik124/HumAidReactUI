import { observer } from 'mobx-react-lite';
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Category } from '../models/category';

function getCategoriesList(categories: Category[]){
var test = categories.map((category)=>(
  {
      key: category.id,
      text: category.name,
      value: category.name,
  }
));

    return categories.map((category)=>(
        {
            key: category.id,
            text: category.name,
            value: category.name,
        }
    ));
}

interface Props{
  categories : Category[]
}

const DropdownCategories = ({categories} : Props) => (
  <Dropdown
    placeholder='Выбери категорию товара'
    fluid
    selection
    options={getCategoriesList(categories)}
  />
)

export default observer(DropdownCategories)
