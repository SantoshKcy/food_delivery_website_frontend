import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

const User = () => {
    const [customers, setCustomers] = useState([
        { _id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', joined: '2024-01-10', role: 'Admin' },
        { _id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 987 654 321', joined: '2024-02-15', role: 'Customer' },
        { _id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 555 666 777', joined: '2024-03-05', role: 'Customer' },
    ]);

    return (
        <div className="max-w-7xl mx-auto p-3">
            <h2 className="text-xl font-medium text-left text-black mb-8 flex items-center space-x-2">
                <FaUser className="text-gray-500" />
                <span>Customer Details</span>
            </h2>
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Phone</th>
                        <th className="py-2 px-4 text-left">Joined Date</th>
                        <th className="py-2 px-4 text-left">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer._id} className="border-b">
                            <td className="py-2 px-4 flex items-center space-x-2"><FaUser className="text-gray-500" />{customer.name}</td>
                            <td className="py-2 px-4">{customer.email}</td>
                            <td className="py-2 px-4">{customer.phone}</td>
                            <td className="py-2 px-4">{customer.joined}</td>
                            <td className="py-2 px-4">{customer.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default User;
