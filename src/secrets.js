import React from 'react';
import {
    Filter,
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    ReferenceField,
    DateField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton
} from 'react-admin';

const SecretFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by Title" source="title" alwaysOn />
    </Filter>
);

export const SecretList = props => (
    <List filters={<SecretFilter />} bulkActionButtons={false} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="Secret Id" />
            <TextField source="title" />
            <TextField source="username" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

const SecretTitle = ({ record }) => {
    return <span>Secret: {record ? `${record.title}` : ''}</span>;
};

const SecretEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} label="Back" />
    </TopToolbar>
);

export const SecretEdit = props => (
    <Edit title={<SecretTitle />} actions={<SecretEditActions />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" label="Secret Id" />
            <TextInput source="title" />
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="notes" />
        </SimpleForm>
    </Edit>
);

export const SecretCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="notes" />
            <ReferenceInput source="user_id" reference="users">
                <SelectInput optionText="email" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);