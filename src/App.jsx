import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy Imports
const BookingIndex = lazy(() => import("./core/private/order"));
const Home = lazy(() => import("./core/public/home"));
const Login = lazy(() => import("./core/public/login"));
const Register = lazy(() => import("./core/public/register"));
const Layout = lazy(() => import("./core/private/layout"));
const ContactUs = lazy(() => import("./core/public/ContactUs"));
const PrivacyPolicy = lazy(() => import("./core/public/PrivacyPolicy"));
const About = lazy(() => import("./core/public/About"));
const TermsCondition = lazy(() => import("./core/public/TermsCondition"));
const RefundPolicy = lazy(() => import("./core/public/RefundPolicy"));
const CancellationPolicy = lazy(() => import("./core/public/CancellationPolicy"));
const DeliveryCharges = lazy(() => import("./core/public/DeliveryCharges"));
const Dashboard = lazy(() => import("./core/private/admin/pages/Dashboard"));
const AllCategory = lazy(() => import("./core/private/admin/pages/AllCategory"));
const AddCategory = lazy(() => import("./core/private/admin/pages/AddCategory"));
const AddSubcategory = lazy(() => import("./core/private/admin/pages/AddSubcategory"));
const AllSubcategory = lazy(() => import("./core/private/admin/pages/AllSubcategory"));
const Support = lazy(() => import("./core/private/admin/pages/Support"));
const User = lazy(() => import("./core/private/admin/pages/User"));
const ViewItem = lazy(() => import("./core/private/admin/pages/ViewItem"));
const AddItem = lazy(() => import("./core/private/admin/pages/AddItem"));
const AllOrder = lazy(() => import("./core/private/admin/pages/AllOrder"));
const PendingOrder = lazy(() => import("./core/private/admin/pages/PendingOrder"));
const ConfirmOrder = lazy(() => import("./core/private/admin/pages/ConfirmOrder"));
const ProcessingOrder = lazy(() => import("./core/private/admin/pages/ProcessingOrder"));
const CompletedOrder = lazy(() => import("./core/private/admin/pages/CompletedOrder"));
const CancelOrder = lazy(() => import("./core/private/admin/pages/CancelOrder"));
const Review = lazy(() => import("./core/private/admin/pages/Review"));
const Settings = lazy(() => import("./core/private/admin/pages/Setting"));


function App() {
    // LOGIN logic TODO
    const isAdmin = false;

    const router = createBrowserRouter([
        // Public Routes
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/contact-us",
            element: <ContactUs />,
        },
        {
            path: "/privacy-and-policy",
            element: <PrivacyPolicy />,
        },
        {
            path: "/about-us",
            element: <About />,
        },
        {
            path: "/terms-and-conditions",
            element: <TermsCondition />,
        },
        {
            path: "/refund-policy",
            element: <RefundPolicy />,
        },
        {
            path: "/cancellation-policy",
            element: <CancellationPolicy />,
        },
        {
            path: "/delivery-charges",
            element: <DeliveryCharges />,
        },

        // Private Routes (Admin)
        {
            path: "/admin",
            element: <Layout />,
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "category/all-categories", element: <AllCategory /> },
                { path: "category/add-category", element: <AddCategory /> },
                { path: "subcategory/add-subcategory", element: <AddSubcategory /> },
                { path: "subcategory/all-subcategories", element: <AllSubcategory /> },
                { path: "support", element: <Support /> },
                { path: "users", element: <User /> },
                { path: "menu/all-items", element: <ViewItem /> },
                { path: "menu/add-item", element: <AddItem /> },
                { path: "order/all-orders", element: <AllOrder /> },
                { path: "order/pending-orders", element: <PendingOrder /> },
                { path: "order/confirmed-orders", element: <ConfirmOrder /> },
                { path: "order/processing-orders", element: <ProcessingOrder /> },
                { path: "order/completed-orders", element: <CompletedOrder /> },
                { path: "order/cancelled-orders", element: <CancelOrder /> },
                { path: "reviews", element: <Review /> },
                { path: "setting", element: <Settings /> },


                // { path: "booking", element: <BookingIndex /> },
            ],
        },

        // Catch-all
        {
            path: "*",
            element: <>Page not found</>,
        },
    ]);

    return (
        <Suspense>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
