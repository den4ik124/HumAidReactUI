import { ErrorMessage, Formik} from "formik";
import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Item,  Button, Label, Container, Form, Grid } from "semantic-ui-react";
import agent from "../../api/agent";
import MyTextInput from "../../common/MyTextInput";
import DeleteButton from "../../common/DeleteButton";
import { Role, RoleFormValues } from "../../models/role";
import { useStore } from "../../stores/store";
import LoadingComponent from "../components/LoadingComponents";
import EditButton from "../../common/EditButton";
import { GeneratedIdentifierFlags } from "typescript";
import { Category } from "../../models/category";

function RolesPage(){
    const {roleStore} = useStore();
    const {categoryStore} = useStore();
    const [roles, setRoles] = useState<Role[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [shouldUpdate, setUpdateList] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        roleStore.getRoles().then(() => {
            setRoles(roleStore.roles);
            setLoading(false);
            setUpdateList(false);
        })
        categoryStore.getCategories().then(() => {
            setCategories(categoryStore.categories);
            setLoading(false);
            setUpdateList(false);
        })
        // agent.Roles.list()

    }, [shouldUpdate])

     function handleRoleCreation (roleForm : RoleFormValues, setErrors: any){
        roleStore.createRole(roleForm)
        setUpdateList(true);
     }

    function handleRemoveRole(roleId : string){
        roleStore.removeRole(roleId);
        setUpdateList(true);
    }
    function handleCategoryCreation (categoryName : string, setErrors: any){
        categoryStore.createCategory(categoryName)
        setUpdateList(true);
     }

    function handleRemoveCategory(categoryId : number){
        categoryStore.removeCategory(categoryId);
        setUpdateList(true);
    }
    if(loading) return <LoadingComponent inverted={false} content="Loading roles..."/>

    return(
        <Grid columns={2}>
            <Grid.Column>
                <Fragment>
                    <Container>
                        <Formik 
                        initialValues={{
                            roleName : "",
                            error: null
                        }}
                        onSubmit={ (initialValues, {setErrors}) => handleRoleCreation(initialValues, setErrors)}>
                            {({handleSubmit, errors}) => (
                                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                                    <Form.Group width="equal">
                                        <MyTextInput name="roleName" placeholder="Role name" type="text"/>
                                        <Button  positive content="+ new role" type='submit'/>
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
                                    </Form.Group>
                                </Form>
                            )}
                        </Formik>
                    </Container>

                    <Item.Group divided unstackable>
                        {roles.map((role) => (
                            <Item key={role.name}>
                            <Item.Image size='tiny' src={`/sources/img/roles/${role.name}.png`} />
                
                            <Item.Content>
                                <Item.Header>
                                    {role.name}
                                    <Item.Extra>
                                        <DeleteButton name={role.id}  floated='right' onClick={() => handleRemoveRole(role.id)} />
                                        <EditButton floated='right' onClick={() => null}/>
                                    </Item.Extra>
                                </Item.Header>
                                <Item.Meta>Access description here</Item.Meta>
                                <Item.Extra>{role.description}</Item.Extra>
                            </Item.Content>
                            </Item>
                        ))}
                    </Item.Group>
                </Fragment>
            </Grid.Column>

            <Grid.Column>
            <Fragment>
                    <Container>
                        <Formik 
                        initialValues={{
                            categoryName : "",
                            error: null
                        }}
                        onSubmit={ (initialValues, {setErrors}) => handleCategoryCreation(initialValues.categoryName, setErrors)}>
                            {({handleSubmit, errors}) => (
                                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                                    <Form.Group width="equal">
                                        <MyTextInput name="categoryName" placeholder="Category name" type="text"/>
                                        <Button  positive content="+ new category" type='submit'/>
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
                                    </Form.Group>
                                </Form>
                            )}
                        </Formik>
                    </Container> 
                    <Item.Group divided unstackable>
                        {categories.map((category) => (
                            <Item key={category.name}>
                            <Item.Content>
                                <Item.Header>
                                    {category.name}
                                    
                                </Item.Header>
                                <Item.Extra>
                                        <DeleteButton name={category.name}  floated='right' onClick={() => handleRemoveCategory(category.id)} />
                                        <EditButton floated='right' onClick={() => null}/>
                                    </Item.Extra>
                            </Item.Content>
                            </Item>
                        ))}
                    </Item.Group>
            </Fragment>

            </Grid.Column>
        </Grid>
        
    )
}

export default observer(RolesPage);