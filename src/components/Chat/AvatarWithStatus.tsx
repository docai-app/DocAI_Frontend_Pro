import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { AvatarProps } from '@mui/joy/Avatar';

type AvatarWithStatusProps = AvatarProps & {
    online?: boolean;
};

export default function AvatarWithStatus(props: AvatarWithStatusProps) {
    const { online = false, ...other } = props;
    return (
        <div>
            <div className="rounded-full self-start  p-2 bg-blue-600 shadow-md border-4 border-blue-300">
                <AcademicCapIcon className="h-4 w-4 stroke-white" />
            </div>
            {/* <Avatar size="sm" {...other} /> */}
            {/* <Badge
                color={online ? 'success' : 'neutral'}
                variant={online ? 'solid' : 'soft'}
                size="sm"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeInset="4px 4px"
            >
                <Avatar size="sm" {...other} />
            </Badge> */}
        </div>
    );
}
