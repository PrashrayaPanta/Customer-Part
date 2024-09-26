import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const DropDownComponent = ({ small, categories, brands }) => {
  //   console.log(small);
  //   console.log(large);
  //   console.log(categories);
  //   console.log(brands);

  return (
    <>
      <NavDropdown title={`Categories`} className={`${small ? `mb-4` : ""}`}>
        {categories.map((category, index) => (
          <NavDropdown.Item
            key={index}
            as={Link}
            to={`/category/${category._id}`}
          >
            {category.name}
          </NavDropdown.Item>
          //   <Link to={`/${category._id}`}>{category.name}</Link>
        ))}
      </NavDropdown>
      <NavDropdown title={`Brands`} className={`${small ? "mt-4" : ""}`}>
        {brands.map((brand, index) => (
          <NavDropdown.Item key={index} as={Link} to={`/brand/${brand._id}`}>
            {brand.name}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </>
  );
};

export default DropDownComponent;
