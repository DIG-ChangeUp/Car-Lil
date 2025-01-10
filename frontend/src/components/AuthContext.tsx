import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { auth } from './auth/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import MyLoading from './MyLoading.tsx'; // Firebase の User 型をインポート

interface AuthContextType {
  authUser: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function UseAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext undefined!');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Firebase Auth の状態変化を監視
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      //console.log(currentUser);
      setAuthUser(currentUser);
      setLoading(false);
    });

    // クリーンアップ関数を返す
    return () => {
      unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    authUser,
    loading,
  };
  if (loading) {
    return <MyLoading />;
  } else {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
}
