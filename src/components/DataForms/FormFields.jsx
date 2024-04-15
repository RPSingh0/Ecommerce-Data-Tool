import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    Paper,
    Select,
    styled,
    TextField,
    Typography
} from "@mui/material";
import {Controller} from "react-hook-form";
import {Circle} from "@mui/icons-material";

const StyledFormControlFilePicker = styled(FormControl)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
}));

const StyledSelectedFilePaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: "0.4rem 0.8rem",
    overflow: "auto",
}))

export function FormSubmitButton({disabled, buttonText}) {
    return (<Button type={"submit"} disabled={disabled} color={"primary"} variant={"contained"}>
        {buttonText}
    </Button>);
}

export function TextFieldController({
    control, name, id, label, defaultValue, requiredMessage, disabled, error, helperText
}) {
    return (<Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
            required: requiredMessage
        }}
        render={({field}) => (<FormControl>
            <TextField
                {...field}
                id={id}
                name={name}
                variant={"outlined"}
                label={label}
                disabled={disabled}
                error={error}
                helperText={helperText}
            />
        </FormControl>)}
    />);
}

export function MultilineTextFieldController({
    control, name, id, label, defaultValue, rows, requiredMessage, disabled, error, helperText
}) {
    return (<Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
            required: requiredMessage
        }}
        render={({field}) => (<FormControl>
            <TextField
                {...field}
                id={id}
                name={name}
                variant={"outlined"}
                label={label}
                multiline
                rows={rows}
                disabled={disabled}
                error={error}
                helperText={helperText}
            />
        </FormControl>)}
    />);
}

export function SelectController({
    control, name, id, label, defaultValue, requiredMessage, disabled, error, helperText, children
}) {
    return (<Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
            required: requiredMessage
        }}
        render={({field}) => (<FormControl>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                {...field}
                labelId={id}
                label={label}
                defaultValue={defaultValue}
                disabled={disabled}
                error={error}
            >
                {children}
            </Select>
            <FormHelperText htmlFor={id} error={error}>
                {helperText}
            </FormHelperText>
        </FormControl>)}
    />);
}

export function MultiSelectController({
    control, name, id, label, defaultValue, requiredMessage, disabled, error, helperText, children
}) {
    return (<Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
            required: requiredMessage
        }}
        render={({field}) => (<FormControl>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                {...field}
                labelId={id}
                label={label}
                defaultValue={defaultValue}
                multiple
                disabled={disabled}
                error={error}
            >
                {children}
            </Select>
            <FormHelperText htmlFor={id} error={error}>
                {helperText}
            </FormHelperText>
        </FormControl>)}
    />);
}

export function InputFileUploadSingleCoverImage({
    control, coverImage, setCoverImage, name, id, label, requiredMessage, disabled, error, helperText
}) {

    const handleInputChange = (event) => {
        // field.onChange(event); // to call the default onChange event from the controller
        const files = event.target.files;
        setCoverImage(Array.from(files));
    };

    return (<Controller
        name={name}
        control={control}
        defaultValue={coverImage}
        rules={{
            required: requiredMessage
        }}
        render={({field}) => (<StyledFormControlFilePicker>
            <TextField
                {...field}
                id={id}
                name={name}
                variant={"outlined"}
                type={"file"}
                label={label}
                onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                }}
                disabled={disabled}
                error={error}
                helperText={helperText}
                // inputProps={{
                //     multiple: allowMultiple
                // }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            {coverImage.length > 0 &&
                <StyledSelectedFilePaper>
                    {coverImage.map(f =>
                        <Typography variant={"subtitle2"} noWrap key={f.name}>
                            <Circle sx={{height: 10}}/> {f.name}
                        </Typography>)}
                </StyledSelectedFilePaper>
            }
        </StyledFormControlFilePicker>)}
    />);
}

export function InputFileUploadMultipleImages({
    control, productImages, setProductImages, name, id, label, requiredMessage, disabled, error, helperText
}) {

    const handleInputChange = (event) => {
        const files = event.target.files;
        setProductImages(Array.from(files));
    };

    return (<Controller
        name={name}
        control={control}
        defaultValue={productImages}
        rules={{
            required: requiredMessage
        }}
        render={({field}) => (<StyledFormControlFilePicker>
            <TextField
                {...field}
                id={id}
                name={name}
                variant={"outlined"}
                type={"file"}
                label={label}
                onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                }}
                disabled={disabled}
                error={error}
                helperText={helperText}
                inputProps={{
                    multiple: true
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            {productImages.length > 0 &&
                <StyledSelectedFilePaper>
                    {productImages.map(f =>
                        <Typography variant={"subtitle2"} noWrap key={f.name}>
                            <Circle sx={{height: 10}}/> {f.name}
                        </Typography>)}
                </StyledSelectedFilePaper>
            }
        </StyledFormControlFilePicker>)}
    />);
}