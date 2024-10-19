// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../firebase/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
// import { useHistory } from 'react-router-dom';
// import {
//     Box,
//     Heading,
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     Spinner,
//     Text
// } from '@chakra-ui/react';

// const Admin = () => {
//     const [user, setUser] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [registrations, setRegistrations] = useState([]);
//     const history = useHistory();

//     // Allowed Admin Emails
//     const allowedEmails = ['smvarshit@gmail.com', 'sriganeshthota12345@gmail.com', 'aaftaab@iitj.ac.in', 'b22mt019@iitj.ac.in', 'soumenkumar9503@gmail.com'];

//     // Listen for authentication state changes
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             if (currentUser && allowedEmails.includes(currentUser.email)) {
//                 setIsAdmin(true);
//                 fetchRegistrations();
//             } else {
//                 setIsAdmin(false);
//             }
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     // Fetch all users registered for MUN
//     const fetchRegistrations = async () => {
//         try {
//             const registrationsCollection = collection(db, 'users');
//             const registrationSnapshot = await getDocs(registrationsCollection);
//             const registrationList = registrationSnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setRegistrations(registrationList);
//         } catch (error) {
//             console.error("Error fetching registrations:", error);
//         }
//     };

//     const handleStatusChange = async (id, newStatus) => {
//         try {
//             const registrationDocRef = doc(db, 'users', id);
//             await updateDoc(registrationDocRef, {
//                 status: newStatus
//             });
//             setRegistrations(prevRegistrations => 
//                 prevRegistrations.map(reg => 
//                     reg.id === id ? { ...reg, status: newStatus } : reg
//                 )
//             );
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     // If the user is not an admin, redirect to a "not authorized" page or home
//     if (!loading && !isAdmin) {
//         history.push('/');
//         return null;
//     }

//     // Show a loading spinner while data is being fetched
//     if (loading) {
//         return <Spinner size="xl" />;
//     }

//     return (
//         <Box p={5} maxW="1200px" mx="auto">
//             <Heading as="h2" mb={6} textAlign="center">Admin Panel</Heading>
//             {registrations.length === 0 ? (
//                 <Text>No registrations found.</Text>
//             ) : (
//                 <Table variant="simple">
//                     <Thead>
//                         <Tr>
//                             <Th>MUN ID</Th>
//                             <Th>Team Leader Email</Th>
//                             <Th>Payment Screenshot</Th>
//                             <Th>Status</Th>
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {registrations.map((registration, index) => (
//                             <Tr key={index}>
//                                 <Td>{registration.munID}</Td>
//                                 <Td>{registration.email}</Td>
//                                 <Td>
//                                     {registration.imageURL ? (
//                                     <a href={registration.imageURL} target="_blank" rel="noopener noreferrer">
//                                         View Image
//                                     </a>
//                                     ) : (
//                                         'No Image'
//                                     )}
//                                 </Td>
//                                 <Td>
//                                 <select 
//                                     value={registration.status} 
//                                     onChange={(e) => handleStatusChange(registration.id, e.target.value)}
//                                 >
//                                     <option value="false">Pending</option>
//                                     <option value="true">Approved</option>
//                                 </select>
//                                 </Td>
//                             </Tr>
//                         ))}
//                     </Tbody>
//                 </Table>
//             )}
//         </Box>
//     );
// };

// export default Admin;

import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Text,
    Button
} from '@chakra-ui/react';

const Admin = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState([]);
    const history = useHistory();

    // Allowed Admin Emails
    const allowedEmails = ['aaftaab@iitj.ac.in', 'b22mt019@iitj.ac.in', 'soumenkumar9503@gmail.com'];

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && allowedEmails.includes(currentUser.email)) {
                setIsAdmin(true);
                fetchRegistrations();
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Fetch all users registered for MUN
    const fetchRegistrations = async () => {
        try {
            const registrationsCollection = collection(db, 'events'); // Use the 'events' collection
            const registrationSnapshot = await getDocs(registrationsCollection);
            const registrationList = registrationSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRegistrations(registrationList);
        } catch (error) {
            console.error("Error fetching registrations:", error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const registrationDocRef = doc(db, 'events', id); // Use the correct collection name
            await updateDoc(registrationDocRef, {
                status: newStatus === 'true' // Ensure you're storing the correct boolean value
            });
            setRegistrations(prevRegistrations => 
                prevRegistrations.map(reg => 
                    reg.id === id ? { ...reg, status: newStatus === 'true' } : reg
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // CSV export function
    const exportToCSV = () => {
        const csvData = [
            ['MUN ID', 'Team Leader Email', 'Payment Screenshot', 'Status'], // Header
            ...registrations.map(reg => [
                reg.munID,
                reg.email,
                reg.imageURL ? reg.imageURL : 'No Image',
                reg.status ? 'Approved' : 'Pending'
            ])
        ];

        // Check if registrations are present before exporting
        if (csvData.length <= 1) {
            alert("No data available to export.");
            return;
        }
        
        // Convert to CSV string
        const csvString = csvData.map(row => row.join(',')).join('\n');

        // Create a blob and a link to download the file
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'registrations.csv');
        link.style.visibility = 'hidden';

        // Append link to the body
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // If the user is not an admin, redirect to a "not authorized" page or home
    if (!loading && !isAdmin) {
        history.push('/');
        return null;
    }

    // Show a loading spinner while data is being fetched
    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Box p={5} maxW="1200px" mx="auto">
            <Heading as="h2" mb={6} textAlign="center">Admin Panel</Heading>
            <Button 
                colorScheme="blue" 
                mb={4} 
                onClick={exportToCSV}
            >
                Export to CSV
            </Button>
            {registrations.length === 0 ? (
                <Text>No registrations found.</Text>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>MUN ID</Th>
                            <Th>Team Leader Email</Th>
                            <Th>Payment Screenshot</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {registrations.map((registration, index) => (
                            <Tr key={index}>
                                <Td>{registration.munID}</Td>
                                <Td>{registration.email}</Td>
                                <Td>
                                    {registration.imageURL ? (
                                    <a href={registration.imageURL} target="_blank" rel="noopener noreferrer">
                                        View Image
                                    </a>
                                    ) : (
                                        'No Image'
                                    )}
                                </Td>
                                <Td>
                                    <select 
                                        value={registration.status} 
                                        onChange={(e) => handleStatusChange(registration.id, e.target.value)}
                                    >
                                        <option value="false">Pending</option>
                                        <option value="true">Approved</option>
                                    </select>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

export default Admin;
