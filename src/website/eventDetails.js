
// import { DeleteIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
// import { FcGoogle } from "react-icons/fc";

// function goBackToEvents(history) {
//     history.push("/events")
//     history.go(0)
// }

// function Events() {
//     const location = useLocation();
//     const card = location.state;
//     const history = useHistory();
//     const toast = useToast();

//     if (!card) goBackToEvents(history, card);

//     const [user, setUser] = useState(null);
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [munID, setMunID] = useState('');
//     const [status, setStatus] = useState('');
//     const [page, setPage] = useState(1);
    
//     const [leaderDetails, setLeaderDetails] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         college: ''
//     });

//     const [teamMembers, setTeamMembers] = useState([]);
//     const [file, setFile] = useState(null);
//     const [qrCodeURL, setQrCodeURL] = useState(null);
//     const [price, setPrice] = useState(null);

//     const signInWithGoogle = async () => {
//         try {
//         const result = await signInWithPopup(auth, provider);
//         setUser(result.user);
//         await checkIfFormSubmitted(result.user.uid); // Check if the user has already submitted the form
//         } catch (error) {
//         console.error("Error during Google sign-in:", error);
//         }
//     };

//     const handleLeaderChange = (e) => {
//         const { name, value } = e.target;
//         setLeaderDetails((prevDetails) => ({
//             ...prevDetails,
//             [name]: value
//         }));
//     };

//     const handleTeamMemberChange = (index, event) => {
//         const { name, value } = event.target;
//         const members = [...teamMembers];
//         members[index][name] = value;
//         setTeamMembers(members);
//     };

//     const addTeamMember = () => {
//         if (teamMembers.length < 2) {
//             setTeamMembers([...teamMembers, { name: '', address: '', phone: '', college: '' }]);
//         }
//     };

//     const removeTeamMember = (index) => {
//         const members = teamMembers.filter((_, memberIndex) => memberIndex !== index);
//         setTeamMembers(members);
//     };

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);
//                 await checkIfFormSubmitted(currentUser.uid);
//             }
//         });
//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         if (user) {
//             if (teamMembers.length >= 0) {
//             const storage = getStorage();
//             let qrFileName = 'QR1.png'; // Default for team size 1
        
//             if (teamMembers.length === 1) {
//                 qrFileName = 'QR2.png'; // For team size 2
//             } else if (teamMembers.length === 2) {
//                 qrFileName = 'QR3.png'; // For team size 3
//             }
        
//             const qrRef = ref(storage, `qr_codes/${qrFileName}`);

//             checkPrice();

//             getDownloadURL(qrRef)
//                 .then((url) => {
//                 setQrCodeURL(url); // Set the QR code URL based on team size
//                 })
//                 .catch((error) => {
//                 console.error('Error fetching QR code:', error);
//                 });
//             }
//         }
//       }, [teamMembers]); // This will run whenever the team size changes

//     const handleFileChange = (e) => {
//         e.preventDefault();
//         setFile(e.target.files[0]);
//     };

//     const checkPrice = async () => {
//         const docRef = doc(db, 'id', 'prices');
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//             if (teamMembers.length == 0) {
//                 setPrice(docSnap.data().one);
//             }
//             else if (teamMembers.length == 1) {
//                 setPrice(docSnap.data().two);
//             }
//             else if (teamMembers.length == 2) {
//                 setPrice(docSnap.data().three);
//             }
//         }
//     };

//     const checkIfFormSubmitted = async (userId) => {
//         const docRef = doc(db, 'users', userId);
//         try {
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//                 const data = docSnap.data();
//                 setFormSubmitted(true);
//                 setMunID(data.munID);
//                 setStatus(data.status);
//             } else {
//                 console.log("No such document!");
//             }
//         } catch (e) {
//             console.error("Error fetching document:", e);
//         }
//     };
    
//     // To ensure you capture state updates:
//     useEffect(() => {
//         if (munID || status) {
//             console.log("Updated status:", status);
//             console.log("Updated MUN ID:", munID);
//         }
//     }, [status, munID]); // This effect will run when status or munID change
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!user) {
//             alert("Please sign in with Google to submit the form.");
//             return;
//         }

//     try {
// 		const userId = user.uid;
//         const idDoc = doc(db, "id", "id");
//         const idSnap = await getDoc(idDoc);
//         const atomicID = idSnap.data().id;
//         const todaysDate = new Date();
//         const munID = `MUN-${todaysDate.getMonth()+1}${todaysDate.getDate()}${atomicID + 1}`; // Generate a unique MUN ID

//         let imageURL = null;
//         if (file) {
//             const storage = getStorage();
//             const storageRef = ref(
//               storage,
//               `payment_screenshots/${userId}/${file.name}`
//             );
//             await uploadBytes(storageRef, file);
//             imageURL = await getDownloadURL(storageRef);
//         }
//             // Submit the leader and team member details
//             await setDoc(doc(db, 'users', userId), {
//                 leaderDetails,
//                 teamMembers,
//                 email: user.email,
//                 uid: userId,
//                 munID,
//                 status: false,
//                 imageURL
//             });
        
//             await setDoc(idDoc, {
//                 id: atomicID + 1
//             });

//             setFormSubmitted(true);
//             setMunID(munID);

//             toast({
//                 title: 'Registration Successful.',
//                 description: 'Your team details have been recorded.',
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//             });
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };

