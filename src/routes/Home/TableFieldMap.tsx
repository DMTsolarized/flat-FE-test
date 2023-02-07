import { TableFieldMapType } from "Types/TableFieldMapType";

export const TableFieldMap: TableFieldMapType[] = [
    {
        label: 'user',
        sortable: true,
        fields: ['name,surname', 'email'],
        id: 'name'
    },
    {
        label: 'role',
        sortable: true,
        fields: ['role'],
        id: 'role'

    },
    {
        label: 'status',
        sortable: true,
        fields: ['status'],
        id: 'status'
    },
]