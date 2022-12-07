export default {
    CONFIRM_SEND_MONEY: `waas/send/beneficiary-confirm/`,
    SEND_MONEY: `waas/send/beneficiary/`,
    QUERY_BENEFICIARY:({recipient_account_number})=> `waas/query/profile/?mobile_number=${recipient_account_number}`,
}
