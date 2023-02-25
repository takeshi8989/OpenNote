import { useState } from "react";
import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Input,
  Button,
} from "@nextui-org/react";
import { Layout } from "./Layout";
import { SearchIcon } from "./SearchIcon";
import { LoginModal } from "./LoginModal";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand css={{ mr: "$4" }}>
          <Text b color="inherit" css={{ mr: "$11" }} hideIn="sm" size={30}>
            OPEN NOTE
          </Text>
        </Navbar.Brand>
        {/* Search Bar */}
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              contentLeftStyling={false}
              placeholder="Search..."
            />
          </Navbar.Item>
          {/* Login Button */}
          {!isLoggedIn && <LoginModal />}
          {/* New Note Button */}
          {isLoggedIn && (
            <Button bordered color="secondary" auto>
              NEW NOTE
            </Button>
          )}
          {/* Avatar */}
          {isLoggedIn && (
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    size="lg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4mt9OP-78V6r8z1c0ohe_dtyh2OQNNVDI2f2BSd7npw&s"
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    zoey@example.com
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  Your Profile
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
};
