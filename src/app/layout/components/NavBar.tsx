import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Label, Menu, MenuItemProps } from "semantic-ui-react";
import { useStore } from "../../stores/store";

function NavBar(){
    const {userStore: {user, logout}} = useStore();
    const {orderItemStore} = useStore();

    const [state, setState] = useState<string | undefined>('');

    function handleItemClick(e : any, itemProps : MenuItemProps){
        setState(itemProps.name);
    }

    const orderItemsCount = orderItemStore.orderItems.length;

    function renderUserName(){
        var login = `Welcome back ${user!.userName}`;
        if(user!.roles.includes('Admin')){
            return <Label content={login} color='green' size='large'/>    
        }
        else if(user!.roles.includes('Manager')){
            return <Label content={login} color='yellow' size='large'/>    
        }
        else{
            return login;
        }
    }

    useEffect(()=> {
    }, [orderItemsCount])

    return(
        <>
        <Menu inverted pointing secondary style={{marginTop : "0px"}} >
            <Container>
                <Menu.Item as={NavLink} to='/' exact content='Home' name='home' active={state==='home'} onClick={(e, name) => handleItemClick(e, name)}/>
                    
                    { user != null ? (
                    <>
                        <Menu.Item as={NavLink} to='/Products' content="Products" name='products' active={state==='products'} onClick={(e, name) => handleItemClick(e, name)}/>
                        {user != null && user.roles.includes('Admin') ? (
                            <Dropdown pointing text="Admins" className="link item" >
                                <Dropdown.Menu>
                                    <Dropdown.Item as={NavLink} to='/admin/roles' name='Roles' content="Roles (admins only)" />
                                    <Dropdown.Item as={NavLink} to='/admin/users' name='Users' content="Users (admins only)" />
                                    <Dropdown.Item as={NavLink} to='/admin/errors' name='Errors' content="Errors (admins only)" />
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : null}
                    </>
                    ) : null}

                    
                {user != null ? (
                    <>
                        <Menu.Item  position="right" content={renderUserName()}/>
                        {orderItemsCount > 0 ? (
                        <>
                        <Menu.Item 
                            name = 'cart'
                            as={NavLink} to='/ProductCart'>
                            <Icon name="shopping cart"/>
                                {orderItemsCount}
                        </Menu.Item>
                        </>) : null}
                        <Menu.Item as={Button} to='/' animated='fade' onClick={logout}>
                                <Button.Content visible>
                                    <Icon name="log out" size="large"/>
                                </Button.Content>
                                <Button.Content hidden>Logout</Button.Content>
                        </Menu.Item>
                    </>
                ) : null}
            </Container>
        </Menu>
        </>

    );
}

export default observer(NavBar);