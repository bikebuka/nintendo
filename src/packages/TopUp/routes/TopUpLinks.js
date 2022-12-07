import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const TopUpLinks=[
    {
        title: 'Top Up',
        path: '/merchant/dashboard/recharge',
        icon: getIcon('bi:box-arrow-in-up'),
    },
]
