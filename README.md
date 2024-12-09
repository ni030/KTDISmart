# KTDI Smart
KTDISmart is a mobile app that helps KTDI residents by making hostel services easier and more efficient. It lets users report issues, track repairs, find facilities, and update merit points quickly using QR codes.

## Authentication Subsystem🔐
👧 **Developer: ONG KAI XUEN**

| Sprint | Module Name | Frontend | Backend |
|--------|----------|---------|---------|
| **1**  | Login & Register user Module | **Page**:  <br> - [pages layout](./frontend/app/(auth)/_layout.jsx) <br> -[Register page](./frontend/app/(auth)/register.jsx)  <br> - [Login page](./frontend/app/(auth)/login.jsx)  <br><br> **Component**:  <br> - [Login Form](./frontend/components/auth_component/LoginForm.jsx)  <br> - [Registration form](./frontend/app/(auth)/register.jsx)  <br> <br>**Service**:  <br> - [Authorization service](./frontend/services/authServices.js) | **Controller**: <br> - [user Controller](./backend/controllers/userController.js) <br><br> **Routes**: <br> - [user Route](./backend/routes/userRoute.js) <br>|<br>
| **2**  | Account Recovery & Home page Module | **Page**:  <br> - [pages layout](./frontend/app/(auth)/_layout.jsx) <br> -[Home Page](./frontend/app/(home)/Home.jsx)  <br> - [Log Out session](./frontend/app/(home)/profile.jsx)<br>- [Forgot pasword page](./frontend/app/(auth)/forgotPassword.jsx)<br> -[Enter OTP page](./frontend/app/(auth)/enterOTP.jsx)<br> -[Reset Password page](./frontend/app/(auth)/resetPassword.jsx)<br><br>**Component**: <br> - [Log Out button](./frontend/app/(auth)/profile.jsx)<br>- [Forgot pasword form](./frontend/app/(auth)/forgotPassword.jsx)<br> -[Enter OTP form](./frontend/app/(auth)/enterOTP.jsx)<br> -[Reset Password form](./frontend/app/(auth)/resetPassword.jsx)<br><br>**Service**:  <br> - [Password service](./frontend/services/passwordService.js)| **Controller**: <br> - [Password Controller](./backend/controllers/passwordController.js) <br> <br>**Routes**: <br> - [password Route](./backend/routes/passwordRoute.js) <br>|
| **3**  | User profile management Module | **Page**:  <br> **Component**: <br> **Service**:  <br> |  **Controller**: <br> **Routes**: <br> |
| **4**  | Integration Module | **Page**:  <br> **Component**: <br> **Service**:  <br> |  **Controller**: <br> **Routes**: <br> |

## Complaint Subsystem📝
👧 **Developer: SOH FEI ZHEN**

| Sprint | Module Name | Frontend | Backend |
|--------|----------|---------|---------|
| **1**  | Report Facilities Module | **Page**:  <br> 1. [category.jsx](./frontend/app/(complaint)/category.jsx)  <br> 2. [report.jsx](./frontend/app/(complaint)/report.jsx) <br> **Component**:  <br> - [card.jsx](./frontend/components/complaint/card.jsx)  <br> - [declarateDialog.jsx](./frontend/components/complaint/declarateDialog.jsx)  <br> - [imageModal.jsx](./frontend/components/complaint/imageModal.jsx)  <br> **Service**:  <br> - [manageComplaintForm.js](./frontend/services/manageComplaintForm.js) <br>| **Controller**: <br> - [complaintFormController.js](./backend/controllers/complaintFormController.js) <br>**Routes**: <br> - [complaintForm.js](./backend/routes/complaintForm.js)  <br>|
| **2**  | Tracking Module | **Page**:  <br> 1. [index.jsx](./frontend/app/(complaint)/index.jsx)  <br> 2. [progress.jsx](./frontend/app/(complaint)/progress.jsx) <br>**Component**: <br>- [noComplaint.jsx](./frontend/components/complaint/noComplaint.jsx)  <br> - [haveComplaint.jsx](./frontend/components/complaint/haveComplaint.jsx)  <br> - [progressBar.jsx](./frontend/components/complaint/progressBar.jsx)  <br> **Service**:  <br> - [manageComplaintForm.js](./frontend/services/manageComplaintForm.js) <br> |  **Controller**: <br> - [complaintFormController.js](./backend/controllers/complaintFormController.js) <br> **Routes**: <br> - [complaintForm.js](./backend/routes/complaintForm.js)  <br>|
| **3**  | Feedback Module | **Page**:  <br> **Component**: <br> **Service**:  <br> |  **Controller**: <br> **Routes**: <br> |
| **4**  | Integration Module | **Page**:  <br> **Component**: <br> **Service**:  <br> |  **Controller**: <br> **Routes**: <br> |

