import { useContext } from 'react';
import LoadContext from '../context/LoadContext';
const useLoad = () => useContext(LoadContext);
export default useLoad;
