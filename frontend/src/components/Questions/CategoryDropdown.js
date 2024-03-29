// import React from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';

// const CategoryDropdown = ({ categories, isDropdown, onChange, index }) => {
//   if (isDropdown) {
//     return (
//       <DropdownButton
//         title=""
//         variant="outline-secondary"
//         id={`category-dropdown-${index}`}
//         align="end"
//         className="category-dropdown"
//       >
//         {categories.map((category, idx) => (
//           <Dropdown.Item key={idx} onClick={() => onChange(category.name, index)}>
//             {category.name}
//           </Dropdown.Item>
//         ))}
//       </DropdownButton>
//     );
//   } else {
//     return (
//       <DropdownButton
//         className="category-select"
//         variant="outline-secondary"
//         align="end"
//         onChange={(e) => onChange(e.target.value, index)}
//       >
//         {categories.map((category, idx) => (
//           <Dropdown.Item key={idx} value={category.name}>
//             {category.name}
//           </Dropdown.Item>
//         ))}
//       </DropdownButton>
//     );
//   }
// };

// export default CategoryDropdown;