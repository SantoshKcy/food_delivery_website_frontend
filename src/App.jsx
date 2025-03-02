import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScrollToTop from "./components/common/customer/ScrollToTop";
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider and useAuth

// Lazy Imports
const Home = lazy(() => import("./components/public/Home"));
const Login = lazy(() => import("./components/public/Login"));
const Register = lazy(() => import("./components/public/Register"));
const Layout = lazy(() => import("./components/private"));
const ContactUs = lazy(() => import("./components/public/ContactUs"));
const PrivacyPolicy = lazy(() => import("./components/public/PrivacyPolicy"));
const About = lazy(() => import("./components/public/About"));
const TermsCondition = lazy(() => import("./components/public/TermsCondition"));
const RefundPolicy = lazy(() => import("./components/public/RefundPolicy"));
const CancellationPolicy = lazy(() => import("./components/public/CancellationPolicy"));
const DeliveryCharges = lazy(() => import("./components/public/DeliveryCharges"));
const Dashboard = lazy(() => import("./components/private/dashboard"));
const AllCategory = lazy(() => import("./components/private/category"));
const EditCategory = lazy(() => import("./components/private/category/EditCategory"));
const EditSubcategory = lazy(() => import("./components/private/subcategory/EditSubCategory"));
const EditItem = lazy(() => import("./components/private/item/EditItem"));
const AddCategory = lazy(() => import("./components/private/category/Form"));
const AddSubcategory = lazy(() => import("./components/private/subcategory/Form"));
const AllSubcategory = lazy(() => import("./components/private/subcategory"));
const User = lazy(() => import("./components/private/user"));
const AddItem = lazy(() => import("./components/private/item/Form"));
const ViewItem = lazy(() => import("./components/private/item"));
const CancelOrder = lazy(() => import("./components/private/order/CancelOrder"));
const CompletedOrder = lazy(() => import("./components/private/order/CompletedOrder"));
const ConfirmOrder = lazy(() => import("./components/private/order/ConfirmOrder"));
const PendingOrder = lazy(() => import("./components/private/order/PendingOrder"));
const ProcessingOrder = lazy(() => import("./components/private/order/ProcessingOrder"));
// const Review = lazy(() => import("./components/private/user/Review"));
const Settings = lazy(() => import("./components/private/user/Form"));
const AllOrder = lazy(() => import("./components/private/order"));
const Support = lazy(() => import("./components/private/user/Support"));
const ItemDetails = lazy(() => import("./components/public/ItemDetails"));
const Profile = lazy(() => import("./components/public/Profile"));
const MyOrders = lazy(() => import("./components/public/MyOrders"));
const Cart = lazy(() => import("./components/public/Cart"));
const Wishlist = lazy(() => import("./components/public/Wishlist"));
const Checkout = lazy(() => import("./components/public/Checkout"));
const Menu = lazy(() => import("./components/public/Menu"));
const OrderSuccess = lazy(() => import("./components/public/OrderSuccess"));
const SearchResults = lazy(() => import("./components/public/SearchResults"));





