import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Input,
  Button,
  Link,
} from "@nextui-org/react";
import { Layout } from "./Layout";
import { SearchIcon } from "./SearchIcon";
import { LoginModal } from "./LoginModal";
import { useAtom } from "jotai/react";
import { isLoggedInAtom, usernameAtom } from "@/jotai/authAtom";
import { useAtomValue } from "jotai/react";
import { useRouter } from "next/router";
import { searchQueryAtom } from "@/jotai/noteAtom";
import { useNote } from "@/hooks/useNote";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const { setNoteListBySearch } = useNote();
  const username = useAtomValue(usernameAtom);
  const router = useRouter();

  const handleSearch = (e: any): void => {
    if (e.key === "Enter") {
      setNoteListBySearch();
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Link href="/">
          <Navbar.Brand css={{ mr: "$4" }}>
            <Text b color="black" css={{ mr: "$11" }} hideIn="sm" size={30}>
              OPEN NOTE
            </Text>
          </Navbar.Brand>
        </Link>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </Navbar.Item>
          {/* Login Button */}
          {!isLoggedIn && <LoginModal />}
          {/* New Note Button */}
          {isLoggedIn && (
            <Link href="/create">
              <Button bordered color="secondary" auto>
                NEW NOTE
              </Button>
            </Link>
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
                    {username}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  <Link href={`/profile/${username}`}>
                    <Text>Your Profile</Text>
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item key="logout" withDivider color="error">
                  <Text onClick={handleLogout}>Log Out</Text>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
};
