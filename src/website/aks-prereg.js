// import React, { useState, useEffect } from 'react';
// import { CheckIcon } from '@chakra-ui/icons';
// import AnimationRevealPage from 'helpers/AnimationRevealPage';
// import { useHistory } from 'react-router-dom';
// import Feature from "components/features/TwoColSingleFeatureWithStats2-button.js";
// import Header from 'components/headers/light.js';
// import Footer from "components/footers/Home-Footer";
// import { auth, provider, db, storage } from '../firebase/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
// import { onAuthStateChanged } from 'firebase/auth';
// import { getFirestore,doc, setDoc, getDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { Box, Text, Button, Image, Input, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react"; // Import Chakra UI components
// import tw from 'twin.macro';
// const HighlightedText = tw.span`bg-gradient-to-r from-green-300 via-yellow-300 to-blue-200 px-4 text-teal-700  transform -skew-x-12 inline-block font-Philosopher`;

// const PreRegistrationPage = () => {
//     const [user, setUser] = useState(null);
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [rollNo, setRollNo] = useState('');
//     const [name, setName] = useState('');
//     const [phoneNo, setPhoneNo] = useState('');
//     const [email, setEmail] = useState('');
//     const [college, setCollege] = useState('');
//     const [address, setAddress] = useState('');
//     const [interest, setInterest] = useState('');
//     const [akrNum, setAkrNum] = useState(''); // New state for akrNum

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(setUser);
//         return () => unsubscribe();
//     }, []);

//     const handleGoogleSignIn = async () => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             setUser(result.user);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             setUser(null);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         // Validate fields
//         if (!rollNo || !name || !phoneNo  || !college || !address || !interest) {
//             alert("Please fill in all fields.");
//             return;
//         }
    
//         // Check if the name contains valid characters
//         if (!/^[A-Za-z\s]+$/.test(name)) {
//             alert("Name can only contain letters and spaces.");
//             return;
//         }
    
//         // Check if the user is already registered by querying Firestore
//         const existingUserDocRef = query(collection(db, 'prereg'), where("email", "==", user.email));
//         const existingUserDoc = await getDocs(existingUserDocRef);
    
//         if (!existingUserDoc.empty) {
//             const existingDoc = existingUserDoc.docs[0]; // Get the first matching document
//             const akrNum = existingDoc.data().akrNum; // Retrieve the Akshar ID from the document
//             alert(`You have already registered! Your Akshar ID is: ${akrNum}`);
//             setAkrNum(akrNum); // Set the Akshar ID to state to display it later
//             setFormSubmitted(true); // Update form submitted state
//             return; // Exit the function to prevent further processing
//         }
    
//         // Generate a unique Akshar ID
//         const generatedAkrNum = `AKR-${Math.floor(Math.random() * 10000)}`;
//         const userDocRef = doc(db, 'prereg', generatedAkrNum); // Using generatedAkrNum as document ID
    
//         // Set the document in Firestore
//         await setDoc(userDocRef, {
//             rollNo,
//             name,
//             phoneNo,
//             email,
//             college,
//             address,
//             interest,
//             akrNum: generatedAkrNum, // Store the generated akrNum in the document
//         });
    
//         setAkrNum(generatedAkrNum); // Set the generated akrNum to state
//         setFormSubmitted(true);
//     };
    
    
    

//     return (
//         <AnimationRevealPage>
//             <Header />
//             <Box p={5}>
//                 <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={5}>
//                     Pre-Registration for <HighlightedText>Akshar</HighlightedText>
//                 </Text>
    
//                 <Box display="flex" justifyContent="center" mb={5}>
//                     <Image
//                         src="/bg-aksahr.jpg" // Replace with the actual path to your Akshar image
//                         alt="Akshar Festival"
//                         borderRadius="md"
//                         boxSize="600px" // Adjust size as needed
//                         objectFit="contain" // Adjust as necessary
//                     />
//                 </Box>
    
