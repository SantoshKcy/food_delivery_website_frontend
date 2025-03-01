import { Button } from '@/components/common/ui/button';
import { cn } from '@/lib/utils';
import { Ban, ChartBarStacked, CheckCircle, CircleEllipsis, Hourglass, Info, Newspaper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronRight, FaClipboardList, FaCog, FaHome, FaListAlt, FaPlusCircle, FaStar, FaTags, FaUser, FaUtensils } from 'react-icons/fa'; // Add any other icons you need
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
    { title: 'Dashboard', icon: FaHome, path: '/admin/dashboard' },
    {
        title: 'Menu',
        icon: FaUtensils,
        subMenu: [
            { title: 'All Items', icon: FaListAlt, path: '/admin/menu/all-items' },
            { title: 'Add Item', icon: FaPlusCircle, path: '/admin/menu/add-item' }
        ]
    },
    {
        title: 'Categories',
        icon: FaTags,
        subMenu: [
            { title: 'All Categories', icon: FaListAlt, path: '/admin/category/all-categories' },
            { title: 'Add Category', icon: FaPlusCircle, path: '/admin/category/add-category' }
        ]
    },
    {
        title: 'Subcategories',
        icon: ChartBarStacked,
        subMenu: [
            { title: 'All Subcategories', icon: FaListAlt, path: '/admin/subcategory/all-subcategories' },
            { title: 'Add Subcategory', icon: FaPlusCircle, path: '/admin/subcategory/add-subcategory' }
        ]
    },
    {
        title: 'Orders',
        icon: FaClipboardList,
        subMenu: [
            { title: 'All Orders', icon: Newspaper, path: '/admin/order/all-orders' },
            { title: 'Pending', icon: CircleEllipsis, path: '/admin/order/pending-orders' },
            { title: 'Confirmed', icon: CheckCircle, path: '/admin/order/confirmed-orders' },
            { title: 'Processing', icon: Hourglass, path: '/admin/order/processing-orders' },
            { title: 'Completed', icon: CheckCircle, path: '/admin/order/completed-orders' },
            { title: 'Cancelled', icon: Ban, path: '/admin/order/cancelled-orders' }
        ]
    },
    { title: 'Reviews', icon: FaStar, path: '/admin/reviews' },
    { title: 'Support', icon: Info, path: '/admin/support' },
    { title: 'Users', icon: FaUser, path: '/admin/users' },
    { title: 'Setting', icon: FaCog, path: '/admin/setting' },


];

export default function Sidebar({ collapsed, setCollapsed }) {
    const navigate = useNavigate();
    const location = useLocation();  // Get the current path
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSubMenu, setSelectedSubMenu] = useState(null);

    useEffect(() => {
        // Update selectedItem and selectedSubMenu based on the current location (path)
        const path = location.pathname;
        const foundItem = menuItems.find((item, index) => item.path === path || item.subMenu?.some(subItem => subItem.path === path));

        if (foundItem) {
            setSelectedItem(menuItems.indexOf(foundItem));
            // Optionally, set selectedSubMenu if it's a submenu
            const foundSubMenu = foundItem.subMenu?.find((subItem, subIndex) => subItem.path === path);
            if (foundSubMenu) {
                setSelectedSubMenu(foundItem.subMenu.indexOf(foundSubMenu));
            }
        }
    }, [location]);

    const toggleSubMenu = (index) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    const handleItemClick = (index, path) => {
        setSelectedItem(index);
        setSelectedSubMenu(null);
        toggleSubMenu(index);
        if (path) navigate(path); // Navigate to the path
    };

    const handleSubMenuClick = (index, subIndex, path) => {
        setSelectedSubMenu(subIndex);
        setSelectedItem(index);
        if (path) navigate(path); // Navigate to the path
    };

    return (
        <div className={cn('fixed h-screen bg-gray-800 text-white flex flex-col', { 'w-64': !collapsed, 'w-20': collapsed })}>
            <div className="flex items-center justify-between p-4">
                {!collapsed && <span className="text-lg font-semibold">Admin Panel</span>}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="transition-transform ml-auto"
                >
                    {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <Button
                            variant="ghost"
                            className={cn('w-full flex items-center justify-between p-3', {
                                'text-[#FF7918] bg-gray-700': selectedItem === index,
                                'text-white bg-transparent': selectedItem !== index,
                                'hover:text-[#FF7918] hover:bg-gray-600': true,
                            })}
                            onClick={() => handleItemClick(index, item.path)}
                        >
                            <div className="flex items-center">
                                <item.icon className={cn('text-xl mr-3', { 'text-[#FF7918]': selectedItem === index })} />
                                {!collapsed && <span>{item.title}</span>}
                            </div>
                            {!collapsed && item.subMenu && (
                                <span>
                                    {openSubMenu === index ? <FaChevronDown /> : <FaChevronRight />}
                                </span>
                            )}
                        </Button>
                        {item.subMenu && openSubMenu === index && (
                            <div className="ml-6 border-l border-gray-600">
                                {item.subMenu.map((subItem, subIndex) => (
                                    <Button
                                        key={subIndex}
                                        variant="ghost"
                                        className={cn('w-full flex items-center justify-start p-2', {
                                            'text-[#FF7918] bg-gray-600': selectedSubMenu === subIndex,
                                            'text-white bg-transparent': selectedSubMenu !== subIndex,
                                            'hover:text-[#FF7918] hover:bg-gray-600': true,
                                        })}
                                        onClick={() => handleSubMenuClick(index, subIndex, subItem.path)}
                                    >
                                        <subItem.icon className="text-xl mr-3" />
                                        {!collapsed && <span>{subItem.title}</span>}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
