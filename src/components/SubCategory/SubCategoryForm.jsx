import {Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {getAllParentCategories} from "../../services/parentCategoryService.js";
import {useCreateSubCategory} from "../../hooks/SubCategory/useCreateSubCategory.js";
import toast from "react-hot-toast";
import SubCategoryData from "./SubCategoryData.jsx";

function SubCategoryForm() {

    const {handleSubmit, reset, formState: {errors}, control} = useForm();

    const {isLoading, data, error} = useQuery({
        queryKey: ['parentCategories'],
        queryFn: getAllParentCategories
    });

    const {isCreating, createSubCategory} = useCreateSubCategory();

    function onSubmit(data) {
        createSubCategory({name: data.subCategory, parentCategory: data.parentCategory}, {
            onSuccess: () => {
                toast.success("Sub Category added!");
                reset()
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "2rem",
            overflow: "auto",
            padding: "2rem"
        }}>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "2rem"
            }}>
                <Controller
                    name={"subCategory"}
                    control={control}
                    defaultValue={""}
                    rules={{
                        required: "Please enter a sub category"
                    }}
                    render={({field}) => (
                        <FormControl>
                            <TextField
                                {...field}
                                id={"subCategory"}
                                name={"subCategory"}
                                variant={"outlined"}
                                label={"Sub Category"}
                                disabled={isCreating}
                                error={!!errors.subCategory}
                                helperText={errors.subCategory?.message}
                            />
                        </FormControl>
                    )}
                />
                <Controller
                    name={"parentCategory"}
                    control={control}
                    defaultValue={[]}
                    rules={{
                        required: "Please select a parent category"
                    }}
                    render={({field}) => (
                        <FormControl>
                            <InputLabel id={"parentCategory"}>Parent Category</InputLabel>
                            <Select
                                {...field}
                                labelId={"parentCategory"}
                                label={"Parent Category"}
                                defaultValue={[]}
                                multiple
                                disabled={isCreating}
                                error={!!errors.parentCategory}
                            >
                                {!isLoading && !error && data.data.parentCategories.map(c =>
                                    <MenuItem value={c._id} key={c.name}>{c.name}</MenuItem>
                                )}
                            </Select>
                            <FormHelperText htmlFor="parentCategory" error={!!errors.parentCategory}>
                                {errors.parentCategory?.message}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
                <Button type={"submit"} color={"primary"} variant={"contained"}>
                    Create
                </Button>
            </Box>
            <SubCategoryData/>
        </Box>
    );
}

export default SubCategoryForm;