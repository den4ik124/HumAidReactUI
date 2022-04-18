import { observer } from "mobx-react-lite"
import React, { Fragment, useEffect, useState } from "react"
import { Item } from "semantic-ui-react"
import agent from "../../api/agent";
import { User } from "../../models/user";
import LoadingComponent from "../components/LoadingComponents";
import UserListItem from "../components/UserListItem";

function UsersPage(){

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [listState, setUpdateItems] = useState(false);

    useEffect(() => {
        agent.Users.list().then(response => {
            setUsers(response);
          setLoading(false);
          setUpdateItems(false);
        })
    }, [listState])


    if(loading) return <LoadingComponent content="Loading users..."/>

    return(
        <Fragment>
        <Item.Group divided unstackable>
            {users.map((user) => (
                <UserListItem key={user.token} user={user} onStateChanged={() => setUpdateItems(true)} />
            ))}
        </Item.Group>
    </Fragment>
    )
}

export default observer(UsersPage)