## Navigation Subsystem🗺️
👦 **Developer: LIM JIA AN** 

| Sprint | Module Name | Frontend | Backend |
|--------|----------|---------|---------|
| **1**  | Map Integration Module | **Page**:  <br> - [Index](./frontend/app/(navigation)/index.jsx)  <br> - [Layout](./frontend/app/(navigation)/_layout.jsx) <br> **Component**:  <br> - [Map](./frontend/component/navigation/NavigationMap.jsx)  <br> - [Bottom Sheet](./frontend/component/navigation/NavigationBottomSheet) <br> - [Google Text Input](./frontend/component/navigation/GoogleTextInput.jsx) <br> **Service**:  <br> - [Manage Location](./frontend/services/manageLocation.js) <br> **API**:  <br> - [Google API](./frontend/.env) | **Controller**: <br> - [Navigation Controller](./backend/controllers/navigationController.js) <br> **Routes**: <br> - [Navigation Route](./backend/routes/navigationRoute.js) <br>|
| **2**  | Location Categorization | **Page**:  <br> - [Index](./frontend/app/(navigation)/index.jsx)  <br> - [Layout](./frontend/app/(navigation)/_layout.jsx) <br> **Component**: <br> - [Map](./frontend/component/navigation/NavigationMap.jsx)  <br> - [Bottom Sheet](./frontend/component/navigation/NavigationBottomSheet) <br> **Service**:  <br> - [Manage Amenity](./frontend/services/manageAmenity.js) <br> **API**:  <br> - [Google API](./frontend/.env) |  **Controller**: <br> - [Amenity Controller](./backend/controllers/amenityController.js) <br> **Routes**: <br> - [Amenity Route](./backend/routes/amenityRoute.js) <br>| 
| **3**  | Location Searching & Filtering Module | **Page**:  <br> **Component**: <br> **Service**:  <br> |  **Controller**: <br> **Routes**: <br> |
| **4**  | Integration Module | **Page**:  <br> **Component**: <br> **Service**:  <br> |  **Controller**: <br> **Routes**: <br> |

## KTDI Merit Subsystem🏆
👧 **Developer: LIM SI NI**

| Sprint | Module Name | Frontend | Backend |
|--------|----------|---------|---------|
| **1**  | Choosing Prefer Hostel Module | **Page**:  <br> - [Index](./frontend/app/(ktdi-merit)/index.jsx)  <br> - [Layout](./frontend/app/(ktdi-merit)/_layout.jsx)  <br> **Component**:  <br> - [ChooseRoomModal](./frontend/components/ktdi-merit/ChooseRoomModal.jsx)  <br> - [QuestionDialog](./frontend/components/ktdi-merit/QuestionDialog.jsx)  <br>- [SubMenu](./frontend/components/ktdi-merit/SubMenu.jsx)  <br>**Service**:  <br> - [ManageChooseRoomForm](./frontend/services/manageChooseRoomForm.js) | **Controller**: <br> - [ChooseRoomFormController](./backend/controllers/chooseRoomFormController.js) <br> **Routes**: <br> - [ChooseRoomForm](./backend/routes/chooseRoomForm.js) <br>|
| **2**  | Register Event & Generate QR | **Page**: <br> - [RegisterEvent](./frontend/app/(ktdi-merit)/registerEvent.jsx) <br> **Component**: <br> - [DateModal](./frontend/components/ktdi-merit/DateModal.jsx)  <br> - [EventRecord](./frontend/components/ktdi-merit/EventRecord.jsx)  <br>- [GenerateQR](./frontend/components/ktdi-merit/GenerateQR.jsx) <br> **Service**:  <br> - [ManageEvent](./frontend/services/manageEvent.js) | **Controller**: <br> - [EventController](./backend/controllers/eventController.js) <br> **Routes**: <br> - [EvenRoute](./backend/routes/eventRoute.js) <br>|
| **3**  | Scan QR & Activity Conclusion Module | **Page**: <br> - [ScanQRCode](./frontend/app/(ktdi-merit)/scanQRCode.jsx)  <br> **Component**: <br> - [ActivityTable](./frontend/components/ktdi-merit/ActivityTable.jsx)  <br> - [DecodeQR](./frontend/components/ktdi-merit/DecodeQR.jsx) <br> **Service**:  <br> - [ManageMerit](./frontend/services/manageMerit.js) | **Controller**: <br> - [KtdiMeritController](./backend/controllers/ktdiMeritController.js) <br> **Routes**: <br> - [KtdiMeritRoute](./backend/routes/ktdiMeritRoute.js) <br>|
| **4**  | Integration Module | **Page**:  <br> **Component**: <br> **Service**:  <br> |  **Controller**: <br> **Routes**: <br> |

---

### Notes:
1. Click on file names to navigate directly to their respective files in the repository.