//                 {user ? (
//                     <Box textAlign="center">
//                         <Text fontSize="lg" color="blue.500">Welcome, {user.displayName}</Text>
//                         <Button mt={4} colorScheme="red" onClick={handleLogout}>
//                             Logout
//                         </Button>
    
//                         {/* Registration Form */}
//                         <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
//                             {!formSubmitted ? (
//                                 <form onSubmit={handleSubmit}>
//                                     <FormControl id="rollNo" mb={3} isRequired>
//                                         <FormLabel>Roll No</FormLabel>
//                                         <Input
//                                             placeholder="Enter your roll number"
//                                             value={rollNo}
//                                             onChange={(e) => setRollNo(e.target.value)}
//                                             bg="white"
//                                             required
//                                             maxLength={10}
//                                             width="400px" // Set width here
//                                         />
//                                     </FormControl>
    
//                                     <FormControl id="name" mb={3} isRequired>
//                                         <FormLabel>Name</FormLabel>
//                                         <Input
//                                             placeholder="Enter your name"
//                                             value={name}
//                                             onChange={(e) => setName(e.target.value)}
//                                             bg="white"
//                                             required
//                                             pattern="^[A-Za-z\s]+$"
//                                             title="Name can only contain letters and spaces."
//                                             width="400px" // Set width here
//                                         />
//                                     </FormControl>
    
//                                     <FormControl id="phoneNo" mb={3} isRequired>
//                                         <FormLabel>Phone No</FormLabel>
//                                         <Input
//                                             placeholder="Enter your phone number"
//                                             value={phoneNo}
//                                             onChange={(e) => setPhoneNo(e.target.value)}
//                                             bg="white"
//                                             required
//                                             type="tel"
//                                             pattern="^\d{10}$"
//                                             title="Phone number must be exactly 10 digits."
//                                             maxLength={10}
//                                             width="400px" // Set width here
//                                         />
//                                     </FormControl>
    
//                                     {/* <FormControl id="email" mb={3} isRequired>
//                                         <FormLabel>Email</FormLabel>
//                                         <Input
//                                             placeholder="Enter your email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             type="email"
//                                             bg="white"
//                                             required
//                                             width="400px" // Set width here
//                                         />
//                                     </FormControl> */}
    
//                                     <FormControl id="college" mb={3} isRequired>
//                                         <FormLabel>College</FormLabel>
//                                         <Input
//                                             placeholder="Enter your college name"
//                                             value={college}
//                                             onChange={(e) => setCollege(e.target.value)}
//                                             bg="white"
//                                             required
//                                             width="400px" // Set width here
//                                         />
//                                     </FormControl>
    
//                                     <FormControl id="address" mb={3} isRequired>
//                                         <FormLabel>Address</FormLabel>
//                                         <Input
//                                             placeholder="Enter your address"
//                                             value={address}
//                                             onChange={(e) => setAddress(e.target.value)}
//                                             bg="white"
//                                             required
//                                             width="400px" // Set width here
//                                         />
//                                     </FormControl>
    
//                                     <FormControl id="interest" mb={3} isRequired>
//                                         <FormLabel>Interest in Events</FormLabel>
//                                         <Input
//                                             placeholder="Specify your interest"
//                                             value={interest}
//                                             onChange={(e) => setInterest(e.target.value)}
//                                             bg="white"
//                                             required
//                                             width="400px" // Set width here
//                                         />
//                                     </FormControl>
    
//                                     <Button mt={4} colorScheme="teal" type="submit">Submit</Button>
//                                 </form>
//                             ) : (
//                                 <Box mt={4} display="flex" flexDirection="column" alignItems="center">
//                                     <CheckIcon boxSize={8} color="green.500" />
//                                     <Text>Your registration was successful! Your Akshar ID is: <strong>{akrNum}</strong></Text>
//                                 </Box>
//                             )}
//                         </Box>
//                     </Box>
//                 ) : (
//                     <Box display="flex" flexDirection="column" alignItems="center">
//                         <Button onClick={handleGoogleSignIn} colorScheme="teal" size="lg">
//                             Sign in with Google
//                         </Button>
//                     </Box>
//                 )}
//             </Box>
//             <Footer />
//         </AnimationRevealPage>
//     );
    
