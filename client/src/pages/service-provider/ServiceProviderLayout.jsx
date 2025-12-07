
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import ServiceProviderSidebar from "../../components/layout/ServiceProviderSidebar";

// export default function ServiceProviderLayout() {
//     return (
//         <Box sx={{ display: "flex", background: "#f5f7fa" }}>

//             <ServiceProviderSidebar />

//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     p: 4,
//                     minHeight: "100vh",
//                     background: "#f9fafb",
//                 }}
//             >
//                 {/* Prevents content from sticking */}
//                 <Toolbar />

//                 <Outlet />
//             </Box>
//         </Box>
//     );
// }

export default function ServiceProviderLayout({ children }) {
return (
<Box sx={{ display: 'flex', background: '#f5f7fa', minHeight: '100vh' }}>
<ServiceProviderSidebar />


<Box
component="main"
sx={{
flexGrow: 1,
p: { xs: 2, md: 4 },
minHeight: '100vh',
background: 'transparent',
}}
>
{/* Prevent content from sticking */}
<Toolbar />


{/* Constrain the width so dashboard content doesn't stretch too wide */}
<Box sx={{ maxWidth: 1100, mx: 'auto' }}>{children ?? <Outlet />}</Box>
</Box>
</Box>
);
}