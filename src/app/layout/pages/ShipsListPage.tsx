import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import agent from "../../api/agent";
import { Ship } from "../../models/ship";
import LoadingComponent from "../components/LoadingComponents";

function ShipList(){
    const [ships, setShips] = useState<Ship[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Ships.list().then(response => {
          setShips(response);
          setLoading(false);
        })
    }, [])


    if(loading) return <LoadingComponent content="Loading ships"/>

    return(
    <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >Id</Table.HeaderCell>
            <Table.HeaderCell>Velocity</Table.HeaderCell>
            <Table.HeaderCell>Size</Table.HeaderCell>
            <Table.HeaderCell>Range</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {ships.map((ship: Ship) => (
          <Table.Row key={ship.id}>
            <Table.Cell>
                {ship.id}
            </Table.Cell>
            
            <Table.Cell>
                {ship.velocity}
            </Table.Cell>
            <Table.Cell>
                {ship.size}
            </Table.Cell>
            <Table.Cell>
                {ship.range}
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
      </Table>
    )
}

export default  observer(ShipList);