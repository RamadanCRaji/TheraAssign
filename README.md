## TheraAssign

## `Overview`

TheraAssign is a dynamic application designed to streamline the management of in-hospital patient resources and wheelchair assignments within rehabilitation facilities. Its core functionality facilitates the effective allocation of wheelchairs to patients, both personal and non-personal, and assigns patients to available rooms. TheraAssign tracks the location of equipment, ensuring that each patient receives a wheelchair that meets their specific needs based on availability, condition, and suitability, taking into account their height, age, and weight.

---

### Technologies Used

-  **Frontend**:

   -  **React** for building the user interface.
   -  **Next.js** for server-side rendering and improved performance.
   -  **Redux** for state management.
   -  **Tailwind CSS** for styling.

-  **Backend**:

   -  **Node.js** with **Express** for server-side logic.
   -  **MongoDB** for database management.
   -  **Mongoose** for data modeling.

-  **Deployment**:
   -  Application deployed on [vercel], ensuring high availability and scalability.

## Wireframe

Here is the wireframe for the project:

[View Wireframe](https://miro.com/app/embed/uXjVMllTkKA=/?pres=1&frameId=3458764566073047632&embedId=364360820200)

<iframe width="768" height="432" src="https://miro.com/app/embed/uXjVMllTkKA=/?pres=1&frameId=3458764566073047632&embedId=364360820200" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

### User Story

-  **User Registration and Access**

   -  User should be able to register and gain access to the platform.
   -  User should be able to log in and access the dashboard.

-  **Wheelchair Management**

   -  User should be able to view an overview of all wheelchairs and their statuses.
   -  User should be able to view detailed information about each wheelchair, including type, condition, and availability.
   -  User should be able to assign a wheelchair to a patient based on specific criteria.
   -  User should be able to log the maintenance status of wheelchairs.
   -  User should be able to mark wheelchairs as available or unavailable.

-  **Room Management**

   -  User should be able to view all rooms and their occupancy statuses.
   -  User should be able to transfer a patient and their assigned wheelchair to a different room.
   -  User should be able to discharge a patient and update the wheelchair and room status accordingly.
   -  User should be able to update patient information, including their assigned wheelchair and room.

-  **Reporting and Search**

   -  User should be able to generate reports on wheelchair usage and room occupancy.
   -  User should be able to search for specific wheelchairs or patients.
   -  User should be able to filter wheelchairs by type, condition, and availability.

-  **Security**
   -  User should be able to log out securely.

### API Routes

| Verb   | Routes                       | Function                                    |
| ------ | ---------------------------- | ------------------------------------------- |
| GET    | /api/wheelchairs             | Shows all wheelchairs                       |
| GET    | /api/wheelchairs/available   | Shows all available wheelchairs             |
| GET    | /api/wheelchairs/unavailable | Shows all unavailable wheelchairs           |
| GET    | /api/wheelchairs/:id         | Shows info of a specific wheelchair         |
| POST   | /api/wheelchairs             | Creates a new wheelchair entry              |
| PUT    | /api/wheelchairs/:id         | Updates a wheelchair's info                 |
| DELETE | /api/wheelchairs/:id         | Deletes a wheelchair entry                  |
| GET    | /api/patients                | Shows all patients                          |
| GET    | /api/patients/:id            | Shows info of a specific patient            |
| POST   | /api/patients                | Registers a new patient                     |
| PUT    | /api/patients/:id            | Updates patient information                 |
| DELETE | /api/patients/:id            | Deletes a patient and their associated data |
| GET    | /api/rooms                   | Shows all rooms                             |
| GET    | /api/rooms/available         | Shows all available rooms                   |
| GET    | /api/rooms/occupied          | Shows all occupied rooms                    |
| GET    | /api/rooms/:id               | Shows info of a specific room               |
| POST   | /api/rooms                   | Creates a new room entry                    |
| PUT    | /api/rooms/:id               | Updates a room's info                       |
| DELETE | /api/rooms/:id               | Deletes a room entry                        |
| POST   | /api/auth/register           | Registers a new user                        |
| POST   | /api/auth/login              | Logs in a user                              |
| POST   | /api/auth/logout             | Logs out a user                             |

### Page Routes

| Route                                       | Page                | Function                                                                                                          |
| ------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| /                                           | Home                | Welcome page                                                                                                      |
| /signup                                     | Signup              | User registration page                                                                                            |
| /login                                      | Login               | User login page                                                                                                   |
| /main/facility-management/logout            | logout              | user logout                                                                                                       |
| /main/dashboard/overview                    | Overview            | Main user dashboard with summary, quick links, and an overview of the application                                 |
| /main/patient-management/admit              | Admit               | Admit patients, assign rooms and wheelchairs                                                                      |
| /main/patient-management/personalWheelChair | Personal Wheelchair | Assign a personal wheelchair to a patient, decide whether to keep hospital-owned chairs or return them to storage |
| /main/patient-management/swapPatients       | Swap Patients       | Swap patients between occupied rooms                                                                              |
| /main/patient-management/room-change        | Room Change         | Change a patient's room                                                                                           |
| /main/patient-management/return             | Return              | Return hospital wheelchairs loaned to patients                                                                    |
| /main/patient-management/discharge          | Discharge           | Discharge patients from the hospital and reset all occupancy records pertaining to the patients                   |
| /main/facility-management/floorplan         | Floorplan           | Detailed information about every room in the hospital, including current patient occupancy                        |
| /wheelchairs/:id                            | Wheelchair Details  | Detailed information about a specific wheelchair                                                                  |
| /patients                                   | Patients List       | Shows all patients                                                                                                |
| /patients/:id                               | Patient Details     | Detailed information about a specific patient                                                                     |

### Data Models

#### Chair Model

```javascript
const chairSchema = new Schema({
   tagId: { type: String, required: true },
   status: {
      available: { type: Boolean, default: true },
      roomId: { type: Schema.Types.ObjectId, ref: "Room", default: null },
   },
   type: { type: String, required: true },
   dimension: { type: String, required: true },
   version: { type: String, required: true },
});
```

#### Patient Model

```javascript
const patientSchema = new Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   chairId: { type: Schema.Types.ObjectId, ref: "Chair", default: null },
   roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
});
```

#### Room Model

```javascript
const roomSchema = new Schema({
   patientId: { type: Schema.Types.ObjectId, ref: "Patient", default: null },
   roomNumber: { type: Number, required: true },
   occupied: { type: Boolean, default: false },
   location: {
      wing: { type: String, enum: ["west", "east"], required: true },
      floor: { type: Number, required: true },
   },
});
```

## Sprints

**Sprint 1:** Set up front-end and back-end project dependencies  
**Sprint 2:** Create homepage, landing page, login page, and signup page √  
**Sprints 3-5:** Develop overview page, personal wheelchair page, swap patient page, room switch page, return wheelchair page, and floor plan page √  
**Sprint 6:** Ensure all pages are functional and integrated √  
**Sprint 7:** Implement search functionality for patients and wheelchairs √  
**Sprint 8:** Add detailed views for individual patients and wheelchairs  
**Sprint 9:** Integrate user notifications and favorites functionality  
**Sprint 10:** Enable delete functionality for listings and user account deletion
**Sprint 11:** Conduct thorough testing and bug fixing  
**Sprint 12:** Optimize performance and prepare for deployment
