import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const TransferMoneyLinks=[
    {
        title: 'Transfer Money',
        path: '/merchant/dashboard/transfer-money',
        icon: getIcon('ci:transfer'),
    },
]
