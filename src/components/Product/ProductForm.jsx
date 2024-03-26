import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProductData from "./ProductData.jsx";
import {useCreateProduct} from "../../hooks/Product/useCreateProduct.js";
import {getAllParentCategories} from "../../services/parentCategoryService.js";
import {getAllSubCategories} from "../../services/subCategoryService.js";

function ProductForm() {

    const {handleSubmit, reset, formState: {errors}, control} = useForm();

    const {isLoading: isParentCategoryLoading, data: parentCategoryData, error: parentCategoryError} = useQuery({
        queryKey: ['parentCategories'],
        queryFn: getAllParentCategories
    });

    const {isLoading: isSubCategoryLoading, data: subCategoryData, error: subCategoryError} = useQuery({
        queryKey: ['subCategories'],
        queryFn: getAllSubCategories
    })

    const {isCreating, createProduct} = useCreateProduct();

    function onSubmit(data) {
        createProduct({
            name: data.name,
            description: data.description,
            price: data.price,
            parentCategory: data.parentCategory,
            subCategory: data.subCategory
        }, {
            onSuccess: () => {
                toast.success("Product added!");
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
                    name={"name"}
                    control={control}
                    defaultValue={""}
                    rules={{
                        required: "Please enter a product name"
                    }}
                    render={({field}) => (
                        <FormControl>
                            <TextField
                                {...field}
                                id={"name"}
                                name={"name"}
                                variant={"outlined"}
                                label={"Product Name"}
                                disabled={isCreating}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </FormControl>
                    )}
                />
                <Controller
                    name={"description"}
                    control={control}
                    defaultValue={""}
                    rules={{
                        required: "Please enter a product description"
                    }}
                    render={({field}) => (
                        <FormControl>
                            <TextField
                                {...field}
                                id={"description"}
                                name={"description"}
                                variant={"outlined"}
                                label={"Product Description"}
                                multiline
                                rows={3}
                                disabled={isCreating}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        </FormControl>
                    )}
                />
                <Controller
                    name={"price"}
                    control={control}
                    defaultValue={""}
                    rules={{
                        required: "Please enter a product price"
                    }}
                    render={({field}) => (
                        <FormControl>
                            <TextField
                                {...field}
                                id={"price"}
                                name={"price"}
                                variant={"outlined"}
                                label={"Product Price"}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                                }}
                                disabled={isCreating}
                                error={!!errors.price}
                                helperText={errors.price?.message}
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
                                {!isParentCategoryLoading && !parentCategoryError && parentCategoryData.data.parentCategories.map(c =>
                                    <MenuItem value={c._id} key={c.name}>{c.name}</MenuItem>
                                )}
                            </Select>
                            <FormHelperText htmlFor="parentCategory" error={!!errors.parentCategory}>
                                {errors.parentCategory?.message}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name={"subCategory"}
                    control={control}
                    defaultValue={[]}
                    rules={{
                        required: "Please select a sub category"
                    }}
                    render={({field}) => (
                        <FormControl>
                            <InputLabel id={"subCategory"}>Sub Category</InputLabel>
                            <Select
                                {...field}
                                labelId={"subCategory"}
                                label={"Sub Category"}
                                defaultValue={[]}
                                multiple
                                disabled={isCreating}
                                error={!!errors.subCategory}
                            >
                                {!isSubCategoryLoading && !subCategoryError && subCategoryData.data.subCategories.map(c =>
                                    <MenuItem value={c._id} key={c.name}>{c.name}</MenuItem>
                                )}
                            </Select>
                            <FormHelperText htmlFor="parentCategory" error={!!errors.subCategory}>
                                {errors.subCategory?.message}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
                <Button type={"submit"} color={"primary"} variant={"contained"}>
                    Create
                </Button>
            </Box>
            <ProductData/>
        </Box>
    );
}

export default ProductForm;