import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const WithdrawMoneyLinks=[
    {
        title: 'Withdraw Money',
        path: '/merchant/dashboard/withdraw-money',
        icon: getIcon('uil:money-withdraw'),
    },
]