// }
// export default PreRegistrationPage;

import React, { useState, useEffect } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import { useHistory } from 'react-router-dom';
import Feature from "components/features/TwoColSingleFeatureWithStats2-button.js";
import Header from 'components/headers/light.js';
import Footer from "components/footers/Home-Footer";
import { auth, provider, db, storage } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    Box,
    VStack,
    FormControl,
    FormLabel,
    Input,
    useToast,
    IconButton,
    Divider,
    Button,
    Heading,
    Image,
    Text,
    Icon,
    HStack,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    Select,
    Radio,
    RadioGroup,
    Table,
    Tbody,
    Tr,
    Td,
    FormHelperText

} from '@chakra-ui/react'; // Import Chakra UI components
import tw from 'twin.macro';
const HighlightedText = tw.span`bg-gradient-to-r from-green-300 via-yellow-300 to-blue-200 px-4 text-teal-700 transform -skew-x-12 inline-block font-Philosopher`;

const PreRegistrationPage = () => {
    const [user, setUser] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [accommodationNeeded, setAccommodationNeeded] = useState("no");
    const [college, setCollege] = useState('');
    const [address, setAddress] = useState('');
    const [interest, setInterest] = useState('');
    const [akrNum, setAkrNum] = useState(''); // New state for akrNum

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                // Check if the user has already registered
                await checkRegistration(user);
            }
        });
        return () => unsubscribe();
    }, []);

    const checkRegistration = async (user) => {
        try {
            // Query Firestore to check if the user has already registered
            const existingUserDocRef = query(collection(db, 'prereg'), where("email", "==", user.email));
            const existingUserDoc = await getDocs(existingUserDocRef);

            if (!existingUserDoc.empty) {
                const existingDoc = existingUserDoc.docs[0]; // Get the first matching document
                const akrNum = existingDoc.data().akrNum; // Retrieve the Akshar ID from the document
                setAkrNum(akrNum); // Set the Akshar ID to state
                setFormSubmitted(true); // Mark the form as submitted
            }
        } catch (error) {
            console.error("Error checking registration:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate fields
        if (!rollNo || !name || !phoneNo  || !college || !address || !interest) {
            alert("Please fill in all fields.");
            return;
        }
    
        // Check if the name contains valid characters
        if (!/^[A-Za-z\s]+$/.test(name)) {
            alert("Name can only contain letters and spaces.");
            return;
        }
    
        // Check if the user is already registered by querying Firestore
        const existingUserDocRef = query(collection(db, 'prereg'), where("email", "==", user.email));
        const existingUserDoc = await getDocs(existingUserDocRef);
    
        if (!existingUserDoc.empty) {
            const existingDoc = existingUserDoc.docs[0]; // Get the first matching document
            const akrNum = existingDoc.data().akrNum; // Retrieve the Akshar ID from the document
            alert(`You have already registered! Your Akshar ID is: ${akrNum}`);
            setAkrNum(akrNum); // Set the Akshar ID to state to display it later
            setFormSubmitted(true); // Update form submitted state
            return; // Exit the function to prevent further processing
        }
    
        // Generate a unique Akshar ID
        const generatedAkrNum = `AKR-${Math.floor(Math.random() * 10000)}`;
        const userDocRef = doc(db, 'prereg', generatedAkrNum); // Using generatedAkrNum as document ID
    
        // Set the document in Firestore
        await setDoc(userDocRef, {
            rollNo,
            name,
            phoneNo,
            email: user.email, // Save user's email from auth
            college,
            address,
            interest,
            akrNum: generatedAkrNum, // Store the generated akrNum in the document
        });
    
        setAkrNum(generatedAkrNum); // Set the generated akrNum to state
        setFormSubmitted(true);
    };

    return (
        <AnimationRevealPage>
            <Header />
            <Box p={5}>
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={5}>
                    Pre-Registration for <HighlightedText>Akshar</HighlightedText>
                </Text>

                <Box display="flex" justifyContent="center" mb={5}>
                    <Image
                        src="/bg-aksahr.jpg" // Replace with the actual path to your Akshar image
                        alt="Akshar Festival"
                        borderRadius="md"
                        boxSize="600px" // Adjust size as needed
                        objectFit="contain" // Adjust as necessary
                    />
                </Box>

                {user ? (
                    <Box textAlign="center">
                        <Text fontSize="lg" color="blue.500">Welcome, {user.displayName}</Text>
                        <Button mt={4} colorScheme="red" onClick={handleLogout}>
                            Logout
                        </Button>

                        {/* Registration Form */}
                        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                            {!formSubmitted ? (
                                <form onSubmit={handleSubmit}>
                                    <FormControl id="rollNo" mb={3} isRequired>
                                        <FormLabel>Roll No</FormLabel>
                                        <Input
                                            placeholder="Enter your roll number"
                                            value={rollNo}
                                            onChange={(e) => setRollNo(e.target.value)}
                                            bg="white"
                                            required
                                            maxLength={10}
                                            width="400px" // Set width here
                                        />
                                    </FormControl>

                                    <FormControl id="name" mb={3} isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            bg="white"
                                            required
                                            pattern="^[A-Za-z\s]+$"
                                            title="Name can only contain letters and spaces."
                                            width="400px" // Set width here
                                        />
                                    </FormControl>
                                    

                                    <FormControl id="phoneNo" mb={3} isRequired>
                                        <FormLabel>Phone No</FormLabel>
                                        <Input
                                            placeholder="Enter your phone number"
                                            value={phoneNo}
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                            bg="white"
                                            required
                                            type="tel"
                                            pattern="^\d{10}$"
                                            title="Phone number must be exactly 10 digits."
                                            maxLength={10}
                                            width="400px" // Set width here
                                        />
                                    </FormControl>

                                    <FormControl id="college" mb={3} isRequired>
                                        <FormLabel>College</FormLabel>
                                        <Input
                                            placeholder="Enter your college name"
                                            value={college}
                                            onChange={(e) => setCollege(e.target.value)}
                                            bg="white"
                                            required
                                            width="400px" // Set width here
                                        />
                                    </FormControl>

                                    <FormControl id="address" mb={3} isRequired>
                                        <FormLabel>Address</FormLabel>
                                        <Input
                                            placeholder="Enter your address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            bg="white"
                                            required
                                            width="400px" // Set width here
                                        />
                                    </FormControl>

                                    <FormControl id="interest" mb={3} isRequired>
                                        <FormLabel>Interest in Events</FormLabel>
                                        <Input
                                            placeholder="Specify your interest"
                                            value={interest}
                                            onChange={(e) => setInterest(e.target.value)}
                                            bg="white"
                                            required
                                            width="400px" // Set width here
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
        <FormLabel>Do you want accommodation?</FormLabel>
        <HStack spacing={4}>
        <RadioGroup onChange={setAccommodationNeeded} value={accommodationNeeded} bg="white">
          <HStack>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </HStack>
        </RadioGroup>
        </HStack>
      </FormControl>

                                    <Button mt={4} colorScheme="teal" type="submit">Submit</Button>
                                </form>
                            ) : (
                                <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                                    <CheckIcon boxSize={8} color="green.500" />
                                    <Text>Your registration was successful! Your Akshar ID is: <strong>{akrNum}</strong></Text>
                                </Box>
                            )}
                        </Box>
                    </Box>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Button onClick={handleGoogleSignIn} colorScheme="teal" size="lg">
                            Sign in with Google
                        </Button>
                    </Box>
                )}
            </Box>
            <Footer />
        </AnimationRevealPage>
    );
}

export default PreRegistrationPage;
