export type UserType = {
    id: number;
    name: string;
    surname: string;
    email: string;
    //maybe number for key -> value pair
    role: string;
    status: boolean;
};

export type PermissionType = {
    id: number,
    label: string
}

export type PermissionsType = PermissionType & {
    children?: PermissionType[]
}

/* Permissions for each user is stored in the following format 
** userId + permissions object which contain keys of permission groups 
** each object contains array of allowed subgroup ids (empty if there are no children/nosub permissions)
*/
export type userPermissionsType = {
    userId: number
    permissions: {
        [key:string]: number[]
    }
}
