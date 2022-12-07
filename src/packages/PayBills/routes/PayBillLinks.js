import Iconify from "../../../shared/components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const PayBillLinks=[
    {
        title: 'Pay Bills',
        path: '/merchant/dashboard/pay-bill',
        icon: getIcon('arcticons:bhim-sbi-pay'),
    },
]
