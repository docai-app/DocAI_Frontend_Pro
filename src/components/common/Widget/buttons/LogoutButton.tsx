import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import IconButton from '@mui/joy/IconButton';
import { useRouter } from 'next/navigation';
export default function LogoutButton() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('authorization');
        localStorage.removeItem('email');
        document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        router.push('/login');
    };
    return (
        <>
            <IconButton size="sm" variant="plain" color="neutral" onClick={handleLogout}>
                <LogoutRoundedIcon />
            </IconButton>
        </>
    );
}
