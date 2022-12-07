export default {
    CONFIRM_TOPUP: `waas/send/beneficiary-confirm/`,
    TOP_UP: `waas/load-account/`,
    QUERY_BENEFICIARY:({mobile_number})=> `waas/query/profile/?mobile_number=${mobile_number}`,
}
