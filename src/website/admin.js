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
//     Text,
//     Button
// } from '@chakra-ui/react';

// const Admin = () => {
//     const [user, setUser] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [registrations, setRegistrations] = useState([]);
//     const history = useHistory();

//     // Allowed Admin Emails
//     const allowedEmails = ['akshar.iitj@gmail.com', 'b22mt019@iitj.ac.in', 'soumenkumar9503@gmail.com'];

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
//             const registrationsCollection = collection(db, 'events'); // 'events' collection
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
//             const registrationDocRef = doc(db, 'events', id); // Use the correct collection name
//             await updateDoc(registrationDocRef, {
//                 status: newStatus === 'true' // Ensure you're storing the correct boolean value
//             });
//             setRegistrations(prevRegistrations => 
//                 prevRegistrations.map(reg => 
//                     reg.id === id ? { ...reg, status: newStatus === 'true' } : reg
//                 )
//             );
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     // CSV export function
//     const exportToCSV = () => {
//         const csvData = [
//             ['MUN ID', 'Team Leader Email', 'Payment Screenshot', 'Status'], // Header
//             ...registrations.map(reg => [
//                 reg.munID,
//                 reg.email,
//                 reg.imageURL ? reg.imageURL : 'No Image',
//                 reg.status ? 'Approved' : 'Pending'
//             ])
//         ];

//         // Check if registrations are present before exporting
//         if (csvData.length <= 1) {
//             alert("No data available to export.");
//             return;
//         }
        
//         // Convert to CSV string
//         const csvString = csvData.map(row => row.join(',')).join('\n');

//         // Create a blob and a link to download the file
//         const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', 'registrations.csv');
//         link.style.visibility = 'hidden';

