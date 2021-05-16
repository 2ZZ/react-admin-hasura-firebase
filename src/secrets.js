import React from 'react';
import {
    Filter,
    List,
    Edit,
    Create,
    Datagrid,
    Button,
    TextField,
    ReferenceField,
    DateField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton,
    PasswordInput
} from 'react-admin';

const SecretFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="title@_ilike,notes@_ilike,username_@ilike" alwaysOn />
    </Filter>
);

export const SecretList = props => (
    <List filters={<SecretFilter />} bulkActionButtons={false} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="Secret Id" />
            <TextField source="title" />
            <TextField source="username" />
            <DateField showTime source="created_at" />
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
            <TextInput source="title" />
            <TextInput source="username" />
            <PasswordInput source="password" />
            <TextInput multiline source="notes" />
        </SimpleForm>
    </Edit>
);

export const SecretCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="username" />
            <PasswordInput source="password" />
            <TextInput multiline source="notes" />
            <ReferenceInput source="user_id" reference="users" defaultValue={localStorage.getItem('user.uid')}>
                <SelectInput optionText="email" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);