import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const UserLinks=[
    {
        title: 'Customers',
        path: '/admin/dashboard/Customers',
        icon: getIcon('raphael:customer'),
    },
]
