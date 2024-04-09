import {Divider, MenuItem} from "@mui/material";
import {useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProductData from "./ProductData.jsx";
import {useCreateProduct} from "../../hooks/Product/useCreateProduct.js";
import {getAllParentCategories} from "../../services/parentCategoryService.js";
import {getAllSubCategories} from "../../services/subCategoryService.js";
import FormAndDataContainer from "../DataForms/FormAndDataContainer.jsx";
import Form from "../DataForms/Form.jsx";
import {
    FormSubmitButton, InputFileUploadMultipleImages, InputFileUploadSingleCoverImage,
    MultilineTextFieldController,
    MultiSelectController,
    TextFieldController
} from "../DataForms/FormFields.jsx";
import {useState} from "react";
import {uploadImageAndGetDownloadUrl} from "../../services/imageUploadService.js";
import {v4} from "uuid";

function ProductForm() {

    const {handleSubmit, reset, formState: {errors}, control} = useForm();
    const [productCoverImage, setProductCoverImage] = useState('');
    const [productImages, setProductImages] = useState([]);

    const {isLoading: isParentCategoryLoading, data: parentCategoryData, error: parentCategoryError} = useQuery({
        queryKey: ['parentCategories'],
        queryFn: getAllParentCategories
    });

    const {isLoading: isSubCategoryLoading, data: subCategoryData, error: subCategoryError} = useQuery({
        queryKey: ['subCategories'],
        queryFn: getAllSubCategories
    })

    const {isCreating, createProduct} = useCreateProduct();

    async function onSubmit(data) {

        const uploadingImageToast = toast.loading('Uploading Images...')
        let productCoverImageURL = null;
        let productImagesURLS = null;

        try {
            const path = v4();
            productCoverImageURL = await uploadImageAndGetDownloadUrl('product', `${path}-${data.name}/cover`, productCoverImage);
            productImagesURLS = await uploadImageAndGetDownloadUrl('product', `${path}-${data.name}/all`, productImages);
        } catch (error) {
            toast.error('Image upload failed!');
        } finally {
            toast.dismiss(uploadingImageToast);
            toast.success('Image uploaded!');
        }

        createProduct({
            name: data.name,
            description: data.description,
            keywords: data.keywords.split('\n'),
            price: data.price,
            brand: data.brand,
            coverImage: productCoverImageURL[0],
            productImages: productImagesURLS,
            parentCategory: data.parentCategory,
            subCategory: data.subCategory
        }, {
            onSuccess: () => {
                toast.success("Product added!");
                reset();
                setProductCoverImage("");
                setProductImages([]);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    }

    return (
        <FormAndDataContainer>
            <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
                <TextFieldController
                    control={control}
                    name={"name"}
                    id={"name"}
                    label={"Product Name"}
                    defaultValue={""}
                    requiredMessage={"Please enter a product name"}
                    disabled={isCreating}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <MultilineTextFieldController
                    control={control}
                    name={"description"}
                    id={"description"}
                    label={"Product Description"}
                    rows={3}
                    defaultValue={""}
                    requiredMessage={"Please enter a product description"}
                    disabled={isCreating}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
                <MultilineTextFieldController
                    control={control}
                    name={"keywords"}
                    id={"keywords"}
                    label={"Product keywords"}
                    rows={3}
                    defaultValue={""}
                    requiredMessage={"Please enter product's keywords"}
                    disabled={isCreating}
                    error={!!errors.keywords}
                    helperText={errors.keywords?.message}
                />
                <TextFieldController
                    control={control}
                    name={"price"}
                    id={"price"}
                    label={"Product Price"}
                    defaultValue={""}
                    requiredMessage={"Please enter a product price"}
                    disabled={isCreating}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                />
                <TextFieldController
                    control={control}
                    name={"brand"}
                    id={"brand"}
                    label={"Product Brand"}
                    defaultValue={""}
                    requiredMessage={"Please enter a product brand"}
                    disabled={isCreating}
                    error={!!errors.brand}
                    helperText={errors.brand?.message}
                />
                <MultiSelectController
                    control={control}
                    name={"parentCategory"}
                    id={"parentCategory"}
                    label={"Parent Category"}
                    defaultValue={[]}
                    requiredMessage={"Please select a parent category"}
                    disabled={isCreating}
                    error={!!errors.parentCategory}
                    helperText={errors.parentCategory?.message}
                >
                    {!isParentCategoryLoading && !parentCategoryError && parentCategoryData.data.parentCategories.map(c =>
                        <MenuItem value={c._id} key={c.name}>{c.name}</MenuItem>
                    )}
                </MultiSelectController>
                <MultiSelectController
                    control={control}
                    name={"subCategory"}
                    id={"subCategory"}
                    label={"Sub Category"}
                    defaultValue={[]}
                    requiredMessage={"Please select a sub category"}
                    disabled={isCreating}
                    error={!!errors.subCategory}
                    helperText={errors.subCategory?.message}
                >
                    {!isSubCategoryLoading && !subCategoryError && subCategoryData.data.subCategories.map(c =>
                        <MenuItem value={c._id} key={c.name}>{c.name}</MenuItem>
                    )}
                </MultiSelectController>
                <InputFileUploadSingleCoverImage
                    control={control}
                    coverImage={productCoverImage}
                    setCoverImage={setProductCoverImage}
                    name={"productCoverImage"}
                    id={"productCoverImage"}
                    label={"Product Cover Image"}
                    requiredMessage={"Please select a cover image for product"}
                    error={!!errors.productCoverImage}
                    helperText={errors.productCoverImage?.message}
                />
                <InputFileUploadMultipleImages
                    control={control}
                    productImages={productImages}
                    setProductImages={setProductImages}
                    name={"productImages"}
                    id={"productImages"}
                    label={"Product Images"}
                    requiredMessage={"Please select product images"}
                    error={!!errors.productImages}
                    helperText={errors.productImages?.message}
                />
                <FormSubmitButton disabled={isCreating} buttonText={"Create"}/>
            </Form>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <ProductData/>
        </FormAndDataContainer>
    );
}

export default ProductForm;