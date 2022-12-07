export default {
    PAY_BILL: `waas/lipa-bill/`,
    QUERY_BENEFICIARY:({sasapay_paybill_number})=> `waas/query/paybill/?paybill_number=${sasapay_paybill_number}`,
}
