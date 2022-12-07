import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const StatementLinks=[
    {
        title: 'Statement',
        path: '/merchant/dashboard/account-statements',
        icon: getIcon('eva:list-outline'),
    },
]
