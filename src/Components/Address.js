// import React, { useState } from 'react';

// function Address() {
//   const [address, setAddress] = useState({
//     houseNumber: '',
//     landMark: '',
//     street: '',
//     zipCode: '',
//     city: '',
//     state: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress({
//       ...address,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Address submitted:', address);
//   };

//   return (
//     <div>
//       <h2>Address Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>House Number:</label>
//           <input
//             type="text"
//             name="houseNumber"
//             value={address.houseNumber}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Landmark:</label>
//           <input
//             type="text"
//             name="landMark"
//             value={address.landMark}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Street:</label>
//           <input
//             type="text"
//             name="street"
//             value={address.street}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Zip Code:</label>
//           <input
//             type="text"
//             name="zipCode"
//             value={address.zipCode}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>City:</label>
//           <input
//             type="text"
//             name="city"
//             value={address.city}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>State:</label>
//           <input
//             type="text"
//             name="state"
//             value={address.state}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Address;

