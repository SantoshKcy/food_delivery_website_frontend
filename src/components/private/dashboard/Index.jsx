import { Card } from "@/components/ui/card";
import { DollarSign, LayoutDashboard, List, ShoppingBag, User } from 'lucide-react';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
    const data = [
        { name: 'Jan', orders: 400, revenue: 2400 },
        { name: 'Feb', orders: 300, revenue: 2210 },
        { name: 'Mar', orders: 200, revenue: 2290 },
        { name: 'Apr', orders: 278, revenue: 2000 },
        { name: 'May', orders: 189, revenue: 2181 },
        { name: 'Jun', orders: 239, revenue: 2500 },
    ];

    const pieData = [
        { name: 'Burgers', value: 400 },
        { name: 'Pizza', value: 300 },
        { name: 'Pasta', value: 300 },
        { name: 'Drinks', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="p-3 space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold">
                <LayoutDashboard size={28} />
                Dashboard
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 flex items-center gap-4 bg-blue-100 shadow-md">
                    <User size={32} />
                    <div>
                        <h2 className="text-lg font-semibold">Users</h2>
                        <p className="text-xl font-bold">1,200</p>
                    </div>
                </Card>
                <Card className="p-4 flex items-center gap-4 bg-green-100 shadow-md">
                    <ShoppingBag size={32} />
                    <div>
                        <h2 className="text-lg font-semibold">Orders</h2>
                        <p className="text-xl font-bold">350</p>
                    </div>
                </Card>
                <Card className="p-4 flex items-center gap-4 bg-yellow-100 shadow-md">
                    <DollarSign size={32} />
                    <div>
                        <h2 className="text-lg font-semibold">Revenue</h2>
                        <p className="text-xl font-bold">$4,500</p>
                    </div>
                </Card>
                <Card className="p-4 flex items-center gap-4 bg-red-100 shadow-md">
                    <List size={32} />
                    <div>
                        <h2 className="text-lg font-semibold">Menu Items</h2>
                        <p className="text-xl font-bold">45</p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                <Card className="p-4 shadow-md col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Orders and Revenue</h2>
                    <BarChart width={600} height={300} data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="orders" fill="#8884d8" />
                        <Bar dataKey="revenue" fill="#82ca9d" />
                    </BarChart>
                </Card>
                <Card className="p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Top Categories</h2>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={({ name }) => name} // This will display the category name on the pie slices
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Top Selling Foods</h2>
                    <ul className="list-disc ml-4">
                        <li>Burger - 120 orders</li>
                        <li>Pizza - 95 orders</li>
                        <li>Pasta - 80 orders</li>
                        <li>Sushi - 75 orders</li>
                    </ul>
                </Card>
                <Card className="p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Top Rated Foods</h2>
                    <ul className="list-disc ml-4">
                        <li>Grilled Chicken - 4.9/5</li>
                        <li>Vegan Salad - 4.8/5</li>
                        <li>Margherita Pizza - 4.7/5</li>
                        <li>Cheeseburger - 4.6/5</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
