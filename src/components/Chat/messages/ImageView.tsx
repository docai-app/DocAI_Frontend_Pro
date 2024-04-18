import ModalImage from 'react-modal-image';
interface ViewProps {
    content: any;
}

export default function ImageView(props: ViewProps) {
    const { content } = props;
    return (
        <>
            <ModalImage small={content} large={content} alt="img" />
        </>
    );
}
