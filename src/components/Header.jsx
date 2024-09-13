import React, { useState } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import kfcLogo from "../assets/KFC_logo.png";

export default function Header({ cart, itemsCount, cartTotal, handleDeleteOne }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar navbar-dark bg-primary my-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={kfcLogo}
            alt="KFC Logo"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span
            className="navbar-brand mb-0 h1"
            style={{
              color: "#ff0000",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "1.8rem",
            }}
          >
            KFC
          </span>
        </div>

        <div className="d-flex align-items-center">
          <span className="text-light me-3">Items: {itemsCount}</span>
          <span className="text-light">Total: {cartTotal} PKR</span>
        </div>

        <Dropdown show={dropdownOpen} onToggle={toggleDropdown} align="end">
          <Dropdown.Toggle variant="light" id="dropdown-basic" onClick={toggleDropdown}>
            Cart <Badge bg="secondary">{itemsCount}</Badge>
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{ width: "300px", maxHeight: "400px", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {cart.length === 0 ? (
              <Dropdown.Item>No items in the cart.</Dropdown.Item>
            ) : (
              <>
                {cart.map((item) => (
                  <Dropdown.Item
                    key={item.id}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <p className="m-0">{item.name}</p>
                        <p
                          className="m-0 text-muted"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {item.count} x {item.price} PKR
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOne(item.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item>
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <span>{cartTotal} PKR</span>
                  </div>
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}
