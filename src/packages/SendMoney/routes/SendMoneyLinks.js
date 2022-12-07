import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const SendMoneyLinks=[
    {
        title: 'Send Money',
        path: '/merchant/dashboard/send-money',
        icon: getIcon('fa6-solid:wallet'),
    },
]
