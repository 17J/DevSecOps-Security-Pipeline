
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database - in a real app, this would come from a backend
const mockUserDB = [
  {
    id: "user-123",
    email: "test@example.com",
    password: "password",
    name: "Test User"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // First check if user is already registered in our mock DB
      const existingUser = mockUserDB.find(user => user.email === email);
      
      if (existingUser) {
        // Only check password if user exists
        if (existingUser.password === password) {
          const userData = {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          toast.success("Successfully logged in");
          return;
        }
        throw new Error("Invalid password");
      }
      
      // Our mock flow for demo login if not in DB
      if (email === "test@example.com" && password === "password") {
        const userData = {
          id: "user-123",
          email: email,
          name: "Test User"
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Successfully logged in");
        return;
      }
      
      throw new Error("User not found. Please register first.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Check if user already exists in our mock DB
      const existingUser = mockUserDB.find(user => user.email === email);
      
      if (existingUser) {
        throw new Error("Email already registered. Please login instead.");
      }
      
      // In a real app, we would save to DB here
      const newUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        email,
        password,
        name
      };
      
      // Add to our mock DB
      mockUserDB.push(newUser);
      
      // Log in the new user
      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Successfully registered and logged in");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to register");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Successfully logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
