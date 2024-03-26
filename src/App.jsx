import AppNavBar from "./components/Header/AppNavBar.jsx";
import DataInsertType from "./components/TypeSelector/DataInsertType.jsx";
import {useState} from "react";
import {Box} from "@mui/material";
import StartService from "./components/DataForms/StartService.jsx";
import FormParent from "./components/DataForms/FormParent.jsx";
import ParentCategoryForm from "./components/ParentCategory/ParentCategoryForm.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";
import SubCategoryForm from "./components/SubCategory/SubCategoryForm.jsx";
import ProductForm from "./components/Product/ProductForm.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0
        }
    }
})

function App() {

    const [currentType, setCurrentType] = useState('');

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <Box sx={{
                width: "100dvw",
                height: "100dvh",
                display: "flex",
                flexDirection: "column"
            }}>
                <AppNavBar/>
                <Box sx={{
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    overflow: "auto"
                }}>
                    <DataInsertType currentType={currentType} setCurrentType={setCurrentType}/>
                    {currentType === '' ?
                        <StartService/>
                        :
                        <FormParent currentType={currentType}>
                            {currentType === 'parentCategory' && <ParentCategoryForm/>}
                            {currentType === 'subCategory' && <SubCategoryForm/>}
                            {currentType === 'product' && <ProductForm/>}
                        </FormParent>
                    }
                </Box>
            </Box>
            <Toaster position={"top-center"} gutter={12} toastOptions={{
                success: {
                    duration: 3000
                },
                error: {
                    duration: 5000
                }
            }}/>
        </QueryClientProvider>
    );
}

export default App;