//     // Check if user is signed in on page load
//     useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//         if (currentUser) {
//         setUser(currentUser);
//         } else {
//         setUser(null);
//         }
//     });
//     return () => unsubscribe();
//     }, []);

//     return (
//         <AnimationRevealPage>
//             <Header />
//             <Feature 
//                 subheading={card.date}
//                 heading={card.title}
//                 description={card.description ? card.description : null}
//                 imageSrc={card.imageSrc}
//                 primaryButtonText="Register Now!"
//                 registrableEvent={card.registrableEvent ? card.registrableEvent : false}
//                 linkss={card.linkss ? card.linkss : "" }
//                 linkss1={card.linkss1 ? card.linkss1 : "" }
//                 timing ={card.timing === "Online Event" ? true : false}
//                 minTeamSize={card.minTeamSize ? card.minTeamSize : 1}
//                 maxTeamSize={card.maxTeamSize ? card.maxTeamSize : 1}
//                 prize={card.prize ? card.prize : ""}
//                 isFlagship={card.isFlagship ? card.isFlagship : true}
//                 rulebookLink={card.rulebookLink ? card.rulebookLink : ""}
//             />

//             <Box p={5} border="0px solid" borderColor="gray.300" borderRadius="8px" maxWidth="600px" margin="auto" bg="transparent">
//                 {user ? (
//                     formSubmitted ? (
//                         <Box textAlign="center">
//                             <Heading as="h3" size="lg" color="blue.500">Application Status</Heading>
//                             <Text>Your MUN ID: {munID}</Text>

//                             {status === 'true' ? (
//                                 <VStack mt={4}>
//                                     <Icon as={CheckCircleIcon} w={10} h={10} color="red" />
//                                     <Text fontSize="lg" color="green.600">Your application is approved!</Text>
//                                 </VStack>
//                             ) : (
//                                 <VStack mt={4}>
//                                     <Icon as={WarningIcon} w={10} h={10} color="red.500" />
//                                     <Text fontSize="lg" color="red.600">Your application is being reviewed.</Text>
//                                 </VStack>
//                             )}

//                             <Text>
//                                 For any Query Contact +91 9509615569
//                             </Text>
//                         </Box>
//                     ) : (
//                         <form onSubmit={handleSubmit}>
//                         <VStack spacing={4}>
//                             {page === 1 && (
//                             <>
//                                 <Heading as="h2" size="lg" color="blue.500">Team Leader Details</Heading>
//                                 <FormControl isRequired>
//                                     <FormLabel>Team Leader Name</FormLabel>
//                                     <Input name="name" value={leaderDetails.name} onChange={handleLeaderChange} bg="red" borderColor="green.300" _hover={{ borderColor: 'green.500' }} />
//                                 </FormControl>
//                                 <FormControl isRequired>
//                                     <FormLabel>Team Leader Email</FormLabel>
//                                     <Input name="email" value={leaderDetails.email} onChange={handleLeaderChange} bg="orange.50" borderColor="green.300" _hover={{ borderColor: 'green.500' }} />
//                                 </FormControl>
//                                 <FormControl isRequired>
//                                     <FormLabel>Team Leader Phone</FormLabel>
//                                     <Input name="phone" value={leaderDetails.phone} onChange={handleLeaderChange} bg="orange.50" borderColor="green.300" _hover={{ borderColor: 'green.500' }} />
//                                 </FormControl>
//                                 <FormControl isRequired>
//                                     <FormLabel>Team Leader College Name</FormLabel>
//                                     <Input name="college" value={leaderDetails.college} onChange={handleLeaderChange} bg="orange.50" borderColor="green.300" _hover={{ borderColor: 'green.500' }} />
//                                 </FormControl>

//                                 <Divider borderColor="gray.300" />

//                                 <Heading as="h3" size="md" color="blue.500">Team Members (Max 2)</Heading>
//                                 {teamMembers.map((member, index) => (
//                                 <VStack key={index} spacing={4} border="1px solid" borderColor="blue.200" borderRadius="8px" p={4} mb={4} width="100%" bg="blue.50">
//                                     <FormControl isRequired>
//                                         <FormLabel>Member Name</FormLabel>
//                                         <Input name="name" value={member.name} onChange={(e) => handleTeamMemberChange(index, e)} bg="orange.50" borderColor="blue.300" _hover={{ borderColor: 'blue.500' }} />
//                                     </FormControl>
//                                     <FormControl isRequired>
//                                         <FormLabel>Member Address</FormLabel>
//                                         <Input name="address" value={member.address} onChange={(e) => handleTeamMemberChange(index, e)} bg="orange.50" borderColor="blue.300" _hover={{ borderColor: 'blue.500' }} />
//                                     </FormControl>
//                                     <FormControl isRequired>
//                                         <FormLabel>Member Phone</FormLabel>
//                                         <Input name="phone" value={member.phone} onChange={(e) => handleTeamMemberChange(index, e)} bg="orange.50" borderColor="blue.300" _hover={{ borderColor: 'blue.500' }} />
//                                     </FormControl>
//                                     <FormControl isRequired>
//                                         <FormLabel>Member College Name</FormLabel>
//                                         <Input name="college" value={member.college} onChange={(e) => handleTeamMemberChange(index, e)} bg="orange.50" borderColor="blue.300" _hover={{ borderColor: 'blue.500' }} />
//                                     </FormControl>
//                                     <IconButton icon={<DeleteIcon />} aria-label="Remove Team Member" onClick={() => removeTeamMember(index)} />
//                                 </VStack>
//                                 ))}

