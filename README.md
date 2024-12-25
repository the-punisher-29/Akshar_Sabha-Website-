# Akshar MUN Website

A comprehensive event management platform developed for IIT Jodhpur's Literary Fest Model United Nations conference, serving 200+ participants with streamlined registration and secure payment processing.

## Overview

The Akshar MUN Website is a full-stack web application built to facilitate the organization and management of Model United Nations conferences. The platform handles everything from participant registration to committee allocations, making the event management process seamless and efficient.

## Features

### User Management
- Secure authentication system powered by Firebase Auth
- Personalized user profiles for participants
- Role-based access control for participants, committee directors, and administrators

### Registration System
- Streamlined registration flow reducing onboarding time by 40%
- Multi-step form with progress saving
- Committee preference selection
- Document upload functionality for position papers

### Payment Integration
- Secure payment processing
- Real-time payment status tracking
- Automated confirmation emails
- Payment history and receipts

### Admin Portal
- Comprehensive dashboard for event organizers
- Real-time participant statistics
- Committee management interface
- Participant approval workflow
- Document verification system

## Technology Stack

### Frontend
- React.js for building the user interface
- Chakra UI for responsive and accessible components
- React Router for navigation
- Context API for state management

### Backend
- Node.js runtime environment
- Firebase Authentication for user management
- Cloud Firestore for database operations
- Firebase Storage for document management

## Getting Started

### Prerequisites
```bash
# Required software
Node.js >= 14.0.0
npm >= 6.14.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/akshar-mun-website.git
cd akshar-mun-website
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env file in the root directory and add:
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm start
```

## Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── services/           # Firebase and API services
├── utils/              # Helper functions
└── styles/             # Global styles and theme
```

## Database Schema

### Users Collection
```javascript
{
  uid: string,
  email: string,
  fullName: string,
  institution: string,
  committee: string,
  paymentStatus: 'pending' | 'completed',
  documents: {
    positionPaper: string,
    idProof: string
  }
}
```

### Committees Collection
```javascript
{
  id: string,
  name: string,
  description: string,
  availableSeats: number,
  assignedDelegates: [uid],
  directorId: string
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- IIT Jodhpur Literary Fest organizing team
- All contributors who helped in testing and development
- Firebase team for their excellent documentation
