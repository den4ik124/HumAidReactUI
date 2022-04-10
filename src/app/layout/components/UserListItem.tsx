import _ from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, DropdownProps, Icon, Item, Label } from "semantic-ui-react";
import agent from "../../api/agent";
import DeleteButton from "../../common/DeleteButton";
import EditButton from "../../common/EditButton";
import { Role } from "../../models/role";
import { User } from "../../models/user";
import { useStore } from "../../stores/store";

interface Props{
    user : User
    onStateChanged : () => void
}

function UserListItem( {user, onStateChanged} : Props){
    const [roles, setRoles] = useState<Role[]>([]);
    const {userStore} = useStore();
    
    var userRolesNames: string [] = []
    var userRoles: Role [] = []

    useEffect(() => {
        agent.Roles.list().then(response => {
            userRoles = response.filter(item => !user.roles.includes(item.name));
            setRoles(userRoles);
        })
    }, [])

    const stateOptions = _.map(roles, (role, index) => ({
        key: role.id,
        text: role.name,
        value: role.name,
      }))

    if(userStore.isLoggedIn){
        var loggedUser =  userStore.user;
    }

    function handleRolesAdding(){
        onStateChanged();
        agent.Users.addRoles(user.userName, userRolesNames);
    }

    function handleRemoveRole(role : string[]){
        onStateChanged();
        const index = user.roles.indexOf(role[0]);
        if(index > -1){
            user.roles.slice(index,1)
            agent.Users.removeRole(user.userName, role);
        }
    }

    function handleDropDownSelect(
        event: React.SyntheticEvent<HTMLElement, Event>, 
        data : DropdownProps){
            userRolesNames = data.value as string[];
       };

    return(
            <Item>
                <Item.Image size='tiny' src={`/sources/img/userLogo/defaultUser.png`} />
                <Item.Content>
                    <Item.Header>
                        {user.userName}
                    </Item.Header>
                
                    <Item.Extra>
                        <>
                            <Label content={user.userName} />
                            {user.roles.map((role) => (
                                <Label key={role} color="teal" content= {`${role} `} onRemove={() => handleRemoveRole([role])}
                                />
                            ))}
                        </>

                    {loggedUser!.roles.includes("Admin") ? (
                        <>
                        <span>
                            <Button icon={<Icon name = 'plus'/>} onClick={() => handleRolesAdding()}/>
                            <Dropdown 
                            id={user.userName}
                            style={{maxWidth: '200px'}}
                            floating 
                            placeholder='Select role'
                            multiple 
                            selection  
                            options={stateOptions}
                            onChange={(e, data) => handleDropDownSelect(e, data)}
                            />
                            <DeleteButton name={user.userName}  floated="right" onClick={() => null}/>
                            <EditButton floated='right' onClick={() => null}/>
                        </span>
                        </>
                        ) : null}
                    </Item.Extra>
                </Item.Content>
            </Item>
    )
}


export default observer(UserListItem);
