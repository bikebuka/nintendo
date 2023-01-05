import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const UserLinks=[
    {
        title: 'Users',
        path: '/admin/dashboard/users',
        icon: getIcon('ph:users-three-bold'),
    },
]
