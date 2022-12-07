import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const DashboardLinks=[
    {
        title: 'Products',
        path: '/dashboard/app',
        icon: getIcon('dashicons:products'),
    },
]
