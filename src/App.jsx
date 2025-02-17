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
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Suspense ><Home /></Suspense>,
            errorElement: <>Error</>,
        },
        {
            path: "/login",
            element: <Suspense ><Login /></Suspense>,
            errorElement: <>Error</>,
        },
        { path: "/register", element: <Suspense ><Register /></Suspense>, errorElement: <>Error</> },
        { path: "/contact-us", element: <Suspense ><ContactUs /></Suspense>, errorElement: <>Error</> },
        { path: "/privacy-and-policy", element: <Suspense ><PrivacyPolicy /></Suspense>, errorElement: <>Error</> },
        { path: "/about-us", element: <Suspense ><About /></Suspense>, errorElement: <>Error</> },
        { path: "/terms-and-conditions", element: <Suspense ><TermsCondition /></Suspense>, errorElement: <>Error</> },
        { path: "/refund-policy", element: <Suspense ><RefundPolicy /></Suspense>, errorElement: <>Error</> },
        { path: "/cancellation-policy", element: <Suspense ><CancellationPolicy /></Suspense>, errorElement: <>Error</> },
        { path: "/delivery-charges", element: <Suspense ><DeliveryCharges /></Suspense>, errorElement: <>Error</> },

        {
            path: "/admin",
            element: <Suspense ><Layout /></Suspense>,
            errorElement: <>Error</>,
            children: [
                { path: "dashboard", element: <Suspense ><Dashboard /></Suspense>, errorElement: <>Error</> },
                { path: "category/all-categories", element: <Suspense ><AllCategory /></Suspense>, errorElement: <>Error</> },
                { path: "category/add-category", element: <Suspense ><AddCategory /></Suspense>, errorElement: <>Error</> },
                { path: "subcategory/add-subcategory", element: <Suspense ><AddSubcategory /></Suspense>, errorElement: <>Error</> },
                { path: "subcategory/all-subcategories", element: <Suspense ><AllSubcategory /></Suspense>, errorElement: <>Error</> },
                { path: "support", element: <Suspense ><Support /></Suspense>, errorElement: <>Error</> },
                { path: "users", element: <Suspense ><User /></Suspense>, errorElement: <>Error</> },
                { path: "menu/all-items", element: <Suspense ><ViewItem /></Suspense>, errorElement: <>Error</> },
                { path: "menu/add-item", element: <Suspense ><AddItem /></Suspense>, errorElement: <>Error</> },
                { path: "order/all-orders", element: <Suspense ><AllOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/pending-orders", element: <Suspense ><PendingOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/confirmed-orders", element: <Suspense ><ConfirmOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/processing-orders", element: <Suspense ><ProcessingOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/completed-orders", element: <Suspense ><CompletedOrder /></Suspense>, errorElement: <>Error</> },
                { path: "order/cancelled-orders", element: <Suspense ><CancelOrder /></Suspense>, errorElement: <>Error</> },
                { path: "reviews", element: <Suspense ><Review /></Suspense>, errorElement: <>Error</> },
                { path: "setting", element: <Suspense ><Settings /></Suspense>, errorElement: <>Error</> },
            ],
        },

        { path: "*", element: <>Page not found</>, errorElement: <>Error</> },
    ]);

    return (
        <Suspense>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
