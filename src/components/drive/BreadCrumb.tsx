import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface BreadCrumbProps {
    ancestors?: {
        id: string;
        name: string;
        [key: string]: any;
    }[];
    id: string | null | undefined;
    name: string | null | undefined;
}

export default function BreadCrumb(props: BreadCrumbProps) {
    const { ancestors, id, name } = props;
    console.log('BreadCrumb-ancestors, id, name ',ancestors, id, name )
    return (
        <div className="flex">
            <div className={`py-2 ${!id ? 'rounded-lg font-bold' : 'text-gray-600'}`}>
                <Link href={`/drive`} className="hover:underline">
                    Root
                </Link>
            </div>
            {ancestors &&
                ancestors
                    .slice()
                    .reverse()
                    .map((ancestor) => {
                        return (
                            <div key={ancestor.id} className="flex items-center">
                                <ChevronRightIcon className="text-gray-400 h-5 mx-1" />
                                <Link
                                    href={`/drive/${ancestor.id}?name=${ancestor.name}`}
                                    className="hover:underline py-2 text-gray-600"
                                >
                                    {ancestor.name}
                                </Link>
                            </div>
                        );
                    })}
            {id && name && (
                <div className="flex items-center">
                    <ChevronRightIcon className="text-gray-400 h-5 mx-1" />
                    <div className="py-2 rounded-lg font-bold">{name}</div>
                </div>
            )}
        </div>
    );
}
