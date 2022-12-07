export default {
    STATEMENTS: ({page,page_size,account_number}) => `waas/user-transactions/?account_number=${account_number}&page=${page}&page_size=${page_size}`,
}