//         // Append link to the body
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
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
//             <Button 
//                 colorScheme="blue" 
//                 mb={4} 
//                 onClick={exportToCSV}
//             >
//                 Export to CSV
//             </Button>
//             {registrations.length === 0 ? (
//                 <Text>No registrations found.</Text>
//             ) : (
//                 <Table variant="simple">
//                     <Thead>
//                         <Tr>
//                             <Th>MUN ID</Th>
//                             <Th>Name</Th>
//                             <Th>Phone Number</Th>
//                             <Th>Team Leader Email</Th>
//                             <Th>Interested In Akshar</Th>
//                             <Th>Payment Screenshot</Th>
//                             <Th>Status</Th>
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {registrations.map((registration, index) => (
//                             <Tr key={index}>
//                                 <Td>{registration.munID}</Td>
//                                 <Td>{registration.firstName || 'N/A'}</Td> {/* Display name */}
//                                 <Td>{registration.phoneNumber || 'N/A'}</Td> {/* Display phone number */}
//                                 <Td>{registration.email}</Td>
//                                 <Td>{registration.interestedIn || 'N/A'}</Td> {/* Display interested in */}
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
//                                     <select 
//                                         value={registration.status} 
//                                         onChange={(e) => handleStatusChange(registration.id, e.target.value)}
//                                     >
//                                         <option value="false">Pending</option>
//                                         <option value="true">Approved</option>
//                                     </select>
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
//     Text,
//     Button
// } from '@chakra-ui/react';

// const Admin = () => {
//     const [user, setUser] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [registrations, setRegistrations] = useState([]);
//     const history = useHistory();

//     // Allowed Admin Emails
//     const allowedEmails = ['akshar.iitj@gmail.com', 'b22mt019@iitj.ac.in', 'soumenkumar9503@gmail.com'];

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
//             const registrationsCollection = collection(db, 'events'); // Use the 'events' collection
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
//             const registrationDocRef = doc(db, 'events', id); // Use the correct collection name
//             await updateDoc(registrationDocRef, {
//                 status: newStatus === 'true' // Ensure you're storing the correct boolean value
//             });
//             setRegistrations(prevRegistrations => 
//                 prevRegistrations.map(reg => 
//                     reg.id === id ? { ...reg, status: newStatus === 'true' } : reg
//                 )
//             );
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     // CSV export function
//     const exportToCSV = () => {
//         const csvData = [
//             ['MUN ID', 'Name', 'Email', 'Phone', 'Interested In Akshar', 'College', 'Pincode', 'City', 'State', 'Payment Screenshot', 'Status'], // Header
//             ...registrations.map(reg => [
//                 reg.munID,
//                 reg.leaderDetails?.firstName + ' ' + reg.leaderDetails?.lastName,
//                 reg.leaderDetails?.email || reg.email,
//                 reg.leaderDetails?.phone || 'N/A',
//                 reg.interestedInAkshar,
//                 reg.collegeDetails?.collegeName || 'N/A',
//                 reg.collegeDetails?.pincode || 'N/A',
//                 reg.collegeDetails?.city || 'N/A',
//                 reg.collegeDetails?.state || 'N/A',
//                 reg.imageURL ? reg.imageURL : 'No Image',
//                 reg.status ? 'Approved' : 'Pending'
//             ])
//         ];

//         // Check if registrations are present before exporting
//         if (csvData.length <= 1) {
//             alert("No data available to export.");
//             return;
//         }
        
//         // Convert to CSV string
//         const csvString = csvData.map(row => row.join(',')).join('\n');

//         // Create a blob and a link to download the file
//         const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', 'registrations.csv');
//         link.style.visibility = 'hidden';

//         // Append link to the body
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
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
//             <Button 
//                 colorScheme="blue" 
//                 mb={4} 
//                 onClick={exportToCSV}
//             >
//                 Export to CSV
//             </Button>
//             {registrations.length === 0 ? (
//                 <Text>No registrations found.</Text>
//             ) : (
//                 <Table variant="simple">
//                     <Thead>
//                         <Tr>
//                             <Th>MUN ID</Th>
//                             <Th>Name</Th>
//                             <Th>Email</Th>
//                             <Th>Phone</Th>
//                             <Th>Interested In Akshar</Th>
//                             <Th>College</Th>
//                             <Th>Pincode</Th>
//                             <Th>City</Th>
//                             <Th>State</Th>
//                             <Th>Payment Screenshot</Th>
//                             <Th>Status</Th>
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {registrations.map((registration, index) => (
//                             <Tr key={index}>
//                                 <Td>{registration.munID}</Td>
//                                 <Td>{registration.leaderDetails?.firstName + ' ' + registration.leaderDetails?.lastName}</Td>
//                                 <Td>{registration.leaderDetails?.email || registration.email}</Td>
//                                 <Td>{registration.leaderDetails?.phone || 'N/A'}</Td>
//                                 <Td>{registration.interestedInAkshar}</Td>
//                                 <Td>{registration.collegeDetails?.collegeName || 'N/A'}</Td>
//                                 <Td>{registration.collegeDetails?.pincode || 'N/A'}</Td>
//                                 <Td>{registration.collegeDetails?.city || 'N/A'}</Td>
//                                 <Td>{registration.collegeDetails?.state || 'N/A'}</Td>
//                                 <Td>
//                                     {registration.imageURL ? (
//                                         <a href={registration.imageURL} target="_blank" rel="noopener noreferrer">
//                                             View Image
//                                         </a>
//                                     ) : (
//                                         'No Image'
//                                     )}
//                                 </Td>
//                                 <Td>
//                                     <select 
//                                         value={registration.status} 
//                                         onChange={(e) => handleStatusChange(registration.id, e.target.value)}
//                                     >
//                                         <option value="false">Pending</option>
//                                         <option value="true">Approved</option>
//                                     </select>
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
import { auth, db, storage } from '../firebase/firebase'; // Import storage
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage'; // Import necessary methods
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
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react';

const Admin = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState([]);
    const [preregistrations, setPreregistrations] = useState([]);
    const history = useHistory();

    // Allowed Admin Emails
    const allowedEmails = ['akshar.iitj@gmail.com', 'b22mt019@iitj.ac.in', 'soumenkumar9503@gmail.com'];

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && allowedEmails.includes(currentUser.email)) {
                setIsAdmin(true);
                fetchRegistrations();
                fetchPreregistrations();
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
            const registrationList = await Promise.all(
                registrationSnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const imageURL = data.imageURL ? await getDownloadURL(ref(storage, data.imageURL)) : null; // Get image URL from storage
                    return {
                        id: doc.id,
                        ...data,
                        imageURL // Include the fetched image URL
                    };
                })
            );
            setRegistrations(registrationList);
        } catch (error) {
            console.error("Error fetching registrations:", error);
        }
    };

    // Fetch all preregistrations for Akshar
    const fetchPreregistrations = async () => {
        try {
            const preregCollection = collection(db, 'prereg'); // Use the 'prereg' collection
            const preregSnapshot = await getDocs(preregCollection);
            const preregList = preregSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPreregistrations(preregList);
        } catch (error) {
            console.error("Error fetching preregistrations:", error);
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

    // CSV export function for MUN registrations
    const exportToCSV = () => {
        const csvData = [
            ['MUN ID', 'Name', 'Email', 'Phone', 'Interested In Akshar', 'College', 'Pincode', 'City', 'State', 'Payment Screenshot', 'Status'], // Header
            ...registrations.map(reg => [
                reg.munID,
                reg.leaderDetails?.firstName + ' ' + reg.leaderDetails?.lastName,
                reg.leaderDetails?.email || reg.email,
                reg.leaderDetails?.phone || 'N/A',
                reg.interestedInAkshar,
                reg.collegeDetails?.collegeName || 'N/A',
                reg.collegeDetails?.pincode || 'N/A',
                reg.collegeDetails?.city || 'N/A',
                reg.collegeDetails?.state || 'N/A',
                reg.imageURL || 'No Image', // Updated to use the fetched image URL
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

    // CSV export function for Akshar preregistrations
    const exportPreregToCSV = () => {
        const csvData = [
            ['Akshar ID', 'Name', 'Email', 'Phone', 'College', 'Status'], // Header
            ...preregistrations.map(prereg => [
                prereg.akrNum,
                prereg.name,
                prereg.email,
                prereg.phoneNo || 'N/A',
                prereg.college || 'N/A',
                prereg.status ? 'Approved' : 'Pending'
            ])
        ];

        // Check if preregistrations are present before exporting
        if (csvData.length <= 1) {
            alert("No preregistrations available to export.");
            return;
        }
        
        // Convert to CSV string
        const csvString = csvData.map(row => row.join(',')).join('\n');

        // Create a blob and a link to download the file
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'preregistrations.csv');
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
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Akshar Sabha</Tab>
                    <Tab>Akshar</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Button 
                            colorScheme="blue" 
                            mb={4} 
                            onClick={exportToCSV}
                        >
                            Export MUN Registrations to CSV
                        </Button>
                        {registrations.length === 0 ? (
                            <Text>No registrations found.</Text>
                        ) : (
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>MUN ID</Th>
                                        <Th>Name</Th>
                                        <Th>Email</Th>
                                        <Th>Phone</Th>
                                        <Th>Interested In Akshar</Th>
                                        <Th>College</Th>
                                        <Th>Pincode</Th>
                                        <Th>City</Th>
                                        <Th>State</Th>
                                        <Th>Payment Screenshot</Th>
                                        <Th>Status</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {registrations.map((registration, index) => (
                                        <Tr key={index}>
                                            <Td>{registration.munID}</Td>
                                            <Td>{registration.leaderDetails?.firstName + ' ' + registration.leaderDetails?.lastName}</Td>
                                            <Td>{registration.leaderDetails?.email || registration.email}</Td>
                                            <Td>{registration.leaderDetails?.phone || 'N/A'}</Td>
                                            <Td>{registration.interestedInAkshar}</Td>
                                            <Td>{registration.collegeDetails?.collegeName || 'N/A'}</Td>
                                            <Td>{registration.collegeDetails?.pincode || 'N/A'}</Td>
                                            <Td>{registration.collegeDetails?.city || 'N/A'}</Td>
                                            <Td>{registration.collegeDetails?.state || 'N/A'}</Td>
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
                    </TabPanel>
                    <TabPanel>
                        <Button 
                            colorScheme="blue" 
                            mb={4} 
                            onClick={exportPreregToCSV}
                        >
                            Export Akshar Registrations to CSV
                        </Button>
                        {preregistrations.length === 0 ? (
                            <Text>No preregistrations found.</Text>
                        ) : (
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Akshar ID</Th>
                                        <Th>Name</Th>
                                        <Th>Email</Th>
                                        <Th>Phone</Th>
                                        <Th>College</Th>
                                        <Th>Status</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {preregistrations.map((preregistration, index) => (
                                        <Tr key={index}>
                                            <Td>{preregistration.akrNum}</Td>
                                            <Td>{preregistration.name}</Td>
                                            <Td>{preregistration.email}</Td>
                                            <Td>{preregistration.phoneNo || 'N/A'}</Td>
                                            <Td>{preregistration.college || 'N/A'}</Td>
                                            <Td>{preregistration.status ? 'Approved' : 'Pending'}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Admin;


