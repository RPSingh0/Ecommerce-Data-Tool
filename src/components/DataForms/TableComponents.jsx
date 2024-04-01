import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {getFormattedDate} from "../../utilities/utils.js";

export function TableParentContainer({children}) {
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Box sx={{
            overflow: "auto"
        }}>
            {children}
        </Box>
    );
}

export function DataTable({tableHeaders, children}) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map(head =>
                            <TableCell key={head}>
                                {head}
                            </TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function DataTableRow({keyId, children}) {
    return (
        <TableRow
            key={keyId}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {children}
        </TableRow>
    );
}

export function DataTableRowCell({cellData}) {
    return (
        <TableCell component="th" scope="row">
            {cellData}
        </TableCell>
    );
}

export function DeleteEntryButton({handleDelete, identifier, disabled}) {
    return (
        <Button variant={"outlined"} startIcon={<Delete/>} disabled={disabled}
                onClick={() => handleDelete(identifier)}>
            Delete
        </Button>
    );
}