import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function DataInsertType({currentType, setCurrentType}) {
    return (
        <Box width={"30%"}>
            <FormControl fullWidth>
                <InputLabel
                    id={"data-insert-type"}
                >
                    Service to Use
                </InputLabel>
                <Select
                    labelId={"data-insert-type"}
                    id={"data-insert-type"}
                    label={"Service to Use"}
                    value={currentType}
                    onChange={(event) => setCurrentType(event.target.value)}
                >
                    <MenuItem value={"parentCategory"}>Parent Category</MenuItem>
                    <MenuItem value={"subCategory"}>Sub Category</MenuItem>
                    <MenuItem value={"product"}>Product</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default DataInsertType;