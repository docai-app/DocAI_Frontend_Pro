import { Box } from '@mui/joy';
import parse from 'html-react-parser';
import { useEffect } from 'react';
interface ViewProps {
    content: string;
    position: number;
}

export default function ChartView(props: ViewProps) {
    const { content, position } = props;
    useEffect(() => {
        if (content) {
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(content, 'text/html');
            const scripts = doc.getElementsByTagName('script');
            // Run each script found in the HTML
            for (let i = 0; i < scripts.length; i++) {
                const newScript = document.createElement('script');
                newScript.innerHTML = scripts[i].innerHTML;
                document.body.appendChild(newScript);
            }
        }
    }, [content]);

    const bodyContent = /<body>([\s\S]*?)<\/body>/g.exec(content);
    const parsedContent = bodyContent && bodyContent.length > 1 ? bodyContent[1] : '';
    return (
        <>
            <Box id={`chart${position}`} className="w-[500px] flex flex-col items-center p-0">
                {parse(parsedContent)}
            </Box>
        </>
    );
}