function App() {

    // Wrapping the routes setup logic with useAuth
    const { user, loading } = useAuth(); // Use the custom hook to access auth context

    if (loading) return <div>Loading...</div>; // Show loading while checking auth

    const publicRoutes = [
        { path: "/", element: <Suspense><Home /></Suspense>, errorElement: <>Error</> },
        { path: "/login", element: <Suspense><Login /></Suspense>, errorElement: <>Error</> },
        { path: "/register", element: <Suspense><Register /></Suspense>, errorElement: <>Error</> },
        { path: "/contact-us", element: <Suspense><ContactUs /></Suspense>, errorElement: <>Error</> },
        { path: "/privacy-and-policy", element: <Suspense><PrivacyPolicy /></Suspense>, errorElement: <>Error</> },
        { path: "/about-us", element: <Suspense><About /></Suspense>, errorElement: <>Error</> },
        { path: "/terms-and-conditions", element: <Suspense><TermsCondition /></Suspense>, errorElement: <>Error</> },
        { path: "/refund-policy", element: <Suspense><RefundPolicy /></Suspense>, errorElement: <>Error</> },
        { path: "/cancellation-policy", element: <Suspense><CancellationPolicy /></Suspense>, errorElement: <>Error</> },
        { path: "/delivery-charges", element: <Suspense><DeliveryCharges /></Suspense>, errorElement: <>Error</> },
        { path: "/item/details/:id", element: <Suspense><ItemDetails /></Suspense>, errorElement: <>Error</> },
        { path: "/profile", element: <Suspense><Profile /></Suspense>, errorElement: <>Error</> },
        { path: "/my-orders", element: <Suspense><MyOrders /></Suspense>, errorElement: <>Error</> },
        { path: "/cart", element: <Suspense><Cart /></Suspense>, errorElement: <>Error</> },
        { path: "/wishlist", element: <Suspense><Wishlist /></Suspense>, errorElement: <>Error</> },
        { path: "/checkout", element: <Suspense><Checkout /></Suspense>, errorElement: <>Error</> },
        { path: "/menu", element: <Suspense><Menu /></Suspense>, errorElement: <>Error</> },
        { path: "/searchresult", element: <Suspense><SearchResults /></Suspense>, errorElement: <>Error</> },
        { path: "/checkout/success", element: <Suspense><OrderSuccess /></Suspense>, errorElement: <>Error</> },
        { path: "*", element: <div>404: Page not found</div> },
    ];

    const privateRoutes = [
        {
            path: "/admin",
            element: <Suspense><Layout /></Suspense>,
            errorElement: <>Error</>,
            children: [
                { path: "dashboard", element: <Suspense><Dashboard /></Suspense>, errorElement: <>Error</> },
                { path: "category/edit-category/:id", element: <Suspense><EditCategory /></Suspense>, errorElement: <>Error</> },
                { path: "subcategory/edit-subcategory/:id", element: <Suspense><EditSubcategory /></Suspense>, errorElement: <>Error</> },
                { path: "menu/edit-item/:id", element: <Suspense><EditItem /></Suspense>, errorElement: <>Error</> },
                { path: "category/all-categories", element: <Suspense><AllCategory /></Suspense>, errorElement: <>Error</> },
                { path: "category/add-category", element: <Suspense><AddCategory /></Suspense>, errorElement: <>Error</> },
                { path: "subcategory/add-subcategory", element: <Suspense><AddSubcategory /></Suspense>, errorElement: <>Error</> },
                { path: "subcategory/all-subcategories", element: <Suspense><AllSubcategory /></Suspense>, errorElement: <>Error</> },
                { path: "support", element: <Suspense><Support /></Suspense>, errorElement: <>Error</> },
                { path: "users", element: <Suspense><User /></Suspense>, errorElement: <>Error</> },
                { path: "menu/all-items", element: <Suspense><ViewItem /></Suspense>, errorElement: <>Error</> },
                { path: "menu/add-item", element: <Suspense><AddItem /></Suspense>, errorElement: <>Error</> },
                { path: "order/all-orders", element: <Suspense><AllOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/pending-orders", element: <Suspense><PendingOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/confirmed-orders", element: <Suspense><ConfirmOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/processing-orders", element: <Suspense><ProcessingOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/completed-orders", element: <Suspense><CompletedOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/cancelled-orders", element: <Suspense><CancelOrder /></Suspense>, errorElement: <>Error</> },
                // { path: "reviews", element: <Suspense><Review /></Suspense>, errorElement: <>Error</> },
                { path: "setting", element: <Suspense><Settings /></Suspense>, errorElement: <>Error</> },
            ],
        },
        { path: "*", element: <>Page not found</>, errorElement: <>Error</> },
    ];

    const isAdmin = user?.role === "admin"; // Check if the user is an admin
    const routes = isAdmin ? privateRoutes : publicRoutes;

    return (
        <AuthProvider>
            <div>
                <RouterProvider router={createBrowserRouter(routes)} />
                <ScrollToTop />  {/* Include ScrollToTop Component */}
            </div>
        </AuthProvider>
    );
}

export default App;
// import { lazy, Suspense } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ScrollToTop from "./components/common/customer/ScrollToTop";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// // Error Page Component
// const ErrorPage = () => <div>Error: Something went wrong!</div>;

// // Lazy Loading Components
// const Home = lazy(() => import("./components/public/Home"));
// const Login = lazy(() => import("./components/public/Login"));
// const Register = lazy(() => import("./components/public/Register"));
// const Layout = lazy(() => import("./components/private"));
// const Dashboard = lazy(() => import("./components/private/dashboard"));
// const AllCategory = lazy(() => import("./components/private/category"));
// const AddCategory = lazy(() => import("./components/private/category/Form"));
// const AllSubcategory = lazy(() => import("./components/private/subcategory"));
// const User = lazy(() => import("./components/private/user"));
// const AddItem = lazy(() => import("./components/private/item/Form"));
// const ViewItem = lazy(() => import("./components/private/item"));
// const AllOrder = lazy(() => import("./components/private/order"));
// const Profile = lazy(() => import("./components/public/Profile"));
// const MyOrders = lazy(() => import("./components/public/MyOrders"));
// const Cart = lazy(() => import("./components/public/Cart"));
// const Wishlist = lazy(() => import("./components/public/Wishlist"));
// const Checkout = lazy(() => import("./components/public/Checkout"));
// const Menu = lazy(() => import("./components/public/Menu"));

// // Routes Setup
// function AppRoutes() {
//     const { user, loading } = useAuth();

//     if (loading) return <div>Loading...</div>;

//     const isAdmin = user?.role === "admin";

//     const publicRoutes = [
//         { path: "/", element: <Home />, errorElement: <ErrorPage /> },
//         { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
//         { path: "/register", element: <Register />, errorElement: <ErrorPage /> },
//         { path: "/profile", element: <Profile />, errorElement: <ErrorPage /> },
//         { path: "/my-orders", element: <MyOrders />, errorElement: <ErrorPage /> },
//         { path: "/cart", element: <Cart />, errorElement: <ErrorPage /> },
//         { path: "/wishlist", element: <Wishlist />, errorElement: <ErrorPage /> },
//         { path: "/checkout", element: <Checkout />, errorElement: <ErrorPage /> },
//         { path: "/menu", element: <Menu />, errorElement: <ErrorPage /> },
//         { path: "*", element: <div>404: Page Not Found</div> },
//     ];

//     const privateRoutes = [
//         {
//             path: "/admin",
//             element: <Layout />,
//             errorElement: <ErrorPage />,
//             children: [
//                 { path: "dashboard", element: <Dashboard />, errorElement: <ErrorPage /> },
//                 { path: "category/all-categories", element: <AllCategory />, errorElement: <ErrorPage /> },
//                 { path: "category/add-category", element: <AddCategory />, errorElement: <ErrorPage /> },
//                 { path: "subcategory/all-subcategories", element: <AllSubcategory />, errorElement: <ErrorPage /> },
//                 { path: "users", element: <User />, errorElement: <ErrorPage /> },
//                 { path: "menu/all-items", element: <ViewItem />, errorElement: <ErrorPage /> },
//                 { path: "menu/add-item", element: <AddItem />, errorElement: <ErrorPage /> },
//                 { path: "order/all-orders", element: <AllOrder />, errorElement: <ErrorPage /> },
//             ],
//         },
//         { path: "*", element: <div>404: Page Not Found</div>, errorElement: <ErrorPage /> },
//     ];

//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <RouterProvider router={createBrowserRouter(isAdmin ? privateRoutes : publicRoutes)} />
//         </Suspense>
//     );
// }

// function App() {
//     return (
//         <AuthProvider>
//             <ScrollToTop />
//             <AppRoutes />
//         </AuthProvider>
//     );
// }

// export default App;