//                                 <Button onClick={addTeamMember} disabled={teamMembers.length >= 2} colorScheme="blue">
//                                     Add Team Member
//                                 </Button>

//                                 <HStack>
//                                 <Button onClick={() => setPage(2)} colorScheme="green">
//                                     Next
//                                 </Button>
//                                 </HStack>
//                             </>
//                             )}

//                             {page === 2 && (
//                             <>
//                                 <Heading as="h3" size="md" color="blue.500">Scan QR Code to proceed with Payment</Heading>
//                                 <Box textAlign="center">
//                                     {qrCodeURL ? (
//                                         <Image src={qrCodeURL} alt="QR Code" boxSize="150px" m="auto" />
//                                     ) : (
//                                         <Text>Loading QR Code...</Text>
//                                     )}
//                                     <Text> Price: {price} </Text>
//                                 </Box>

//                                 <FormControl isRequired>
//                                 <FormLabel>Upload Payment Screenshot</FormLabel>
//                                 <Input name='file' onChange={handleFileChange} accept='image/*' type='file'></Input>
//                                 </FormControl>

//                                 <Divider borderColor="gray.300" />

//                                 <HStack width="100%">
//                                 <Button onClick={() => setPage(1)} colorScheme="blue" width="50%">
//                                     Back
//                                 </Button>
//                                 <Button type="submit" colorScheme="green" width="50%">
//                                     Submit
//                                 </Button>
//                                 </HStack>
//                             </>
//                             )}
//                         </VStack>
//                         </form>
//                     )
//                 ) : (
//                     <Box display="flex" justifyContent="center" alignItems="center">
//                     <Button 
//                         onClick={signInWithGoogle} 
//                         leftIcon={<FcGoogle />} 
//                         colorScheme="teal" 
//                         variant="solid" 
//                         size="lg"
//                         boxShadow="lg"
//                         _hover={{ backgroundColor: "teal.400" }}
//                     >
//                         <Text fontSize="lg" fontWeight="bold">
//                             Register to participate
//                         </Text>
//                     </Button>
//                 </Box>
//                     // <div>
//                     //     <button onClick={signInWithGoogle}>Register to participate</button>
//                     // </div>
//                 )}
//             </Box>
//             <Footer />
//         </AnimationRevealPage>
//     );
// }

// export default Events;

