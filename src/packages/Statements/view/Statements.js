import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";
import {
    Autocomplete,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider, Grid, IconButton, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TextField, Toolbar, Tooltip, Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {appName} from "../../../core/environment/environment";
import FilterListIcon from "@mui/icons-material/FilterList";
import {getStatements} from "../store/StatementAction";
import {StyledTableCell, StyledTableRow} from "../../../shared/components/tables/TableStyle";
import Label from "../../../shared/components/Label";
import Page from "../../../shared/components/Page";
import {formatDate} from "../../../shared/utils/helper/helpers";
import AuthService from "../../../core/access-control/AuthService";
//

export default function Statements() {
    const {statements,pagination,loading} = useSelector(state => state.statementReducer)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //filter
    useEffect(() => {
        let payload={
            account_number: AuthService?.user?.customer_account_number,
            page:page+1,
            page_size:rowsPerPage
        }
        dispatch(getStatements(payload));
    }, [dispatch,page,rowsPerPage]);
    //
    //pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Page title="Account Transactions">
            <Container maxWidth={false}>
                <ToastContainer theme="colored"/>
                <Stack>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/">Dashboard</Link>
                        <Link underline="hover" color="inherit" to="#/">{appName}</Link>
                        <Typography color="text.primary">Transactions</Typography>
                    </Breadcrumbs>
                </Stack>
                <Divider />
                <Card sx={{mt:5}}>
                    <CardHeader
                        title={
                            <Button onClick={()=>navigate(-1)} color="error" variant="contained" size="small"><ArrowBackIcon/> <strong>Go Back</strong></Button>
                        }
                    />
                    <Divider sx={{mt:1}}/>
                    <CardContent>
                        <Toolbar
                            sx={{
                                pl: { sm: 2 },
                                pr: { xs: 1, sm: 1 },
                            }}
                        >
                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                variant="p"
                                id="tableTitle"
                                component="div"
                            >
                                Transactions
                            </Typography>

                            <Typography sx={{ flex: '1 1 100%' }}
                                        id="tableTitle"
                                        component="div"
                            >
                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={statements?.map((option) => option?.transaction_code)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Start typing..."
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                            </Typography>
                            <Tooltip title="Filter list">
                                <IconButton>
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                        <Stack sx={{m:2}}>
                            <Divider/>
                        </Stack>
                        <TableContainer sx={{ minWidth: 800 }}>
                            {
                                loading ?
                                    <Grid container sx={{justifyContent: 'center'}}> <SpinnerLoader/></Grid>
                                    :
                                    <Table>
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell>#S/N</StyledTableCell>
                                                <StyledTableCell>Created On</StyledTableCell>
                                                <StyledTableCell> Transaction Code</StyledTableCell>
                                                <StyledTableCell>Transaction Type</StyledTableCell>
                                                <StyledTableCell>Payment Type</StyledTableCell>
                                                <StyledTableCell>Points Earned</StyledTableCell>
                                                <StyledTableCell>To/From</StyledTableCell>
                                                <StyledTableCell>Amount (KES)</StyledTableCell>
                                                <StyledTableCell>Description</StyledTableCell>
                                                <StyledTableCell>Status</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>

                                            {statements ? statements.map((row,index) => {
                                                const { id,status, created_date, transaction_code,transaction_type_enum, amount,
                                                    description,payment_detail ,account_number,points} = row;
                                                const { payment_type} = payment_detail
                                                const {display_name}=account_number

                                                return (
                                                    <StyledTableRow
                                                        hover
                                                        key={id}
                                                        tabIndex={-1}
                                                        role="checkbox"
                                                    >

                                                        <TableCell align="left">{index+1}</TableCell>
                                                        <TableCell sizeSmall align="left">{formatDate(created_date)}</TableCell>
                                                        <TableCell sizeSmall align="left">{transaction_code}</TableCell>
                                                        <TableCell sizeSmall align="left">{transaction_type_enum===1? <><RadioButtonCheckedIcon fontSize="small" color="primary"/> Transaction In</> : <><RadioButtonCheckedIcon fontSize="small" color="error"/> Transaction Out</>}</TableCell>
                                                        <TableCell align="left">{payment_type['value']}</TableCell>
                                                        <TableCell align="left">{points}</TableCell>
                                                        <TableCell align="left">{display_name}</TableCell>
                                                        <TableCell align="left">{amount}</TableCell>
                                                        <TableCell align="left">{description}</TableCell>
                                                        <TableCell align="center">
                                                            {
                                                                status === 0 ?
                                                                    <Label variant="ghost" color='warning'>Pending</Label>
                                                                    : status === 1 ?
                                                                        <Label variant="ghost" color='success'>Success</Label>
                                                                        : status ===2 ?
                                                                            <Label variant="ghost" color='error'>Failed</Label> :
                                                                            <Label variant="ghost" color='success'>Success</Label>
                                                            }
                                                        </TableCell>
                                                    </StyledTableRow>
                                                )
                                            }) : <>No items found</>}
                                            {
                                                statements && statements.length <1 ? <>No transactions found </> : <></>
                                            }
                                        </TableBody>
                                    </Table>
                            }
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25,50]}
                            component="div"
                            count={pagination?.count}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            variant="outlined"
                            color="primary"
                        />
                    </CardContent>
                </Card>
            </Container>
        </Page>
    )
}
