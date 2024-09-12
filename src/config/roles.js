const allroles = {
    user : ['read'],
    teacher : ['create', 'read', 'update', 'delete'],
    superAdmin : ['create', 'read', 'update', 'delete', 'assignRoles']
}

const roles = Object.keys(allroles);
const rolesRights = new Map(Object.entries(allroles));

module.exports = {
    roles,
    rolesRights
}