import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import { useState, useEffect } from 'react';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Feature from "components/features/TwoColSingleFeatureWithStats2-button.js";
import Header from 'components/headers/light.js';
import Footer from "components/footers/Home-Footer";
//import { FcGoogle } from 'react-icons/fc';
import { auth, provider, db, storage } from '../firebase/firebase';
import { getAuth,signInWithPopup, signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, where, getDocs } from 'firebase/firestore';
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

} from '@chakra-ui/react';
import { DeleteIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { FcGoogle } from "react-icons/fc";

function goBackToEvents(history) {
    history.push("/events");
    history.go(0);
}

function Events() {
    const location = useLocation();
    const card = location.state;
    const history = useHistory();
    const toast = useToast();
    

    if (!card) goBackToEvents(history);

    const [accommodationNeeded, setAccommodationNeeded] = useState("no");
    const [user, setUser] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [munID, setMunID] = useState('');
    const [status, setStatus] = useState('');
    //const [teamMembers, setTeamMembers] = useState([]);
    const [file, setFile] = useState(null);
    const [qrCodeURL, setQrCodeURL] = useState(null);
    const [price, setPrice] = useState(null);
    const [teamMembers, setTeamMembers] = useState([
        { name: '', rollNo: '', email: '' },
        { name: '', rollNo: '', email: '' },
        { name: '', rollNo: '', email: '' },
    ]);
  const [numberOfTeamMembers, setNumberOfTeamMembers] = useState(0);
  const [interestedInAkshar, setInterestedInAkshar] = useState('');

    const [leaderDetails, setLeaderDetails] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        alternatePhone: '',
        gender: '',
        redId: ''
    });

    const [collegeDetails, setCollegeDetails] = useState({
        collegeName: '',
        state: '',
        city: '',
        areaType: '',
        pincode: ''
    });

    const [activeTabIndex, setActiveTabIndex] = useState(0); // State to track active tab

    const handleNextClick = () => {
        if (activeTabIndex < 3) { // Assuming there are 4 tabs (0-3)
            setActiveTabIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousClick = () => {
        if (activeTabIndex > 0) { // Prevent going below 0
            setActiveTabIndex((prevIndex) => prevIndex - 1);
        }
    };

    // const [activeTabIndex, setActiveTabIndex] = useState(0);

        // Handler for name fields to allow only alphabetic characters and spaces
        const handleNameChange = (e) => {
            const { name, value } = e.target;
            const regex = /^[a-zA-Z\s]*$/; // Regex to match only letters and spaces
            if (regex.test(value) || value === '') {
                setLeaderDetails((prevDetails) => ({
                    ...prevDetails,
                    [name]: value,
                }));
            }
        };
    
        // Handler for phone fields to allow only 10-digit numbers
        const handlePhoneChange = (e) => {
            const { name, value } = e.target;
            const regex = /^\d{0,10}$/; // Regex to match only digits (max 10)
            if (regex.test(value)) {
                setLeaderDetails((prevDetails) => ({
                    ...prevDetails,
                    [name]: value,
                }));
            }
        };

    const checkIfFormSubmitted = async (userId) => {
        try {
            const userDoc = doc(db, "users", userId);
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                // The form was already submitted by this user
                setFormSubmitted(true);
                setMunID(userSnap.data().munID); // Retrieve MUN ID if needed
                setStatus(userSnap.data().status); // Retrieve application status if needed
            } else {
                // No form submission found for this user
                setFormSubmitted(false);
            }
        } catch (error) {
            console.error("Error checking form submission:", error);
        }
    }; 
     // Handle user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Google Sign-In function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast({
        title: "Sign-in successful.",
        description: `Welcome, ${result.user.displayName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Sign-in failed.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast({
        title: "Signed out.",
        description: "You have successfully signed out.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Sign-out failed.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setLeaderDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
    }));
};


    const handleCollegeChange = (e) => {
        const { name, value } = e.target;
        setCollegeDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleTeamMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTeamMembers = [...teamMembers];
        updatedTeamMembers[index] = { ...updatedTeamMembers[index], [name]: value };
        setTeamMembers(updatedTeamMembers);
    };

    // const addTeamMember = () => {
    //     if (teamMembers.length < numberOfTeamMembers) {
    //         setTeamMembers([...teamMembers, { name: '', rollNo: '', phone: '' }]);
    //     }
    // };

    const handleScreenshotUpload = async (file) => {
        if (!file) {
          toast({
            title: "No file selected.",
            description: "Please select a file to upload.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      
        try {
          // Create a reference to the storage location
          const storageRef = ref(storage, `screenshots/${user.uid}/${file.name}`);
      
          // Upload the file to Firebase Storage
          const snapshot = await uploadBytes(storageRef, file);
      
          // Get the download URL after upload is complete
          const downloadURL = await getDownloadURL(snapshot.ref);
      
          toast({
            title: "Upload successful!",
            description: "Your screenshot has been uploaded.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
      
          console.log("Screenshot uploaded:", downloadURL);
      
          // Optionally, you can store the download URL in Firestore or state
        } catch (error) {
          toast({
            title: "Upload failed.",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.error("Error uploading screenshot:", error);
        }
      };
      

    const handleFileChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    };

    // Define the base fee per team size
const calculateParticipationFee = (teamMembersCount) => {
    switch (teamMembersCount) {
      case 0:
        return 2000;
      case 1:
        return 4000;
      case 2:
        return 6000; // Adjust these values if needed
      case 3:
        return 8000;
      default:
        return 0;
    }
  };

    const checkPrice = async () => {
        const docRef = doc(db, 'id', 'prices');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            if (teamMembers.length === 0) {
                setPrice(docSnap.data().one);
            } else if (teamMembers.length === 1) {
                setPrice(docSnap.data().two);
            } else if (teamMembers.length === 2) {
                setPrice(docSnap.data().three);
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate fields (You can adjust validation rules as per your requirements)
        if (!leaderDetails.firstName || !leaderDetails.lastName || !leaderDetails.phone || !collegeDetails.collegeName || !collegeDetails.state || !collegeDetails.city || !collegeDetails.areaType || !collegeDetails.pincode) {
            alert("Please fill in all required fields.");
            return;
        }
    
        // Check if the leader's name contains only valid characters (letters and spaces)
        if (!/^[A-Za-z\s]+$/.test(leaderDetails.firstName)) {
            alert("Leader's name can only contain letters and spaces.");
            return;
        }
    
        if (!user) {
            alert("Please sign in with Google to submit the form.");
            return;
        }
    
        try {
            const userId = user.uid;
            
            // Check if the user has already registered by querying Firestore
            const existingUserDocRef = query(collection(db, 'events'), where("email", "==", user.email));
            const existingUserDoc = await getDocs(existingUserDocRef);
    
            if (!existingUserDoc.empty) {
                const existingDoc = existingUserDoc.docs[0]; // Get the first matching document
                const existingMunID = existingDoc.data().munID; // Retrieve the existing MUN ID
                alert(`You have already registered! Your MUN ID is: ${existingMunID}`);
                setMunID(existingMunID); // Set the MUN ID in state to display it later
                setFormSubmitted(true); // Update form submission state
                return; // Exit to prevent further processing
            }
    
            // Get a unique MUN ID from Firestore
            const idDoc = doc(db, "id", "id");
            const idSnap = await getDoc(idDoc);
    
            if (!idSnap.exists()) {
                console.error("The ID document does not exist!");
                return;
            }
    
            const data = idSnap.data();
            if (!data || typeof data.id === 'undefined') {
                console.error("The 'id' field is missing in the document or is undefined!");
                return;
            }
    
            const atomicID = data.id;
            const todaysDate = new Date();
            const munID = `MUN-${todaysDate.getMonth() + 1}${todaysDate.getDate()}${atomicID + 1}`;
    
            // Check if there's a payment screenshot to upload
            let imageURL = null;
            if (file) {
                const storage = getStorage();
                const storageRef = ref(storage, `payment_screenshots/${userId}/${file.name}`);
                await uploadBytes(storageRef, file);
                imageURL = await getDownloadURL(storageRef);
            }
    
            // Define the data structure to save in Firestore
            const formData = {
                leaderDetails,           // Leader details
                collegeDetails,          // College details
                teamMembers,             // Team members
                email: user.email,       // User's email
                uid: userId,             // Firebase UID of the user
                munID,                   // Unique MUN ID
                status: false,           // Form status (e.g., pending approval)
                imageURL,                // Payment screenshot URL (if any)
                interestedInAkshar       // Interest in Akshar event (if applicable)
            };
    
            // Save the form data to Firestore under the 'events' collection
            await setDoc(doc(db, 'events', munID), formData);
    
            // Update the atomic ID in Firestore
            await setDoc(idDoc, {
                id: atomicID + 1
            });
    
            // Update form submission state and display the generated MUN ID
            setFormSubmitted(true);
            setMunID(munID);
    
            // Display success toast notification
            toast({
                title: 'Registration Successful.',
                description: 'Your team details have been recorded.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
    
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                title: 'Submission Error',
                description: 'An error occurred while submitting your form.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    


// const isFormValidForTab = (index) => {
//     switch (index) {
//         case 0:
//             return leaderDetails.firstName && leaderDetails.lastName && leaderDetails.phone && leaderDetails.gender && leaderDetails.redId;
//         case 1:
//             return collegeDetails.collegeName && collegeDetails.state && collegeDetails.city && collegeDetails.areaType && collegeDetails.pincode;
//         case 2:
//             return teamMembers.length > 0; // Example validation for team members tab
//         default:
//             return true;
//     }
// };

    
//     return (
//         <AnimationRevealPage>
//             <Header />
//             <Feature 
//                 subheading={card.date}
//                 heading={card.title}
//                 description={card.description ? card.description : null}
//                 imageSrc={card.imageSrc}
//                 primaryButtonText="Register Now!"
//                 registrableEvent={card.registrableEvent ? card.registrableEvent : false}
//                 linkss={card.linkss ? card.linkss : ""}
//                 linkss1={card.linkss1 ? card.linkss1 : ""}
//                 timing={card.timing === "Online Event" ? true : false}
//                 minTeamSize={card.minTeamSize ? card.minTeamSize : 1}
//                 maxTeamSize={card.maxTeamSize ? card.maxTeamSize : 1}
//                 prize={card.prize ? card.prize : ""}
//                 isFlagship={card.isFlagship ? card.isFlagship : true}
//                 rulebookLink={card.rulebookLink ? card.rulebookLink : ""}
//             />

// <Box p={5} border="0px solid" borderColor="gray.300" borderRadius="8px" maxWidth="600px" margin="auto" bg="transparent">
//     {user ? (
//         formSubmitted ? (
//             <Box textAlign="center">
//                 <Heading as="h3" size="lg" color="blue.500">Application Status</Heading>
//                 <Text>Your MUN ID: {munID}</Text>

//                 {status === 'true' ? (
//                     <VStack mt={4}>
//                         <Icon as={CheckCircleIcon} w={10} h={10} color="green" />
//                         <Text fontSize="lg" color="green.600">Your application is approved!</Text>
//                     </VStack>
//                 ) : (
//                     <VStack mt={4}>
//                         <Icon as={CheckIcon} w={10} h={10} color="green.500" />
//                         <Text fontSize="lg" color="green.600">Your request is submitted!.</Text>
//                     </VStack>
//                 )}

//                 <Text>For any Query Contact +91 9509615569</Text>
//             </Box>
//         ) : (
//             <Tabs variant="soft-rounded" isFitted>
//                 <TabList mb="1em" >
//                     <Tab>1</Tab>
//                     <Tab>2</Tab>
//                     <Tab>3</Tab>
//                     <Tab>4</Tab>
//                 </TabList>
//                 <TabPanels>
//                     {/* Tab 1: Team Leader Personal Details */}
//                     <TabPanel >
//                         <Heading size="md" color="blue.500">Team Leader Personal Details</Heading>
//                         <VStack spacing={4}> {/* Add spacing between form fields */}
//                         <FormControl isRequired>
//                                 <FormLabel>Reg ID/Roll No</FormLabel>
//                                 <Input name="redId" value={leaderDetails.redId} onChange={handleLeaderChange} bg="white" />
//                             </FormControl>
//                             <FormControl isRequired>
//                                 <FormLabel>First Name</FormLabel>
//                                 <Input name="firstName" value={leaderDetails.firstName} onChange={handleLeaderChange} bg="white" />
//                             </FormControl>
//                             <FormControl isRequired>
//                                 <FormLabel>Last Name</FormLabel>
//                                 <Input name="lastName" value={leaderDetails.lastName} onChange={handleLeaderChange} bg="white" />
//                             </FormControl>
//                             <FormControl isRequired>
//                                 <FormLabel>Phone</FormLabel>
//                                 <Input name="phone" value={leaderDetails.phone} onChange={handleLeaderChange} bg="white" />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>Alternate Phone</FormLabel>
//                                 <Input name="alternatePhone" value={leaderDetails.alternatePhone} onChange={handleLeaderChange} bg="white"/>
//                             </FormControl>
//                             <FormControl isRequired>
//                                 <FormLabel>Gender</FormLabel>
//                                 <Select name="gender" value={leaderDetails.gender} onChange={handleLeaderChange} bg="white">
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                 </Select>
//                             </FormControl>
//                         </VStack>
//                     </TabPanel>

//                     {/* Tab 2: College Details */}
                    


//                     {/* Tab 3: Team Members Details */}
                    

//                     {/* Tab 4: Payment */}
//                             </TabPanels>
//                         </Tabs>
//                     )
//                 ) : (
//                     <Box display="flex" justifyContent="center" alignItems="center">
//                     <Button 
//                         onClick={signInWithGoogle} 
//                         leftIcon={<FcGoogle />} 
//                         colorScheme="teal" 
//                         variant="solid" 
//                         size="lg"
//                         boxShadow="lg"
//                         _hover={{ backgroundColor: "teal.400" }}
//                     >
//                         <Text fontSize="lg" fontWeight="bold">
//                             Pre-Registration
//                         </Text>
//                     </Button>
//                 </Box>

//                 )}
//             </Box>     
//             <Footer />
//         </AnimationRevealPage>
//     );
// }
// export default Events;
return (
    <AnimationRevealPage>
        <Header />
        <Feature 
            subheading={card.date}
            heading={card.title}
            description={card.description ? card.description : null}
            imageSrc={card.imageSrc}
            primaryButtonText="Register Now!"
            registrableEvent={card.registrableEvent ? card.registrableEvent : false}
            linkss={card.linkss ? card.linkss : ""}
            linkss1={card.linkss1 ? card.linkss1 : ""}
            timing={card.timing === "Online Event" ? true : false}
            minTeamSize={card.minTeamSize ? card.minTeamSize : 1}
            maxTeamSize={card.maxTeamSize ? card.maxTeamSize : 1}
            prize={card.prize ? card.prize : ""}
            isFlagship={card.isFlagship ? card.isFlagship : true}
            rulebookLink={card.rulebookLink ? card.rulebookLink : ""}
        />

        <Box p={5} border="0px solid" borderColor="gray.300" borderRadius="8px" maxWidth="600px" margin="auto" bg="transparent">
            {user ? (
                <Box textAlign="center">
                    <Text fontSize="lg" color="blue.500">Welcome, {user.displayName}</Text>
                    <Button mt ={4} mb={4} colorScheme="red" onClick={handleLogout}>
    Logout
</Button>

                    {formSubmitted ? (
                        <Box mt={4}>
                            <Heading as="h3" size="lg" color="blue.500">Application Status</Heading>
                            <Text>Your MUN ID: {munID}</Text>

                            {status === 'true' ? (
                                <VStack mt={4}>
                                    <Icon as={CheckCircleIcon} w={10} h={10} color="green" />
                                    <Text fontSize="lg" color="green.600">Your application is approved!</Text>
                                </VStack>
                            ) : (
                                <VStack mt={4}>
                                    <Icon as={WarningTwoIcon} w={10} h={10} color="yellow.500" />
                                    <Text fontSize="lg" color="yellow.600">Your application is pending!.</Text>
                                </VStack>
                            )}

                            <Text>For any Query Contact +91 9509615569</Text>
                        </Box>
                    ) : (
                        <Tabs variant="soft-rounded" isFitted>
                            <TabList mb="1em">
                                <Tab>1</Tab>
                                <Tab>2</Tab>
                                <Tab>3</Tab>
                                <Tab>4</Tab>
                            </TabList>
                            <TabPanels>
                                {/* Tab 1: Team Leader Personal Details */}
                                <TabPanel >
                        <Heading size="md" color="blue.500">Team Leader Personal Details</Heading>
                        <VStack spacing={4}> {/* Add spacing between form fields */}
                        <FormControl isRequired>
                                <FormLabel>Reg ID/Roll No</FormLabel>
                                 <Input name="redId" value={leaderDetails.redId} onChange={handleLeaderChange} bg="white" />
                             </FormControl>
                             <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                    name="firstName"
                    value={leaderDetails.firstName}
                    onChange={handleNameChange} // Use the new handler
                    bg="white"
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                    name="lastName"
                    value={leaderDetails.lastName}
                    onChange={handleNameChange} // Use the new handler
                    bg="white"
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                    name="phone"
                    value={leaderDetails.phone}
                    onChange={handlePhoneChange} // Use the new handler
                    bg="white"
                />
            </FormControl>

            <FormControl>
                <FormLabel>Alternate Phone</FormLabel>
                <Input
                    name="alternatePhone"
                    value={leaderDetails.alternatePhone}
                    onChange={handlePhoneChange} // Optionally use the same handler
                    bg="white"
                />
            </FormControl>
                             <FormControl isRequired>
                                 <FormLabel>Gender</FormLabel>
                                 <Select name="gender" value={leaderDetails.gender} onChange={handleLeaderChange} bg="white">
                                     <option value="Male">Male</option>
                                     <option value="Female">Female</option>
                                     <option value="Other">Other</option>
                                 </Select>
                             </FormControl>
                         </VStack>
                         <Button mt={4} colorScheme="blue" onClick={handleNextClick}>
                        Next
                    </Button>
                     </TabPanel>
                                {/* Tab 2: College Details */}
                                <TabPanel>
    <Heading size="md" color="blue.500">College Details</Heading>
    <VStack spacing={4}> {/* Add spacing between form fields */}
        <FormControl isRequired>
            <FormLabel>College Name</FormLabel>
            <Input name="collegeName" value={collegeDetails.collegeName} onChange={handleCollegeChange} bg="white"/>
        </FormControl>
        
        {/* State Selection with options */}
        <FormControl isRequired>
            <FormLabel>State</FormLabel>
            <Select name="state" value={collegeDetails.state} onChange={handleCollegeChange}bg="white">
                <option value="Other">Other</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
            </Select>
        </FormControl>
        
        {/* Conditional City Input/Select based on State */}
        {collegeDetails.state === 'Rajasthan' && (
            <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Select name="city" value={collegeDetails.city} onChange={handleCollegeChange} bg="white">
                    <option value="Jaipur">Jaipur</option>
                    <option value="Jodhpur">Jodhpur</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Ajmer">Ajmer</option>
                    <option value="Bikaner">Bikaner</option>
                    <option value="Kota">Kota</option>
                    <option value="Alwar">Alwar</option>
                    <option value="Tonk">Tonk</option>
                    <option value="Sikar">Sikar</option>
                    <option value="Bharatpur">Bharatpur</option>
                    <option value="Nagaur">Nagaur</option>
                    <option value="Dholpur">Dholpur</option>
                    <option value="Churu">Churu</option>
                    <option value="Hanumangarh">Hanumangarh</option>
                    <option value="Barmer">Barmer</option>
                    <option value="Pali">Pali</option>
                    {/* Add more cities as needed */}
                </Select>
            </FormControl>
        )}

        {collegeDetails.state === 'Gujarat' && (
            <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Select name="city" value={collegeDetails.city} onChange={handleCollegeChange} bg="white">
                    <option value="">Select City</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Surat">Surat</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Gandhinagar">Gandhinagar</option>
                    <option value="Bhavnagar">Bhavnagar</option>
                    <option value="Junagadh">Junagadh</option>
                    <option value="Nadiad">Nadiad</option>
                    <option value="Anand">Anand</option>
                    <option value="Kutch">Kutch</option>
                    <option value="Mehsana">Mehsana</option>
                    <option value="Navsari">Navsari</option>
                    <option value="Dahod">Dahod</option>
                    <option value="Patan">Patan</option>
                    {/* Add more cities as needed */}
                </Select>
            </FormControl>
        )}

        {collegeDetails.state === 'Uttar Pradesh' && (
            <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Select name="city" value={collegeDetails.city} onChange={handleCollegeChange} bg="white">
                    <option value="">Select City</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Kanpur">Kanpur</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Agra">Agra</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                    <option value="Meerut">Meerut</option>
                    <option value="Noida">Noida</option>
                    <option value="Bareilly">Bareilly</option>
                    <option value="Aligarh">Aligarh</option>
                    <option value="Merrut">Merrut</option>
                    <option value="Moradabad">Moradabad</option>
                    <option value="Firozabad">Firozabad</option>
                    <option value="Saharanpur">Saharanpur</option>
                    <option value="Bijnor">Bijnor</option>
                    <option value="Muzaffarnagar">Muzaffarnagar</option>
                    {/* Add more cities as needed */}
                </Select>
            </FormControl>
        )}

        {/* If "Other" is selected for State, allow the user to type the city */}
        {collegeDetails.state === 'Other' && (
            <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input name="city" value={collegeDetails.city} onChange={handleCollegeChange} placeholder="Enter your city" bg="white" />
            </FormControl>
        )}
        
        <FormControl isRequired>
            <FormLabel>Area Type</FormLabel>
            <Select name="areaType" value={collegeDetails.areaType} onChange={handleCollegeChange} bg="white">
                <option value="Rural">Rural</option>
                <option value="Urban">Urban</option>
            </Select>
        </FormControl>
        
        <FormControl isRequired>
            <FormLabel>Pincode</FormLabel>
            <Input name="pincode" value={collegeDetails.pincode} onChange={handleCollegeChange}  bg="white" pattern="^\d{6}$" maxLength={6}/>
        </FormControl>
    </VStack>
    {/* Previous and Next Buttons in Tab 2 */}
    <Button mt={4} colorScheme="blue" onClick={handlePreviousClick} mr={4} isDisabled={activeTabIndex === 0}>
                        Previous
                    </Button>
                    <Button mt={4} colorScheme="blue" onClick={handleNextClick}>
                        Next
                    </Button>
</TabPanel>
<TabPanel>
  <Heading size="md" color="blue.500">Team Members</Heading>
  <FormControl mb={4}>
    <FormLabel>Number of Team Members (Maximum-3)</FormLabel>
    <Input
      type="number"
      value={numberOfTeamMembers}
      onChange={(e) => {
        const value = parseInt(e.target.value);

        // Allow the field to be cleared (NaN is checked to allow clearing input)
        if (!isNaN(value)) {
          // Ensure the number doesn't exceed 3
          if (value <= 3) {
            setNumberOfTeamMembers(value);
          } else {
            alert("You can only have a maximum of 3 team members.");
          }
        } else {
          setNumberOfTeamMembers(''); // Allows clearing the input
        }
      }}
      max="3" // Prevents values greater than 3 from being input
      min="1" // Optional: Ensure at least 1 team member is selected
      bg="white"
    />
  </FormControl>

  {/* Render team member details inputs based on the number of team members */}
  {Array.from({ length: numberOfTeamMembers }).map((_, index) => (
    <Box key={index} mt={4}>
      <Heading size="sm" color="blue.500">Team Member {index + 1}</Heading>
      <Input
        placeholder="Name"
        name="name"
        onChange={(e) => handleTeamMemberChange(index, e)}
        mt={2}
        bg="white"
      />
      <Input
        placeholder="Roll No"
        name="rollNo"
        onChange={(e) => handleTeamMemberChange(index, e)}
        mt={2}
        bg="white"
      />
      <Input
        placeholder="Email"
        name="email"
        onChange={(e) => handleTeamMemberChange(index, e)}
        mt={2}
        bg="white"
      />
    </Box>
  ))}
  {/* Previous and Next Buttons in Tab 3 */}
  <Button mt={4} colorScheme="blue" onClick={handlePreviousClick} mr={4}>
                        Previous
                    </Button>
                    <Button mt={4} colorScheme="blue" onClick={handleNextClick}>
                        Next
                    </Button>
</TabPanel>



                                {/* Tab 4: Additional Info and Payment*/}
                                <TabPanel>
      <Heading size="md" color="blue.500">Additional Info</Heading>

      {/* Interested in attending Akshar? */}
      <FormControl mt={4}>
        <FormLabel>Interested in attending Akshar?</FormLabel>
        <HStack spacing={4}>
          <RadioGroup onChange={setInterestedInAkshar} value={interestedInAkshar} bg="white">
            <HStack>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </HStack>
          </RadioGroup>
        </HStack>
      </FormControl>

      {/* Accommodation Option */}
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

      {/* Bill Receipt Table */}
      <Heading size="md" color="blue.500" mt={6}>Payment Summary</Heading>
      <Box mt={4} p={4} border="1px solid" borderColor="gray.300" borderRadius="8px" maxWidth="600px" bg="gray.50">
        <Table variant="simple">
          <Tbody>
            {/* MUN Participation Fee */}
            <Tr>
  <Td>MUN Participation Fee</Td>
  <Td isNumeric>
    ₹{calculateParticipationFee(numberOfTeamMembers)} {/* Dynamically calculate based on team members */}
  </Td>
</Tr>

            {/* Accommodation Fee */}
            {accommodationNeeded === "yes" && (
              <Tr>
                <Td>Accommodation Fee (₹2000 per person)</Td>
                <Td isNumeric>₹{(numberOfTeamMembers+1) * 2000}</Td>
              </Tr>
            )}

            {/* GST */}
            <Tr>
              <Td>GST (18%)</Td>
              <Td isNumeric>₹{Math.round((1000 + (accommodationNeeded === "yes" ? numberOfTeamMembers * 2000 : 0)) * 0.18)}</Td>
            </Tr>

            {/* Net Payment to be Done */}
            <Tr fontWeight="bold">
              <Td>Net Payment to be Done</Td>
              <Td isNumeric>
                ₹
                {calculateParticipationFee(numberOfTeamMembers) + 
                  (accommodationNeeded === "yes" ? (numberOfTeamMembers+1) * 2000 : 0) + 
                  Math.round((1000 + (accommodationNeeded === "yes" ? numberOfTeamMembers * 2000 : 0)) * 0.18)
                }
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      {/* QR Code Image and Screenshot Upload */}
      <VStack mt={6} spacing={6}>
        {/* QR Code Image */}
        <Box>
  <Heading size="sm" color="blue.500">Scan to Pay</Heading>
  <Image src="/QR.png" alt="QR Code for Payment" boxSize="150px" />
</Box>


        {/* Screenshot Upload */}
        <Box>
          <FormLabel>Upload Payment Screenshot</FormLabel>
          <Input type="file" onChange={handleScreenshotUpload} accept="image/*" bg="white" />
        </Box>
      </VStack>
      {/* Previous Button only in Tab 4 */}
      <Button mt={4} colorScheme="blue" onClick={handlePreviousClick} mr={4}>
                        Previous
                    </Button>

      {/* Submit Button */}
      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </TabPanel>
    </TabPanels>
    </Tabs>       
                    )}
                </Box>
            ) : (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Button 
                        onClick={handleGoogleSignIn} 
                        leftIcon={<FcGoogle />} 
                        colorScheme="teal" 
                        variant="solid" 
                        size="lg"
                        boxShadow="lg"
                        _hover={{ backgroundColor: "teal.400" }}
                    >
                        <Text fontSize="lg" fontWeight="bold">
                            Registration
                        </Text>
                    </Button>
                </Box>
            )}
        </Box>
             
        <Footer />
    </AnimationRevealPage>
);
}
export default Events;