import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";

const NavBar = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand tag={Link} to={"/"}>
					Rate A Baseball Player
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink tag={Link} to={"/"}>
								Sign In
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to={"/createpost"}>
								Create A Post
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to={"/allposts"}>
								All Posts
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to={"/userposts"}>
								User Posts
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to={"/edituser"}>
								Edit User
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
