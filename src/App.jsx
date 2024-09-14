import { extendTheme, ThemeProvider } from '@chakra-ui/react';

// Define custom themes
const customTheme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
    yellowMode: {
      100: "#FFF9C4",
      200: "#FFF176",
      900: "#FBC02D",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: '8px',
        padding: '12px',
      },
    },
  },
});

// Wrap with ThemeProvider in the App component
const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsLoggedIn(true);
        setUser(data.user);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleLoginSignup = () => {
    navigate('/login');
  };

  return (
    <ThemeProvider theme={customTheme}>
      <ChakraProvider>
        <Flex direction="column" height="100vh">
          <Flex p={4} justify="space-between" align="center">
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {isLoggedIn ? (
              <Flex align="center">
                <Text mr={4}>Logged in as: {user?.email}</Text>
                <Button colorScheme="red" onClick={handleLogout}>
                  Logout
                </Button>
              </Flex>
            ) : (
              <Button colorScheme="teal" onClick={handleLoginSignup}>
                Login / Signup
              </Button>
            )}
          </Flex>

          <Box flex="1" p={4}>
            <Routes>
              <Route path="/" element={<Notepad isLoggedIn={isLoggedIn} user={user} />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<navigate to="/" replace />} />
            </Routes>
          </Box>
        </Flex>
      </ChakraProvider>
    </ThemeProvider>
  );
};

export default AppWithRouter;

