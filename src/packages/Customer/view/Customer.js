import React, { PureComponent } from 'react';
import {
    Badge,
    Breadcrumbs,
    Button,
    Card,
    CardContent, CardHeader,
    Divider,
    Grid, IconButton,
    Link, Menu, MenuItem, Table, TableBody,
    TableContainer, TableHead, TablePagination, Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ConstructionRounded } from '@mui/icons-material';

import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

 
  
// import PopupState, { bindTrigger } from "material-ui-popup-state";
 

import { useDispatch, useSelector } from "react-redux";
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import Page from "../../../shared/components/Page";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";

import { ToastContainer } from "react-toastify";
import { StyledTableCell, StyledTableRow } from "../../../shared/tables/TableStyle";
//
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
// import { getUsers } from "../store/UserAction";
// import { formatDate } from "../../../shared/utils/helpers/helpers";
import Iconify from "../../../shared/components/Iconify";
import EditIcon from '@mui/icons-material/Edit';
//
export default function Customer() {

    //table menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //business
    const { loading, customers, pagination } = useSelector(state => state.CustomerReducer)
    


    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
 

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e, value) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    //

    useEffect(() => {
        let payload = {
            page: page + 1,
            page_size: rowsPerPage
        }
        dispatch(getUsers(payload))
    }, [dispatch, page, rowsPerPage])






    return (
        <Page title="Accounts">
            <ToastContainer theme="colored" />
            <Box sx={{ m: 5 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Users</Typography>
                </Breadcrumbs>
                <Divider />
            </Box>
            <Box sx={{
                width: 2600,
                maxWidth: '100%',
            }}>
                <Card variant="outlined">
                    <CardHeader
                        title={
                            <Button onClick={() => navigate(-1)} color="warning" variant="contained" size="small"><ArrowLeft /> <strong>Go Back</strong></Button>
                        }
                        action={
                            <Button onClick={() => navigate("/admin/dashboard/user/card")} variant="contained" color='primary' startIcon={<Iconify icon="eva:plus-fill" />}>
                                Add New
                            </Button>
                        }
                    />
                    <Divider sx={{ mt: 3 }} />
                    <CardContent>
                        <Typography>
                            <TableContainer sx={{ minWidth: 800 }}>
                                {/* {
                                    loading ? */}
                                        {/* <Grid container sx={{ justifyContent: 'center' }}> <SpinnerLoader /></Grid> */}
                                        {/* : */}
                                        <Table>
                                            <TableHead sx={{ bgcolor: '#4169E1' }}>
                                                <StyledTableRow>
                                                    <StyledTableCell>#S/N</StyledTableCell>
                                                    <StyledTableCell>User </StyledTableCell>
                                                    <StyledTableCell>Middle Name</StyledTableCell>
                                                    <StyledTableCell>Phone No</StyledTableCell>
                                                    <StyledTableCell>National Id</StyledTableCell>
                                                    <StyledTableCell>Status</StyledTableCell>
                                                    <StyledTableCell>Actions</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>

                                                {(customers && customers.length > 0) ? customers?.map((row, index) => {

                                                    // const [id,business_number, business_name, mobile_number, email_address, business_activity, physical_address, business_type, county, sub_county, ward, village  ] = row;


                                                    return (
                                                        <StyledTableRow
                                                            hover
                                                            key={row.id}
                                                            tabIndex={-1}
                                                            role="checkbox"
                                                        >

                                                            {/* <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.business_number}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.business_name}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.mobile_number}</StyledTableCell>
                                                            <StyledTableCell align="center">{row.email_address}</StyledTableCell>
                                                            <StyledTableCell align="center">{row.business_activity}</StyledTableCell>
                                                            <StyledTableCell align="center">{row.physical_address}</StyledTableCell>
                                                            <StyledTableCell align="center">{row.business_type.name}</StyledTableCell>

                                                            {
                                                                row.status === 7 ? <StyledTableCell align="center"><Badge badgeContent="Billed" color="success"></Badge> </StyledTableCell>  :
                                                                 
                                                                <StyledTableCell align="center"><Badge badgeContent="New" color="success"></Badge> </StyledTableCell>
                                                            }

 */}


                                                            <StyledTableCell align="left">
                                                                <PopupState variant="popover" popupId="demo-popup-menu">
                                                                    {(popupState) => (
                                                                        <>
                                                                            <IconButton
                                                                                aria-label="more"
                                                                                id="long-button"
                                                                                aria-controls={open ? 'long-menu' : undefined}
                                                                                aria-expanded={open ? 'true' : undefined}
                                                                                aria-haspopup="true"
                                                                                onClick={handleClick}
                                                                                {...bindTrigger(popupState)}
                                                                            >
                                                                                <MoreVertIcon />
                                                                            </IconButton>
                                                                            {/* <Menu {...bindMenu(popupState)}>
                                                                                <MenuItem onClick={() => navigate(`/admin/dashboard/business/view/edit-business/${row.id}`)}  > <EditIcon color="error" fontSize="small" /> Edit</MenuItem>
                                                                                <MenuItem onClick={() => navigate(`/admin/dashboard/business/view/${row.id}`)} color="success"> <VisibilityIcon color="success" fontSize="small" /> View</MenuItem>


                                                                                {
                                                                                    row.status === 3 ? <MenuItem onClick={() => navigate(`/admin/dashboard/business/view/permit/${row.id}`)}  > <PrintIcon color="error" fontSize="small" /> Print Permit</MenuItem> :
                                                                                        <MenuItem onClick={() => navigate(`/admin/dashboard/business/view/pdf/${row.id}`)}  > <PrintIcon color="error" fontSize="small" /> Print Invoice</MenuItem>
                                                                                }
                                                                            </Menu> */}
                                                                        </>
                                                                    )}
                                                                </PopupState>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                }) : <>No customers found</>}
                                            </TableBody>
                                        </Table>
                                 {/* } */}
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={pagination?.count || 100}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                variant="outlined"
                                color="primary"
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Page>
    )
}